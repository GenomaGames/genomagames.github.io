import fs from "node:fs";
import path from "node:path";
import { ParsedUrlQuery } from "node:querystring";

import { format } from "date-fns";
import type mdast from "mdast";
import { Metadata } from "next";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import { unified } from "unified";
import type unist from "unist";
import { remove } from "unist-util-remove";

import PostArticle from "@/src/components/post-article";
import { routing } from "@/src/i18n/routing";
import { getPostBySlugUseCase } from "@/src/Posts/application/GetPostBySlugUseCase";
import { getPostSlugsUseCase } from "@/src/Posts/application/GetPostSlugsUseCase";

interface Params extends ParsedUrlQuery {
  locale: string;
  slug: string[];
}

interface Props {
  params: Promise<Params>;
}

// A slug with no post behind it is a 404: rendering it on demand throws while
// looking the post up, which surfaces as a 500.
export const dynamicParams = false;

export const generateStaticParams = async (): Promise<Params[]> => {
  const staticParamsByLocale: Params[][] = await Promise.all(
    routing.locales.map(async (locale): Promise<Params[]> => {
      const postSlugs: string[] = await getPostSlugsUseCase.run({ locale });

      return postSlugs.map((postSlug) => ({
        locale,
        slug: postSlug.split("/"),
      }));
    }),
  );

  return staticParamsByLocale.flat();
};

export const generateMetadata = async (props: { params: Promise<Params> }) => {
  const params = await props.params;
  const slug: string = params.slug.join("/");
  const post = await getPostBySlugUseCase.run({ slug, locale: params.locale });

  const metadata: Metadata = {
    description: post.summary,
    title: post.title,
    other: {
      "article:published_time": format(post.date, "yyyy-MM-dd"),
    },
    openGraph: {
      images: [post.coverImage?.src ?? ""].filter((src) => src === ""),
    },
  };

  return metadata;
};

function remarkRemoveFirstHeader() {
  return (tree: unist.Node) => {
    remove(tree, (node: unist.Node, index: number | undefined): boolean => {
      return (
        index === 0 &&
        node.type === "heading" &&
        (node as mdast.Heading).depth === 1
      );
    });
  };
}

const PostPage: React.JSXElementConstructor<Props> = async (props: Props) => {
  const params = await props.params;
  const slug: string = params.slug.join("/");
  const post = await getPostBySlugUseCase.run({ slug, locale: params.locale });

  post.content = (
    await unified()
      .use(remarkParse)
      .use(remarkRemoveFirstHeader)
      .use(remarkSqueezeParagraphs)
      .use(remarkEmoji)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeUnwrapImages)
      .use(rehypeExternalLinks)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings)
      .use(rehypePrettyCode, {
        keepBackground: false,
        theme: JSON.parse(
          fs.readFileSync(
            path.join(process.cwd(), "src/CodeThemes/moonlight-ii.json"),
            "utf-8",
          ),
        ),
      })
      .use(rehypeRaw) // Must come after the highlighting plugins, it breaks them otherwise
      .use(rehypeStringify)
      .process(post.content)
  ).toString();

  return <PostArticle {...post} />;
};

export default PostPage;
