"use client";
import type { NextPage } from "next";
import Image from "next/image";
import { type CSSProperties,useMemo } from "react";

export type Card1Type = {
  className?: string;
  gameGamingJoystickMedia: string;
  playerCenteringDesign?: string;
  weCreateGamesWithPlayersAt?: string;

  /** Style props */
  card1BorderTop?: CSSProperties["borderTop"];
  card1Padding?: CSSProperties["padding"];
};

const Card1: NextPage<Card1Type> = ({
  className = "",
  card1BorderTop,
  card1Padding,
  gameGamingJoystickMedia,
  playerCenteringDesign,
  weCreateGamesWithPlayersAt,
}) => {
  const card1Style: CSSProperties = useMemo(() => {
    return {
      borderTop: card1BorderTop,
      padding: card1Padding,
    };
  }, [card1BorderTop, card1Padding]);

  return (
    <div
      className={`border-color-2 font-josefin-sans box-border flex h-[264px] flex-1 flex-col items-start justify-start gap-3.5 rounded-2xl border-t-[1px] border-solid bg-gray-100 p-6 text-left text-xl text-white ${className}`}
      style={card1Style}
    >
      <div className="relative flex h-12 max-h-full w-12 items-center justify-center overflow-hidden">
        <Image
          className="absolute top-[0px] left-[0px] h-full w-full [transform:scale(1)] overflow-hidden object-cover"
          loading="lazy"
          fill
          alt=""
          src={gameGamingJoystickMedia}
        />
      </div>
      <b className="relative self-stretch leading-[20px]">
        {playerCenteringDesign}
      </b>
      <div className="relative self-stretch leading-[20px] font-light">
        {weCreateGamesWithPlayersAt}
      </div>
    </div>
  );
};

export default Card1;
