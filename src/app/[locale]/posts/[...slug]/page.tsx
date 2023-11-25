import { ParsedUrlQuery } from "node:querystring";

import { format } from "date-fns";
import type hast from "hast";
import type mdast from "mdast";
import { Metadata } from "next";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import remarkUnwrapImages from "remark-unwrap-images";
import { unified } from "unified";
import type unist from "unist";
import { remove } from "unist-util-remove";
import type { BuildVisitor } from "unist-util-visit";
import { visit } from "unist-util-visit";

import PostArticle from "@/src/components/post-article";
import { getPostBySlugUseCase } from "@/src/Posts/application/GetPostBySlug";
import { getPostSlugsUseCase } from "@/src/Posts/application/GetPostSlugsUseCase";

interface Params extends ParsedUrlQuery {
  locale: string;
  slug: string[];
}

interface Props {
  params: Params;
}

export const generateStaticParams = async ({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}): Promise<Params[]> => {
  const postSlugs: string[] = await getPostSlugsUseCase.run({
    locale,
  });

  const staticParams: Params[] = postSlugs.map((postSlug) => {
    return {
      locale: locale,
      slug: postSlug.split("/"),
    };
  });

  return staticParams;
};

export const generateMetadata = async ({ params }: { params: Params }) => {
  const slug: string = params.slug.join("/");
  const post = await getPostBySlugUseCase.run(slug);

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

function rehypeCodeTitles() {
  return (tree: hast.Root) => {
    const visitor: BuildVisitor<hast.Root, "element"> = (
      node: hast.Element,
      index: number | undefined,
      parent: hast.Root | hast.Element | undefined,
    ) => {
      if (
        node.tagName === "code" &&
        parent?.type === "element" &&
        parent.tagName === "pre"
      ) {
        if (!parent.properties) parent.properties = {};

        if (
          node.data !== undefined &&
          "meta" in node.data &&
          typeof node.data.meta === "string" &&
          /title="(.*)"/g.test(node.data.meta)
        ) {
          const title: string = (/title="(.*)"/g.exec(node.data.meta) || [])[1];

          parent.properties.dataTitle = title;
        }

        const className =
          node && node.properties && Array.isArray(node?.properties?.className)
            ? node.properties.className
            : [];

        const languageClassName: number | string | undefined =
          className.find(
            (className) =>
              typeof className === "string" &&
              className.startsWith("language-"),
          ) || "";

        parent.properties.rel = (/language-(.*)/g.exec(
          languageClassName.toString(),
        ) || [])[1].toUpperCase();
      }
    };

    return visit(tree, "element", visitor);
  };
}

// TODO: handle code with pre parent and without it
function rehypeDefaultCodeLanguage(options = { language: "text" }) {
  return (tree: hast.Node) => {
    visit(
      tree,
      "element",
      (node: hast.Element, index: number, parent: hast.Element) => {
        if (node.tagName !== "code") return;

        if (!node.properties) {
          node.properties = {
            className: [],
          };
        }

        if (!Array.isArray(node.properties.className)) {
          node.properties.className = [];
        }

        if (
          !node.properties.className.find((className) =>
            String(className).startsWith("language-"),
          )
        ) {
          node.properties.className.push(`language-${options.language}`);
        }
      },
    );
  };
}

const PostPage: React.JSXElementConstructor<Props> = async ({
  params,
}: Props) => {
  const slug: string = params.slug.join("/");
  const post = await getPostBySlugUseCase.run(slug);

  post.content = (
    await unified()
      .use(remarkParse)
      .use(remarkRemoveFirstHeader)
      .use(remarkSqueezeParagraphs)
      .use(remarkEmoji)
      .use(remarkGfm)
      .use(remarkUnwrapImages)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeExternalLinks)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings)
      .use(rehypeDefaultCodeLanguage)
      // .use(rehypePrismPlus)
      // .use(rehypePrettyCode)
      .use(rehypeCodeTitles)
      .use(rehypeRaw) // This plugin breaks rehypePrismPlus if comes before
      .use(rehypeStringify)
      .process(post.content)
  ).toString();

  return <PostArticle {...post} />;
};

export default PostPage;
