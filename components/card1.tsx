"use client";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Image from "next/image";

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
      className={`h-[264px] flex-1 rounded-2xl bg-gray-100 border-color-2 border-solid border-t-[1px] box-border flex flex-col items-start justify-start p-6 gap-3.5 text-left text-xl text-white font-josefin-sans ${className}`}
      style={card1Style}
    >
      <div className="w-12 relative max-h-full overflow-hidden h-12 flex items-center justify-center">
        <Image
          className="w-full overflow-hidden object-cover absolute left-[0px] top-[0px] h-full [transform:scale(1)]"
          loading="lazy"
          fill
          alt=""
          src={gameGamingJoystickMedia}
        />
      </div>
      <b className="self-stretch relative leading-[20px]">
        {playerCenteringDesign}
      </b>
      <div className="self-stretch relative leading-[20px] font-light">
        {weCreateGamesWithPlayersAt}
      </div>
    </div>
  );
};

export default Card1;
