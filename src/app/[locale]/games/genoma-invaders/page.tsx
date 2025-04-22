import { ParsedUrlQuery } from "node:querystring";

import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import ItchioWidget from "@/src/components/itchio-widget";
import PostsList from "@/src/components/posts-list";
import { getGameBySlugUseCase } from "@/src/Games/application/GetGameBySlugUseCase";
import { Post } from "@/src/Posts/domain/Post";

interface Params extends ParsedUrlQuery {
  locale: string;
}

// Additional properties not part of the Game domain model
interface GameExtras {
  posts: Post[];
  itchioPage: string;
}

interface Props {
  params: Promise<Params>;
}

// These are the additional properties not in the Game domain model
const gameExtras: GameExtras = {
  posts: [],
  itchioPage: "https://genomagames.itch.io/genoma-invaders",
};

export const generateMetadata = async (props: { params: Promise<Params> }): Promise<Metadata> => {
  const params = await props.params;
  const { locale } = params;
  
  setRequestLocale(locale);
  
  const t = await getTranslations({
    locale,
    namespace: "GamesPage",
  });
  
  const game = await getGameBySlugUseCase.run({ locale, slug: "genoma-invaders" });

  if (!game) {
    return {
      title: t("game_not_found"),
      description: t("game_not_found_description"),
    };
  }

  return {
    title: game.name,
    description: game.summary,
  };
}

const GamePage: React.JSXElementConstructor<Props> = async (props: Props) => {
  const { locale } = await props.params;
  
  setRequestLocale(locale);
  
  const t = await getTranslations({
    locale,
    namespace: "GamesPage",
  });
  
  const game = await getGameBySlugUseCase.run({ locale, slug: "genoma-invaders" });

  if (!game) {
    return (
      <div>
        <h1 className="mb-4 inline-block w-full self-center px-8 text-center text-2xl font-bold md:text-3xl lg:text-4xl">
          {t("game_not_found")}
        </h1>
        <p className="text-center">{t("game_not_found_description")}</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-4 inline-block w-full self-center px-8 text-center text-2xl font-bold md:text-3xl lg:text-4xl">
        {game.name}
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
      <ItchioWidget
        backgroundColor="1f2937"
        borderColor="111827"
        borderSize={5}
        buttonColor="1de9a5"
        className="mx-auto mb-4"
        gameId={726484}
        textColor="1de9a5"
      >
        <a href={gameExtras.itchioPage}>
          {game.name} by Genoma Games
        </a>
      </ItchioWidget>
      <p className="mb-8">{game.summary}</p>
      {gameExtras.posts.length > 0 && (
        <>
          <h2 className="mb-4 inline-block w-full self-center px-8 text-center text-xl font-bold md:text-2xl lg:text-3xl">
            {t("devlog")}
          </h2>
          <PostsList
            className="mx-auto max-w-sm sm:max-w-full"
            posts={gameExtras.posts}
          />
        </>
      )}
    </>
  );
};

export default GamePage;
