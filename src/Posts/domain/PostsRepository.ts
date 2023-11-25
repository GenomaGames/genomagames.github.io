import path from "node:path";

import { globby } from "globby";
import grayMatter from "gray-matter";
import { toString } from "mdast-util-to-string";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import stripMarkdown from "strip-markdown";
import { visit } from "unist-util-visit";

import { Post } from "../domain/Post";

interface Cache {
  postPaths: Set<string>;
  postPathsBySlug: Map<string, string>;
  postSlugsByPath: Map<string, string>;
}

const postsDirectoryPath = path.join(process.cwd(), "public/posts");

export class PostsRepository {
  private cache: Cache;

  constructor() {
    this.cache = {
      postPaths: new Set(),
      postPathsBySlug: new Map(),
      postSlugsByPath: new Map(),
    };
  }

  private generatePostSlugFromPath(postPath: string) {
    const slug: string = postPath
      .replace(`${postsDirectoryPath}/`, "")
      .replace(/(?:\/index)?\.md$/, "");

    return slug;
  }

  public async getPostByPath(postPath: string): Promise<Post> {
    const grayMatterFile = grayMatter.read(postPath);

    const slug =
      this.cache.postSlugsByPath.get(postPath) ||
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

  public async getPostBySlug(slug: string) {
    let postPath: string | undefined = this.cache.postPathsBySlug.get(slug);

    if (!postPath) {
      await this.getPostSlugs();

      postPath = this.cache.postPathsBySlug.get(slug);

      if (!postPath) {
        throw new Error(`Post path not found for slug: ${slug}`);
      }
    }

    const post = await this.getPostByPath(postPath);

    return post;
  }

  public async getPaginatedPostsPaths(page: number): Promise<string[]> {
    let postPaths: string[] = await this.getPostPaths();

    postPaths = postPaths.sort((pathA, pathB) => (pathA > pathB ? -1 : 1));

    postPaths = postPaths.slice(
      (page - 1) * Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE),
      page * Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE),
    );

    return postPaths;
  }

  public async getPostPaths(): Promise<string[]> {
    let postPaths: string[] = Array.from(this.cache.postPaths.values());

    if (postPaths.length === 0) {
      postPaths = await globby(path.join(postsDirectoryPath, "**/*.md"));

      if (postPaths.length === 0) {
        console.warn(`No posts found in ${postsDirectoryPath}`);
      }

      postPaths.forEach((postPath) => this.cache.postPaths.add(postPath));
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

  public async getPostSlugs(): Promise<string[]> {
    const postPaths: string[] = await this.getPostPaths();

    const slugs: string[] = postPaths.map((postPath) => {
      const slug: string = this.getPostSlug(postPath);

      this.cache.postPathsBySlug.set(slug, postPath);
      this.cache.postSlugsByPath.set(postPath, slug);

      return slug;
    });

    return slugs;
  }

  public async getTotalPages(): Promise<number> {
    const totalPosts = await this.getTotalPosts();

    const totalPages: number = Math.ceil(
      totalPosts / Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE),
    );

    return totalPages;
  }

  private async getTotalPosts(): Promise<number> {
    return (await this.getPostPaths()).length;
  }
}

export const postsRepository = new PostsRepository();
