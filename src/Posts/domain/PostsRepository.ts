import path from "node:path";

import { globby } from "globby";
import grayMatter from "gray-matter";
import { toString } from "mdast-util-to-string";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import stripMarkdown from "strip-markdown";
import { visit } from "unist-util-visit";

import { Locale } from "@/src/i18n";

import { Post } from "../domain/Post";

type Cache = {
  [Key in Locale]: {
    postPaths: Set<string>;
    postPathsBySlug: Map<string, string>;
    postSlugsByPath: Map<string, string>;
  };
};

const postsDirectoryPath = path.join(process.cwd(), "public/posts");

export class PostsRepository {
  private cache: Cache;

  constructor() {
    this.cache = {
      [Locale.en]: {
        postPaths: new Set(),
        postPathsBySlug: new Map(),
        postSlugsByPath: new Map(),
      },
      [Locale.es]: {
        postPaths: new Set(),
        postPathsBySlug: new Map(),
        postSlugsByPath: new Map(),
      },
    };
  }

  private generatePostSlugFromPath(postPath: string): string {
    const slug: string = postPath
      .replace(`${postsDirectoryPath}/`, "")
      .replace(/\w*\//, "")
      .replace(/(?:\/index)?\.md$/, "");

    // console.log(`${postPath.replace(postsDirectoryPath, "")} -> ${slug}`);

    return slug;
  }

  public async getPostByPath({
    locale,
    postPath,
  }: {
    locale: Locale;
    postPath: string;
  }): Promise<Post> {
    const grayMatterFile = grayMatter.read(postPath);

    const slug =
      this.cache[locale].postSlugsByPath.get(postPath) ||
      this.getPostSlug(postPath, grayMatterFile);

    let contentTree;

    let title: string | undefined = grayMatterFile.data.title;

    if (!title) {
      contentTree = remark().parse(grayMatterFile.content);

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

    let coverImage: Post["coverImage"] = grayMatterFile.data.coverImage || null;

    if (coverImage && typeof coverImage.src === "string") {
      if (!path.isAbsolute(coverImage.src)) {
        const postDirectoryPath = postPath.replace(path.basename(postPath), "");
        coverImage.src = path
          .resolve(postDirectoryPath, coverImage.src)
          .replace(/.*\/public/, "");
      }
    }

    const post: Post = {
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

  public async getPostBySlug({
    slug,
    locale,
  }: {
    slug: string;
    locale: Locale;
  }) {
    let postPath: string | undefined =
      this.cache[locale].postPathsBySlug.get(slug);

    if (!postPath) {
      await this.getPostSlugs(locale);

      postPath = this.cache[locale].postPathsBySlug.get(slug);

      if (!postPath) {
        throw new Error(`Post path not found for slug: ${slug}`);
      }
    }

    const post = await this.getPostByPath({ locale, postPath });

    return post;
  }

  public async getPaginatedPostsPaths({
    page,
    locale,
  }: {
    page: number;
    locale: Locale;
  }): Promise<string[]> {
    let postPaths: string[] = await this.getPostPaths(locale);

    postPaths = postPaths.sort((pathA, pathB) => (pathA > pathB ? -1 : 1));

    postPaths = postPaths.slice(
      (page - 1) * Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE),
      page * Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE),
    );

    return postPaths;
  }

  public async getPostPaths(locale: Locale): Promise<string[]> {
    let postPaths: string[] = Array.from(this.cache[locale].postPaths.values());

    if (postPaths.length === 0) {
      const localizedPostsDirectoryPath: string = path.join(
        postsDirectoryPath,
        locale,
      );
      postPaths = await globby(
        path.join(localizedPostsDirectoryPath, "**/*.md"),
      );

      if (postPaths.length === 0) {
        console.warn(`No posts found in ${localizedPostsDirectoryPath}`);
      }

      postPaths.forEach((postPath) =>
        this.cache[locale].postPaths.add(postPath),
      );
    }

    const isHidingDrafts = process.env.NEXT_PUBLIC_SHOW_DRAFTS !== "true";

    if (isHidingDrafts) {
      postPaths = postPaths.filter((postPath) => !this.isDraftPost(postPath));
    }

    return postPaths;
  }

  private isDraftPost(postPath: string): boolean {
    const grayMatterFile = grayMatter.read(postPath);

    return grayMatterFile.data.draft;
  }

  private getPostSlug(
    postPath: string,
    grayMatterFile?: grayMatter.GrayMatterFile<string>,
  ) {
    if (!grayMatterFile) {
      grayMatterFile = grayMatter.read(postPath);
    }

    const slug: string =
      typeof grayMatterFile.data.slug === "string"
        ? grayMatterFile.data.slug
        : this.generatePostSlugFromPath(postPath);

    return slug;
  }

  public async getPostSlugs(locale: Locale): Promise<string[]> {
    const postPaths: string[] = await this.getPostPaths(locale);

    const slugs: string[] = postPaths.map((postPath) => {
      const slug: string = this.getPostSlug(postPath);

      this.cache[locale].postPathsBySlug.set(slug, postPath);
      this.cache[locale].postSlugsByPath.set(postPath, slug);

      return slug;
    });

    return slugs;
  }

  public async getTotalPages(locale: Locale): Promise<number> {
    const totalPosts = await this.getTotalPosts(locale);

    const totalPages: number = Math.ceil(
      totalPosts / Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE),
    );

    return totalPages;
  }

  private async getTotalPosts(locale: Locale): Promise<number> {
    return (await this.getPostPaths(locale)).length;
  }
}

export const postsRepository = new PostsRepository();
