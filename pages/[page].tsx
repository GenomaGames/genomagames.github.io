import Layout from "@/components/layout";
import PostsList from "@/components/posts-list";
import { getPosts, getTotalPages } from "@/lib/api";
import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
} from "next";
import Head from "next/head";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

type PostsProp = React.ComponentPropsWithRef<typeof PostsList>["posts"];

interface Props {
  currentPage: number;
  posts: PostsProp;
  totalPages: number;
}

const PaginatedPostsPage: React.JSXElementConstructor<Props> = ({
  currentPage,
  posts,
  totalPages,
}: Props) => {
  const nextPage: number = currentPage + 1;
  const previousPage: number = currentPage - 1;

  return (
    <Layout>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
        {currentPage === 1 && (
          <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL} />
        )}
      </Head>
      <PostsList className="mx-auto max-w-sm sm:max-w-full" posts={posts} />
      <nav className="mx-auto flex max-w-sm gap-4 sm:max-w-full">
        {previousPage > 0 && (
          <Link
            className="mb-4 block h-10 flex-1 rounded bg-emerald-600 text-center font-bold leading-10 text-slate-900 transition-colors ease-in-out hover:bg-emerald-400 focus:bg-emerald-400"
            as={previousPage === 1 ? "/" : `/${previousPage}`}
            href={previousPage === 1 ? "/" : "/[page]"}
            rel="prev"
          >
            Prev
          </Link>
        )}
        {nextPage <= totalPages && (
          <Link
            className="mb-4 block h-10 flex-1 rounded bg-emerald-600 text-center font-bold leading-10 text-slate-900 transition-colors ease-in-out hover:bg-emerald-400 focus:bg-emerald-400"
            as={`/${nextPage}`}
            href="/[page]"
            rel="next"
          >
            Next
          </Link>
        )}
      </nav>
    </Layout>
  );
};

export default PaginatedPostsPage;

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const currentPage: number = Number(context.params?.page);

  const totalPages: number = getTotalPages();

  const allPosts: PostsProp = await getPosts();

  const paginatedPosts: PostsProp = allPosts.slice(
    (currentPage - 1) * Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE),
    currentPage * Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE)
  );

  const result: GetStaticPropsResult<Props> = {
    props: {
      currentPage,
      posts: paginatedPosts,
      totalPages,
    },
  };

  return result;
};

interface Params extends ParsedUrlQuery {
  page: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const totalPages: number = await getTotalPages();

  const pages: number[] = new Array(totalPages)
    .fill(0)
    .map((value, index) => index + 1);

  const paths: GetStaticPathsResult<Params>["paths"] = pages.map((page) => {
    const params: Params = {
      page: page.toString(),
    };

    return {
      params,
    };
  });

  const result: GetStaticPathsResult<Params> = {
    paths,
    fallback: false,
  };

  return result;
};
