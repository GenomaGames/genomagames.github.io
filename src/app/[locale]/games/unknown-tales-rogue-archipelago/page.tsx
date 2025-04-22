import { ParsedUrlQuery } from "node:querystring";

import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getGameBySlugUseCase } from "@/src/Games/application/GetGameBySlugUseCase";

interface Params extends ParsedUrlQuery {
  locale: string;
}

interface Props {
  params: Promise<Params>;
}

// This game doesn't have any extra properties yet

export const generateMetadata = async (props: { params: Promise<Params> }): Promise<Metadata> => {
  const params = await props.params;
  const { locale } = params;
  
  setRequestLocale(locale);
  
  const t = await getTranslations({
    locale,
    namespace: "GamesPage",
  });
  
  const game = await getGameBySlugUseCase.run({ locale, slug: "unknown-tales-rogue-archipelago" });

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
  
  const game = await getGameBySlugUseCase.run({ locale, slug: "unknown-tales-rogue-archipelago" });

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
      <p className="mb-8">{game.summary}</p>
    </>
  );
};

export default GamePage;