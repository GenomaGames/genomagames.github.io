import { Locale } from "@/src/i18n";

import { PostCacheManager } from "../infrastructure/PostCacheManager";
import { PostContentParser } from "../infrastructure/PostContentParser";
import { PostPathResolver } from "../infrastructure/PostPathResolver";
import { Post } from "./Post";

/**
 * Repository for accessing and managing blog posts
 */
export class PostsRepository {
  private readonly pathResolver: PostPathResolver;
  private readonly contentParser: PostContentParser;
  private readonly cacheManager: PostCacheManager;
  private readonly postsPerPage: number = 10;

  constructor(
    pathResolver: PostPathResolver,
    contentParser: PostContentParser,
    cacheManager: PostCacheManager,
  ) {
    this.pathResolver = pathResolver;
    this.contentParser = contentParser;
    this.cacheManager = cacheManager;
  }

  /**
   * Get a post by its file path
   */
  public async getPostByPath({
    locale,
    postPath,
  }: {
    locale: Locale;
    postPath: string;
  }): Promise<Post> {
    // Try to get slug from cache first
    const cachedSlug = this.cacheManager.getPostSlugByPath(postPath, locale);

    // Parse the post with the cached slug or let the parser generate one
    const post = await this.contentParser.parsePostFile(postPath, cachedSlug);

    // Cache the slug if it wasn't already cached
    if (!cachedSlug) {
      this.cacheManager.setPostPathAndSlug(postPath, post.slug, locale);
    }

    return post;
  }

  /**
   * Get a post by its slug
   */
  public async getPostBySlug({
    slug,
    locale,
  }: {
    slug: string;
    locale: Locale;
  }): Promise<Post> {
    // Try to get the post path from cache first
    let postPath = this.cacheManager.getPostPathBySlug(slug, locale);

    if (!postPath) {
      // If cache miss, get all slugs (which will populate the cache)
      this.getPostSlugs(locale);

      // Try again from the now-populated cache
      postPath = this.cacheManager.getPostPathBySlug(slug, locale);

      if (!postPath) {
        throw new Error(
          `Post with slug "${slug}" not found for locale "${locale}"`,
        );
      }
    }

    return this.getPostByPath({ locale, postPath });
  }

  /**
   * Get all post paths for a specific locale
   */
  public getPostPaths(locale: Locale): string[] {
    let postPaths = this.cacheManager.getPostPaths(locale);

    if (postPaths.length === 0) {
      postPaths = this.pathResolver.resolvePostPaths(locale);
      this.cacheManager.setPostPaths(postPaths, locale);
    }

    // Filter drafts if needed
    const isHidingDrafts = process.env.NEXT_PUBLIC_SHOW_DRAFTS !== "true";

    return isHidingDrafts
      ? postPaths.filter(
          (postPath) => !this.contentParser.isDraftPost(postPath),
        )
      : postPaths;
  }

  /**
   * Get paginated post paths for a specific page
   */
  public getPaginatedPostsPaths({
    page,
    locale,
  }: {
    page: number;
    locale: Locale;
  }): string[] {
    const postPaths = this.getPostPaths(locale);

    return this.pathResolver.paginatePostPaths(
      postPaths,
      page,
      this.postsPerPage,
    );
  }

  /**
   * Get all post slugs for a specific locale
   */
  public getPostSlugs(locale: Locale): string[] {
    let postSlugs = this.cacheManager.getPostSlugs(locale);

    if (postSlugs.length === 0) {
      const postPaths = this.getPostPaths(locale);

      postSlugs = postPaths.map((postPath) =>
        this.getPostSlug(postPath, locale),
      );
      this.cacheManager.setPostSlugs(postSlugs, locale);
    }

    return postSlugs;
  }

  /**
   * Get a post slug by its file path
   */
  private getPostSlug(postPath: string, locale: Locale): string {
    let slug = this.cacheManager.getPostSlugByPath(postPath, locale);

    if (!slug) {
      slug = this.contentParser.extractSlug(postPath);
      this.cacheManager.setPostPathAndSlug(postPath, slug, locale);
    }

    return slug;
  }

  /**
   * Get the total number of pages based on posts per page
   */
  public getTotalPages(locale: Locale): number {
    const totalPosts = this.getTotalPosts(locale);

    return Math.ceil(totalPosts / this.postsPerPage);
  }

  /**
   * Get the total number of posts
   */
  private getTotalPosts(locale: Locale): number {
    const postPaths = this.getPostPaths(locale);

    return postPaths.length;
  }
}

const pathResolver = new PostPathResolver();
const contentParser = new PostContentParser(pathResolver);
const cacheManager = new PostCacheManager();

export const postsRepository = new PostsRepository(
  pathResolver,
  contentParser,
  cacheManager,
);
