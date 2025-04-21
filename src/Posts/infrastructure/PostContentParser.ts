import grayMatter from "gray-matter";
import { toString } from "mdast-util-to-string";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import stripMarkdown from "strip-markdown";
import { visit } from "unist-util-visit";

import { Post } from "@/src/Posts/domain/Post";

import { PostPathResolver } from "./PostPathResolver";

/**
 * Responsible for parsing post content from markdown files
 */
export class PostContentParser {
  private pathResolver: PostPathResolver;

  constructor(pathResolver: PostPathResolver) {
    this.pathResolver = pathResolver;
  }

  /**
   * Parse a post file into a structured Post object
   *
   * @param postPath - Path to the markdown file
   * @param slug - The slug to use for the post (optional)
   * @returns A structured Post object
   *
   * @example
   * // Parse a post file
   * const post = await parser.parsePostFile('/path/to/post.md');
   */
  public async parsePostFile(postPath: string, slug?: string): Promise<Post> {
    const grayMatterFile = grayMatter.read(postPath);

    // Use provided slug or generate from path
    const postSlug = slug || this.extractSlug(postPath, grayMatterFile);

    // Extract or generate title
    const title = this.extractTitle(grayMatterFile);

    // Extract or generate summary
    const summary = await this.extractSummary(grayMatterFile, title);

    // Extract and validate date
    const date = this.extractDate(grayMatterFile, postPath);

    // Process cover image if present
    const coverImage = this.processCoverImage(grayMatterFile, postPath);

    const post: Post = {
      content: grayMatterFile.content,
      coverImage,
      date,
      draft: grayMatterFile.data.draft || false,
      summary,
      slug: postSlug,
      title,
    };

    return post;
  }

  /**
   * Extract the slug from frontmatter or generate from path
   *
   * @param postPath - Path to the markdown file
   * @returns The slug to use for the post
   */
  public extractSlug(
    postPath: string,
    grayMatterFile?: grayMatter.GrayMatterFile<string>,
  ): string {
    if (!grayMatterFile) {
      grayMatterFile = grayMatter.read(postPath);
    }

    // If frontmatter has a slug, use it
    if (typeof grayMatterFile.data.slug === "string") {
      return grayMatterFile.data.slug;
    }

    // Otherwise generate from path
    return this.pathResolver.generatePostSlugFromPath(postPath);
  }

  /**
   * Extract the title from frontmatter or first heading
   * Handles complex markdown elements in headings correctly
   */
  private extractTitle(
    grayMatterFile: grayMatter.GrayMatterFile<string>,
  ): string {
    // First try to get title from frontmatter
    let title: string | undefined = grayMatterFile.data.title;

    if (!title) {
      // Parse content into AST
      const contentTree = remark().parse(grayMatterFile.content);
      const headings: string[] = [];

      // Visit all h1 nodes and extract their text content
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

      title = headings[0] || "Untitled";
    }

    return title;
  }

  /**
   * Extract or generate a summary from the post content
   */
  private async extractSummary(
    grayMatterFile: grayMatter.GrayMatterFile<string>,
    title: string,
  ): Promise<string> {
    let summary: string | undefined = grayMatterFile.data.summary;

    if (!summary) {
      // Generate summary from content by stripping markdown and taking first 120 chars
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

    return summary;
  }

  /**
   * Extract and validate the post date
   */
  private extractDate(
    grayMatterFile: grayMatter.GrayMatterFile<string>,
    postPath: string,
  ): number {
    if (grayMatterFile.data.date && grayMatterFile.data.date instanceof Date) {
      return grayMatterFile.data.date.getTime();
    } else {
      throw new Error(`Missing date on post ${postPath}`);
    }
  }

  /**
   * Process cover image from frontmatter
   */
  private processCoverImage(
    grayMatterFile: grayMatter.GrayMatterFile<string>,
    postPath: string,
  ): Post["coverImage"] {
    let coverImage: Post["coverImage"] = grayMatterFile.data.coverImage || null;

    if (coverImage && typeof coverImage.src === "string") {
      coverImage.src = this.pathResolver.resolveRelativePath(
        coverImage.src,
        postPath,
      );
    }

    return coverImage;
  }

  /**
   * Check if a post is marked as draft
   * Returns true if the post has draft: true in its frontmatter
   */
  public isDraftPost(postPath: string): boolean {
    const grayMatterFile = grayMatter.read(postPath);

    // Explicitly check for true to avoid treating other truthy values as drafts
    return grayMatterFile.data.draft === true;
  }
}
