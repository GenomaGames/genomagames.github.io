import { Locale } from "@/src/lib/Locale";

/**
 * Manages caching of post data to avoid repeated file system operations
 */
export class PostCacheManager {
  private cache: {
    [Key in Locale]: {
      postPaths: Set<string>;
      postPathsBySlug: Map<string, string>;
      postSlugs: Set<string>;
      postSlugsByPath: Map<string, string>;
    };
  };

  /**
   * Initialize the cache structure for all supported locales
   */
  constructor() {
    this.cache = {
      [Locale.en]: {
        postPaths: new Set(),
        postPathsBySlug: new Map(),
        postSlugs: new Set(),
        postSlugsByPath: new Map(),
      },
      [Locale.es]: {
        postPaths: new Set(),
        postPathsBySlug: new Map(),
        postSlugs: new Set(),
        postSlugsByPath: new Map(),
      },
    };
  }

  /**
   * Get all cached post paths for a locale
   *
   * @param locale - The language locale
   * @returns An array of post file paths
   */
  public getPostPaths(locale: Locale): string[] {
    return Array.from(this.cache[locale].postPaths);
  }

  /**
   * Get all cached post slugs for a locale as a Set
   *
   * @param locale - The language locale
   * @returns A Set of post slugs
   */
  public getPostSlugs(locale: Locale): string[] {
    return Array.from(this.cache[locale].postSlugs);
  }

  /**
   * Get a post path by its slug from cache
   *
   * @param slug - The post slug
   * @param locale - The language locale
   * @returns The post file path or undefined if not in cache
   */
  public getPostPathBySlug(slug: string, locale: Locale): string | undefined {
    return this.cache[locale].postPathsBySlug.get(slug);
  }

  /**
   * Get a post slug by its file path from cache
   *
   * @param postPath - The post file path
   * @param locale - The language locale
   * @returns The post slug or undefined if not in cache
   */
  public getPostSlugByPath(
    postPath: string,
    locale: Locale,
  ): string | undefined {
    return this.cache[locale].postSlugsByPath.get(postPath);
  }

  /**
   * Cache a post path
   *
   * @param postPath - The post file path
   * @param locale - The language locale
   */
  private setPostPath(postPath: string, locale: Locale): void {
    this.cache[locale].postPaths.add(postPath);
  }

  /**
   * Cache multiple post paths
   *
   * @param postPaths - Array of post file paths
   * @param locale - The language locale
   */
  public setPostPaths(postPaths: string[], locale: Locale): void {
    postPaths.forEach((postPath) => this.setPostPath(postPath, locale));
  }

  /**
   * Cache a post slug
   *
   * @param slug - The post slug
   * @param locale - The language locale
   */
  private setPostSlug(slug: string, locale: Locale): void {
    this.cache[locale].postSlugs.add(slug);
  }

  /**
   * Cache multiple post slugs
   * @param postSlugs - Array of post slugs
   * @param locale - The language locale
   */
  public setPostSlugs(postSlugs: string[], locale: Locale): void {
    postSlugs.forEach((postSlug) => this.setPostSlug(postSlug, locale));
  }

  /**
   * Cache the relationship between a post path and its slug
   *
   * @param postPath - The post file path
   * @param slug - The post slug
   * @param locale - The language locale
   */
  public setPostPathAndSlug(
    postPath: string,
    slug: string,
    locale: Locale,
  ): void {
    this.cache[locale].postPathsBySlug.set(slug, postPath);
    this.cache[locale].postSlugsByPath.set(postPath, slug);
  }

  /**
   * Check if post paths are cached for a locale
   *
   * @param locale - The language locale
   * @returns True if post paths are cached
   */
  public hasPostPathsCache(locale: Locale): boolean {
    return this.cache[locale].postPaths.size > 0;
  }

  /**
   * Clear the cache for a specific locale
   *
   * @param locale - The language locale
   */
  public clearCache(locale: Locale): void {
    this.cache[locale].postPaths.clear();
    this.cache[locale].postPathsBySlug.clear();
    this.cache[locale].postSlugsByPath.clear();
  }

  /**
   * Clear all caches
   */
  public clearAllCaches(): void {
    Object.values(Locale).forEach((locale) => this.clearCache(locale));
  }
}
