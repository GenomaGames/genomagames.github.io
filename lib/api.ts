import fs from "fs";
import path from "path";

import grayMatter from "gray-matter";
import { globby } from "globby";
import stripMarkdown from "strip-markdown";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";

import PostType from "@/interfaces/post";

const postsDirectoryPath = path.join(process.cwd(), "public/posts");

const MINIMUM_PAGE = 1;

interface Cache {
  postPaths: Set<string>;
  postPathsBySlug: Map<string, string>;
  postSlugsByPath: Map<string, string>;
}

const cache: Cache = {
  postPaths: new Set(),
  postPathsBySlug: new Map(),
  postSlugsByPath: new Map(),
};

export async function getPostPaths(page?: number): Promise<string[]> {
  let postPaths: string[] = Array.from(cache.postPaths.values());

  if (postPaths.length === 0) {
    postPaths = await globby(path.join(postsDirectoryPath, "**/*.md"));

    if (postPaths.length === 0) {
      console.warn(`No posts found in ${postsDirectoryPath}`);
    }

    postPaths.forEach((postPath) => cache.postPaths.add(postPath));
  }

  if (process.env.NEXT_PUBLIC_SHOW_DRAFTS !== "true") {
    postPaths = postPaths.filter((postPath) => {
      const fileContent = fs.readFileSync(postPath, "utf8");

      const grayMatterFile = grayMatter(fileContent);

      return !grayMatterFile.data.draft;
    });
  }

  if (page !== undefined) {
    if (page < MINIMUM_PAGE) {
      throw new Error(`Invalid page number ${page}`);
    }

    postPaths = postPaths.slice(
      (page - 1) * Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE),
      page * Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE),
    );
  }

  return postPaths;
}

export async function getPostByPath(postPath: string): Promise<PostType> {
  const fileContent = fs.readFileSync(postPath, "utf8");

  const grayMatterFile = grayMatter(fileContent);

  const slug =
    cache.postSlugsByPath.get(postPath) ||
    getPostSlug(postPath, grayMatterFile);

  let contentTree;

  let title: string | undefined = grayMatterFile.data.title;

  if (!title) {
    contentTree = await remark().parse(grayMatterFile.content);

    const headings: string[] = [];

    visit(
      contentTree,
      {
        type: "heading",
        depth: 1,
      },
      (node) => {
        headings.push(toString(node));
      },
    );

    title = headings[0] || "";
  }

  let summary: string | undefined = grayMatterFile.data.summary;

  if (!summary) {
    summary = (
      await remark()
        .use(remarkGfm)
        .use(remarkSqueezeParagraphs)
        .use(stripMarkdown)
        .process(grayMatterFile.content)
    )
      .toString()
      .replace(title, "")
      .slice(0, 120)
      .trim()
      .concat("...");
  }

  let date: number;

  if (grayMatterFile.data.date && grayMatterFile.data.date instanceof Date) {
    date = grayMatterFile.data.date.getTime();
  } else {
    throw new Error(`Missing date on post ${postPath}`);
  }

  let coverImage: PostType["coverImage"] =
    grayMatterFile.data.coverImage || null;

  if (coverImage && typeof coverImage.src === "string") {
    if (!path.isAbsolute(coverImage.src)) {
      const postDirectoryPath = postPath.replace(path.basename(postPath), "");
      coverImage.src = path
        .resolve(postDirectoryPath, coverImage.src)
        .replace(/.*\/public/, "");
    }
  }

  const post: PostType = {
    content: grayMatterFile.content,
    coverImage,
    date,
    draft: grayMatterFile.data.draft || false,
    summary: summary,
    slug,
    title,
  };

  return post;
}

export async function getPostBySlug(slug: string) {
  let postPath: string | undefined = cache.postPathsBySlug.get(slug);

  if (!postPath) {
    await getPostSlugs();

    postPath = cache.postPathsBySlug.get(slug);

    if (!postPath) {
      throw new Error(`Post path not found for slug: ${slug}`);
    }
  }

  const post = await getPostByPath(postPath);

  return post;
}

export async function getPosts(page?: number) {
  const postPaths: string[] = await getPostPaths(page);

  const posts = await Promise.all(
    postPaths.map((postPath) => getPostByPath(postPath)),
  );

  const sortedPosts = posts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1,
  );

  return sortedPosts;
}

export async function getTotalPosts(): Promise<number> {
  return (await getPostPaths()).length;
}

export async function getTotalPages(): Promise<number> {
  const totalPosts = await getTotalPosts();

  const totalPages: number = Math.ceil(
    totalPosts / Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE),
  );

  return totalPages;
}

function generatePostSlug(postPath: string) {
  const slug: string = postPath
    .replace(`${postsDirectoryPath}/`, "")
    .replace(/(?:\/index)?\.md$/, "");

  return slug;
}

function getPostSlug(
  postPath: string,
  grayMatterFile?: grayMatter.GrayMatterFile<string>,
) {
  if (!grayMatterFile) {
    const fileContent = fs.readFileSync(postPath, "utf8");

    grayMatterFile = grayMatter(fileContent);
  }

  const slug: string =
    typeof grayMatterFile.data.slug === "string"
      ? grayMatterFile.data.slug
      : generatePostSlug(postPath);

  return slug;
}

export async function getPostSlugs(page?: number): Promise<string[]> {
  const postPaths: string[] = await getPostPaths(page);

  const slugs: string[] = postPaths.map((postPath) => {
    const slug: string = getPostSlug(postPath);

    cache.postPathsBySlug.set(slug, postPath);
    cache.postSlugsByPath.set(postPath, slug);

    return slug;
  });

  return slugs;
}
