import { ParsedUrlQuery } from "node:querystring";

import { Metadata } from "next";
import dynamic from "next/dynamic";

import PostsList from "@/src/components/posts-list";
import { Post } from "@/src/Posts/domain/Post";

interface Params extends ParsedUrlQuery {
  locale: string;
  gameSlug: string;
}

interface GameProps {
  coverImage?: {
    src: string;
  };
  posts: Post[];
  isInDevelopment: boolean;
  itchioPage?: string;
  releasedAt?: Date;
  slug: string;
  summary: string;
  title: string;
}

interface Props {
  params: Params;
}

const games: GameProps[] = [
  {
    coverImage: undefined,
    isInDevelopment: true,
    posts: [],
    releasedAt: undefined,
    slug: "genoma-invaders",
    itchioPage: "https://genomagames.itch.io/genoma-invaders",
    summary:
      "Fixed shooter (Shoot 'em up) where you control a microscopic 🔬 robot exploring the human body while fighting off bacteria, viruses, and other microorganisms 🦠.",
    title: "Genoma Invaders",
  },
];

export const generateStaticParams = async ({
  params,
}: {
  params: {
    locale: string;
  };
}): Promise<Params[]> => {
  const staticParams: Params[] = games.map((game) => {
    return {
      locale: params.locale,
      gameSlug: game.slug,
    };
  });

  return staticParams;
};

export const generateMetadata = async ({
  params: { gameSlug },
}: {
  params: Params;
}) => {
  const game = games.find((game) => game.slug === gameSlug);
  const metadata: Metadata = {
    title: game?.title,
  };

  return metadata;
};

const GamePage: React.JSXElementConstructor<Props> = ({
  params: { gameSlug },
}: Props) => {
  const game = games.find((game) => game.slug === gameSlug);

  // const allDevlogs: PostType[] = await getDevlogs();

  // const paginatedDevlogs: PostType[] = allDevlogs.slice(
  //   0,
  //   Number(process.env.NEXT_PUBLIC_POSTS_PER_PAGE)
  // );

  const ItsioWidget = dynamic(() => import("@/src/components/itchio-widget"), {
    ssr: false,
  });

  return (
    <>
      <h1 className="mb-4 inline-block w-full self-center px-8 text-center text-2xl font-bold md:text-3xl lg:text-4xl">
        {game?.title}
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
      <p className="mb-8">{game?.summary}</p>
      {game?.posts.length && (
        <>
          <h2 className="mb-4 inline-block w-full self-center px-8 text-center text-xl font-bold md:text-2xl lg:text-3xl">
            Devlog
          </h2>
          <PostsList
            className="mx-auto max-w-sm sm:max-w-full"
            posts={game?.posts}
          />
        </>
      )}
    </>
  );
};

export default GamePage;
