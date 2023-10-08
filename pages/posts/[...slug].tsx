import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
} from "next";
import Head from "next/head";
import Layout from "@/components/layout";
import { getPostBySlug, getPostSlugs } from "@/lib/api";
import type PostType from "@/interfaces/post";
import Post from "@/components/post";
import { ParsedUrlQuery } from "querystring";
import { format } from "date-fns";
import remarkRehype from "remark-rehype";
import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import remarkEmoji from "remark-emoji";
import rehypePrismPlus from "rehype-prism-plus";
import { visit } from "unist-util-visit";
import { remove } from "unist-util-remove";
import type hast from "hast";
import type mdast from "mdast";
import type unist from "unist";
import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";

type Props = {
  post: PostType;
};

const PostPage: React.JSXElementConstructor<Props> = ({ post }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{`${post.title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta name="description" content={post.summary} />
        <meta
          property="article:published_time"
          content={format(post.date, "yyyy-MM-dd")}
        />
        {post.coverImage && (
          <meta property="og:image" content={post.coverImage.src} />
        )}
      </Head>
      <Post {...post} />
    </Layout>
  );
};

export default PostPage;

interface Query extends ParsedUrlQuery {
  slug: string[];
}

function remarkRemoveFirstHeader() {
  return (tree: unist.Node) => {
    remove(tree, (node: unist.Node, index, parent) => {
      return (
        index === 0 &&
        node.type === "heading" &&
        (node as mdast.Heading).depth === 1
      );
    });
  };
}

function rehypeCodeTitles() {
  return (tree: hast.Root) =>
    visit(
      tree,
      "element",
      (
        node: hast.Element,
        index: number | null,
        parent: hast.Root | hast.Element | null,
      ) => {
        if (
          node.tagName === "code" &&
          parent?.type === "element" &&
          parent.tagName === "pre"
        ) {
          if (!parent.properties) parent.properties = {};

          if (
            typeof node?.data?.meta === "string" &&
            /title="(.*)"/g.test(node.data.meta)
          ) {
            const title: string = (/title="(.*)"/g.exec(node.data.meta) ||
              [])[1];

            parent.properties.dataTitle = title;
          }

          const className =
            node &&
            node.properties &&
            Array.isArray(node?.properties?.className)
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
      },
    );
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

export const getStaticProps: GetStaticProps<Props, Query> = async (context) => {
  if (!context.params?.slug) {
    throw new Error("Missing slug property getting static props for [...slug]");
  }

  const slug: string = context.params.slug.join("/");

  const post = await getPostBySlug(slug);

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
      .use(rehypePrismPlus)
      .use(rehypeCodeTitles)
      .use(rehypeRaw) // This plugin breaks rehypePrismPlus if comes before
      .use(rehypeStringify)
      .process(post.content)
  ).toString();

  const result: GetStaticPropsResult<Props> = {
    props: {
      post,
    },
  };

  return result;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs: string[] = await getPostSlugs();

  const staticPaths: GetStaticPathsResult = {
    paths: postSlugs.map((postSlug) => {
      return {
        params: {
          slug: postSlug.split("/"),
        },
      };
    }),
    fallback: false,
  };

  return staticPaths;
};
