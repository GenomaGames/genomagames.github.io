import grayMatter from "gray-matter";
import { toString } from "mdast-util-to-string";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import stripMarkdown from "strip-markdown";
import { visit } from "unist-util-visit";
import { z } from "zod";

import { Post } from "@/src/Posts/domain/Post";

import { PostPathResolver } from "./PostPathResolver";

/**
 * The frontmatter a post file may declare. It comes from an external file, so it
 * is parsed and validated rather than trusted: every field is optional (a file
 * carries only the ones its author wrote) and a wrong type fails loudly at build
 * time instead of slipping through as the wrong shape.
 */
const postFrontmatterSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  summary: z.string().optional(),
  date: z.date().optional(),
  draft: z.boolean().optional(),
  coverImage: z.object({ src: z.string() }).nullish(),
});

type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

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
    const frontmatter = postFrontmatterSchema.parse(grayMatterFile.data);
    const content = grayMatterFile.content;

    // Use provided slug or generate from path
    const postSlug = slug || this.extractSlug(postPath, frontmatter);

    // Extract or generate title
    const title = this.extractTitle(frontmatter, content);

    // Extract or generate summary
    const summary = await this.extractSummary(frontmatter, content, title);

    // Extract and validate date
    const date = this.extractDate(frontmatter, postPath);

    // Process cover image if present
    const coverImage = this.processCoverImage(frontmatter, postPath);

    const post: Post = {
      content,
      coverImage,
      date,
      draft: frontmatter.draft || false,
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
  public extractSlug(postPath: string, frontmatter?: PostFrontmatter): string {
    const data =
      frontmatter ??
      postFrontmatterSchema.parse(grayMatter.read(postPath).data);

    // If frontmatter has a slug, use it
    if (data.slug) {
      return data.slug;
    }

    // Otherwise generate from path
    return this.pathResolver.generatePostSlugFromPath(postPath);
  }

  /**
   * Extract the title from frontmatter or first heading
   * Handles complex markdown elements in headings correctly
   */
  private extractTitle(frontmatter: PostFrontmatter, content: string): string {
    // First try to get title from frontmatter
    let title: string | undefined = frontmatter.title;

    if (!title) {
      // Parse content into AST
      const contentTree = remark().parse(content);
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
    frontmatter: PostFrontmatter,
    content: string,
    title: string,
  ): Promise<string> {
    let summary: string | undefined = frontmatter.summary;

    if (!summary) {
      // Generate summary from content by stripping markdown and taking first 120 chars
      summary = (
        await remark()
          .use(remarkGfm)
          .use(remarkSqueezeParagraphs)
          .use(stripMarkdown)
          .process(content)
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
  private extractDate(frontmatter: PostFrontmatter, postPath: string): number {
    if (frontmatter.date) {
      return frontmatter.date.getTime();
    } else {
      throw new Error(`Missing date on post ${postPath}`);
    }
  }

  /**
   * Process cover image from frontmatter
   */
  private processCoverImage(
    frontmatter: PostFrontmatter,
    postPath: string,
  ): Post["coverImage"] {
    const coverImage: Post["coverImage"] = frontmatter.coverImage || null;

    if (coverImage) {
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
    const frontmatter = postFrontmatterSchema.parse(grayMatter.read(postPath).data);

    // Explicitly check for true to avoid treating other truthy values as drafts
    return frontmatter.draft === true;
  }
}
