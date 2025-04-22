import { ParsedUrlQuery } from "node:querystring";

import { Metadata } from "next";

import { Post } from "@/src/Posts/domain/Post";

interface Params extends ParsedUrlQuery {
  locale: string;
}

interface GameProps {
  coverImage?: {
    src: string;
  };
  posts: Post[];
  isInDevelopment: boolean;
  itchioPage?: string;
  releasedAt?: Date;
  summary: string;
  title: string;
}

interface Props {
  params: Promise<Params>;
}

const game: GameProps = {
  isInDevelopment: true,
  posts: [],
  summary: "",
  title: "Unknown Tales: Rogue Archipelago",
};

export const metadata: Metadata = {
  title: game.title,
  description: game.summary,
};

const GamePage: React.JSXElementConstructor<Props> = (_props: Props) => {
  return (
    <>
      <h1 className="mb-4 inline-block w-full self-center px-8 text-center text-2xl font-bold md:text-3xl lg:text-4xl">
        {game?.title}
      </h1>
      <p className="mb-8">{game?.summary}</p>
    </>
  );
};

export default GamePage;
