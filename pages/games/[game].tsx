import { ParsedUrlQuery } from "querystring";

import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
} from "next";

import Layout from "@/components/layout";
import PostsList from "@/components/posts-list";
import PostType from "@/interfaces/post";
import dynamic from "next/dynamic";
import Head from "next/head";

interface Props {
  coverImage?: {
    src: string;
  };
  posts: PostType[];
  isInDevelopment: boolean;
  itchioPage?: string;
  releasedAt?: Date;
  slug: string;
  summary: string;
  title: string;
}

const GamePage: React.JSXElementConstructor<Props> = ({
  posts,
  summary,
  title,
}: Props) => {
  const ItsioWidget = dynamic(() => import("@/components/itchio-widget"), {
    ssr: false,
  });

  return (
    <Layout>
      <Head>
        <title>{`${title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
      </Head>
      <h1 className="mb-4 inline-block w-full self-center px-8 text-center text-2xl font-bold md:text-3xl lg:text-4xl">
        {title}
      </h1>
      <iframe
        className="mx-auto mb-4"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/7wOyQP97hFw"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <ItsioWidget
        backgroundColor="1f2937"
        borderColor="111827"
        borderSize={5}
        buttonColor="1de9a5"
        className="mx-auto mb-4"
        gameId={726484}
        textColor="1de9a5"
      >
        <a href="https://genomagames.itch.io/genoma-invaders">
          Genoma Invaders by Genoma Games
        </a>
      </ItsioWidget>
      <p className="mb-8">{summary}</p>
      {posts.length && (
        <>
          <h2 className="mb-4 inline-block w-full self-center px-8 text-center text-xl font-bold md:text-2xl lg:text-3xl">
            Devlog
          </h2>
          <PostsList className="mx-auto max-w-sm sm:max-w-full" posts={posts} />
        </>
      )}
    </Layout>
  );
};

export default GamePage;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  // const allDevlogs: PostType[] = await getDevlogs();

  // const paginatedDevlogs: PostType[] = allDevlogs.slice(
  //   0,
  //   Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE)
  // );

  const result: GetStaticPropsResult<Props> = {
    props: {
      posts: [
        {
          content: "test",
          coverImage: { src: "" },
          date: 1,
          draft: false,
          slug: "asd",
          summary: "sadf",
          title: "asd",
        },
      ],
      isInDevelopment: true,
      itchioPage: "https://genomagames.itch.io/genoma-invaders",
      slug: "genoma-invaders",
      summary:
        "Fixed shooter (Shoot 'em up) where you control a microscopic 🔬 robot exploring the human body while fighting off bacteria, viruses, and other microorganisms 🦠.",
      title: "Genoma Invaders",
    },
  };

  return result;
};

interface Params extends ParsedUrlQuery {
  game: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const games: {
    coverImage: {
      src: string;
    } | null;
    isInDevelopment: boolean;
    releasedAt: Date | null;
    slug: string;
    summary: string;
    title: string;
  }[] = [
    {
      coverImage: null,
      isInDevelopment: true,
      releasedAt: null,
      slug: "genoma-invaders",
      summary:
        "Fixed shooter (Shoot 'em up) where you control a microscopic 🔬 robot exploring the human body while fighting off bacteria, viruses, and other microorganisms 🦠.",
      title: "Genoma Invaders",
    },
  ];

  const paths: GetStaticPathsResult<Params>["paths"] = games.map((game) => {
    const params: Params = {
      game: game.slug,
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
