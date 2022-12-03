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

type Props = {
  post: PostType;
};

const PostPage: React.JSXElementConstructor<Props> = ({ post }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{`${post.title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
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

export const getStaticProps: GetStaticProps<Props, Query> = async (context) => {
  if (!context.params?.slug) {
    throw new Error("Missing slug property getting static props for [...slug]");
  }

  const slug: string = context.params.slug.join("/");

  const post = await getPostBySlug(slug);

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
