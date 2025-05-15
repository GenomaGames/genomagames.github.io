"use client";
import type { NextPage } from "next";
import { type CSSProperties, useMemo } from "react";

export type AboutContentType = {
  className?: string;
  aboutGenomaGames?: string;
  foundedInWereATeamOfPa?: string;
  weveAlwaysWantedToPlay?: string;

  /** Style props */
  aboutHeadingWidth?: CSSProperties["width"];
  aboutHeadingAlignSelf?: CSSProperties["alignSelf"];
};

const AboutContent: NextPage<AboutContentType> = ({
  className = "",
  aboutHeadingWidth,
  aboutHeadingAlignSelf,
  aboutGenomaGames,
  foundedInWereATeamOfPa,
  weveAlwaysWantedToPlay,
}) => {
  const aboutHeadingStyle: CSSProperties = useMemo(() => {
    return {
      width: aboutHeadingWidth,
      alignSelf: aboutHeadingAlignSelf,
    };
  }, [aboutHeadingWidth, aboutHeadingAlignSelf]);

  return (
    <div
      className={`text-45xl text-color-light font-born2bsporty-fs flex flex-col items-center justify-start gap-6 self-stretch text-center ${className}`}
    >
      <div
        className="flex h-[58px] w-[1440px] flex-row items-center justify-center"
        style={aboutHeadingStyle}
      >
        <h1 className="relative m-0 font-[inherit] text-[length:inherit] leading-[90%] font-normal">
          {aboutGenomaGames}
        </h1>
      </div>
      <b className="font-josefin-sans relative text-xl text-white">
        <p className="m-0">{foundedInWereATeamOfPa}</p>
        <p className="m-0">{weveAlwaysWantedToPlay}</p>
      </b>
    </div>
  );
};

export default AboutContent;
