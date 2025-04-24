# SEO and Metadata Improvements

## Current State

The website currently has basic SEO with next-sitemap configured, but it's missing comprehensive metadata, structured data, and other SEO optimizations. The site has good content and structure, but it's not fully optimized for search engines and social sharing.

## Recommendations

### 1. Comprehensive Meta Component

Create a reusable Meta component that handles all metadata needs:

```tsx
// src/components/meta.tsx
import Head from "next/head";
import { useRouter } from "next/router";

interface MetaProps {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  date?: string;
  author?: string;
  locale?: string;
  alternateLocales?: string[];
}

export default function Meta({
  title,
  description,
  image = "/icon.png",
  type = "website",
  date,
  author,
  locale = "en",
  alternateLocales = [],
}: MetaProps) {
  const router = useRouter();
  const url = `${process.env.BASE_URL}${router.asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${process.env.BASE_URL}${image}`} />
      <meta property="og:locale" content={locale} />
      {alternateLocales.map((altLocale) => (
        <meta
          key={altLocale}
          property="og:locale:alternate"
          content={altLocale}
        />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@genomagames" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${process.env.BASE_URL}${image}`} />

      {/* Article specific */}
      {type === "article" && date && (
        <meta property="article:published_time" content={date} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Alternate language versions */}
      {alternateLocales.map((altLocale) => (
        <link
          key={altLocale}
          rel="alternate"
          hrefLang={altLocale}
          href={`${process.env.BASE_URL}/${altLocale}${router.asPath.substring(3)}`}
        />
      ))}
    </Head>
  );
}
```

### 2. Structured Data Implementation

Create components for different structured data types:

#### Blog Post Structured Data

```tsx
// src/components/structured-data/blog-post.tsx
interface BlogPostStructuredDataProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  imageUrl: string;
  url: string;
}

export default function BlogPostStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
  url,
}: BlogPostStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: imageUrl,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Genoma Games",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.BASE_URL}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

#### Video Game Structured Data

```tsx
// src/components/structured-data/video-game.tsx
interface VideoGameStructuredDataProps {
  name: string;
  description: string;
  imageUrl: string;
  url: string;
  genre?: string;
  platformList?: string[];
  developer?: string;
  datePublished?: string;
}

export default function VideoGameStructuredData({
  name,
  description,
  imageUrl,
  url,
  genre,
  platformList,
  developer = "Genoma Games",
  datePublished,
}: VideoGameStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name,
    description,
    image: imageUrl,
    url,
    ...(genre && { genre }),
    ...(platformList && { gamePlatform: platformList }),
    ...(datePublished && { datePublished }),
    author: {
      "@type": "Organization",
      name: developer,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/ComingSoon",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

#### Organization Structured Data

```tsx
// src/components/structured-data/organization.tsx
export default function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Genoma Games",
    url: process.env.BASE_URL,
    logo: `${process.env.BASE_URL}/icon.png`,
    sameAs: [
      `https://twitter.com/${process.env.NEXT_PUBLIC_X_USERNAME}`,
      "https://genomagames.itch.io/",
      // Add other social profiles
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

### 3. Page-Specific SEO Implementation

Update page components to use the new Meta and structured data components:

#### Blog Post Page

```tsx
// Example for blog post page
import Meta from "@/src/components/meta";
import BlogPostStructuredData from "@/src/components/structured-data/blog-post";
import { Post } from "@/src/Posts/domain/Post";
import { formatISO } from "date-fns";

interface PostPageProps {
  post: Post;
  locale: string;
  alternateLocales: string[];
  authorName: string;
}

export default function PostPage({
  post,
  locale,
  alternateLocales,
  authorName,
}: PostPageProps) {
  const url = `${process.env.BASE_URL}/${locale}/posts/${post.slug}`;
  const imageUrl = post.coverImage
    ? `${process.env.BASE_URL}${post.coverImage.src}`
    : `${process.env.BASE_URL}/icon.png`;
  const datePublished = formatISO(new Date(post.date));

  return (
    <>
      <Meta
        title={post.title}
        description={post.summary}
        image={post.coverImage?.src || "/icon.png"}
        type="article"
        date={datePublished}
        author={authorName}
        locale={locale}
        alternateLocales={alternateLocales}
      />
      <BlogPostStructuredData
        title={post.title}
        description={post.summary}
        datePublished={datePublished}
        authorName={authorName}
        imageUrl={imageUrl}
        url={url}
      />
      {/* Rest of the page content */}
    </>
  );
}
```

### 4. Sitemap Configuration Improvements

Enhance the next-sitemap configuration:

```js
// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE_URL || "https://genomagames.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      `${process.env.BASE_URL || "https://genomagames.com"}/sitemap-games.xml`,
    ],
  },
  exclude: ["/404", "/500"],
  alternateRefs: [
    {
      href: "https://genomagames.com/en",
      hreflang: "en",
    },
    {
      href: "https://genomagames.com/es",
      hreflang: "es",
    },
  ],
  transform: async (config, path) => {
    // Custom transformation for multilingual paths
    return {
      loc: path,
      changefreq: path.includes("/posts/") ? "monthly" : "daily",
      priority: path === "/" ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    };
  },
};
```

### 5. Security Headers

Implement security headers for better SEO and security:

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
];

const nextConfig: NextConfig = {
  // ...existing config
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // ...rest of config
};
```

### 6. Meta Description Improvements

Enhance the meta description generation in the PostContentParser:

```typescript
// src/Posts/infrastructure/PostContentParser.ts
private async extractSummary(
  grayMatterFile: grayMatter.GrayMatterFile<string>,
  title: string,
): Promise<string> {
  let summary: string | undefined = grayMatterFile.data.summary;

  if (!summary) {
    // Generate summary from content by stripping markdown and taking first 160 chars (optimal for SEO)
    summary = (
      await remark()
        .use(remarkGfm)
        .use(remarkSqueezeParagraphs)
        .use(stripMarkdown)
        .process(grayMatterFile.content)
    )
      .toString()
      .replace(title, "")
      .replace(/\s+/g, " ") // Normalize whitespace
      .slice(0, 160)
      .trim()
      .concat("...");
  }

  return summary;
}
```

### 7. Heading Hierarchy Improvements

Ensure proper heading hierarchy throughout the site:

- Each page should have exactly one `<h1>` element
- Headings should be properly nested (h1 > h2 > h3, etc.)
- Headings should be descriptive and include relevant keywords

## Implementation Plan

1. **Create Meta Component** (1 day)

   - Implement comprehensive meta tags
   - Add support for Open Graph and Twitter cards
   - Add support for alternate language versions

2. **Implement Structured Data** (2 days)

   - Create structured data components for different content types
   - Implement BlogPosting schema for blog posts
   - Implement VideoGame schema for games
   - Implement Organization schema for the company

3. **Update Page Components** (3 days)

   - Update blog post pages with proper metadata
   - Update game pages with proper metadata
   - Update home page and other static pages

4. **Enhance Sitemap Configuration** (1 day)

   - Improve next-sitemap configuration
   - Add support for alternate language versions
   - Configure proper priorities and change frequencies

5. **Implement Security Headers** (1 day)

   - Add security headers to next.config.ts
   - Test security headers with security scanners

6. **Improve Meta Descriptions** (1 day)

   - Enhance meta description generation
   - Review and update existing meta descriptions

7. **Fix Heading Hierarchy** (1 day)
   - Audit heading hierarchy across the site
   - Fix any issues with heading structure

## Expected Benefits

1. **Improved Search Engine Visibility**: Better metadata and structured data will help search engines understand and index the content more effectively.
2. **Enhanced Social Sharing**: Open Graph and Twitter card metadata will improve how the site appears when shared on social media.
3. **Better Accessibility**: Proper heading hierarchy will improve accessibility and SEO.
4. **Improved Security**: Security headers will enhance the site's security posture and potentially improve SEO rankings.
5. **Better Multilingual Support**: Proper alternate language links will help search engines understand the relationship between different language versions.
