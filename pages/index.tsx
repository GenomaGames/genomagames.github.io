import { GetStaticProps, GetStaticPropsResult } from "next";
import { getPosts } from "@/lib/api";
import Layout from "@/components/layout";
import Link from "next/link";
import PostsList from "@/components/posts-list";
import PostType from "@/interfaces/post";

interface Props {
  posts: PostType[];
}

const IndexPage: React.JSXElementConstructor<Props> = ({ posts }: Props) => {
  return (
    <Layout>
      <PostsList className="mx-auto max-w-sm sm:max-w-full" posts={posts} />
      <nav className="mx-auto max-w-sm sm:max-w-full">
        <Link
          className="mb-4 block h-10 flex-1 rounded bg-emerald-600 text-center font-bold leading-10 text-slate-900 transition-colors ease-in-out hover:bg-emerald-400 focus:bg-emerald-400"
          as={`/2`}
          href="/[page]"
          rel="next"
        >
          More posts
        </Link>
      </nav>
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const allPosts: PostType[] = await getPosts();

  const paginatedPosts: PostType[] = allPosts.slice(
    0,
    Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE)
  );

  const result: GetStaticPropsResult<Props> = {
    props: {
      posts: paginatedPosts,
    },
  };

  return result;
};
