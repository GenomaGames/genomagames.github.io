"use client";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

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
      className={`self-stretch flex flex-col items-center justify-start gap-6 text-center text-45xl text-Color-Light font-born2bsporty-fs ${className}`}
    >
      <div
        className="w-[1440px] h-[58px] flex flex-row items-center justify-center"
        style={aboutHeadingStyle}
      >
        <h1 className="m-0 relative text-[length:inherit] leading-[90%] font-normal font-[inherit]">
          {aboutGenomaGames}
        </h1>
      </div>
      <b className="relative text-xl font-josefin-sans text-white">
        <p className="m-0">{foundedInWereATeamOfPa}</p>
        <p className="m-0">{weveAlwaysWantedToPlay}</p>
      </b>
    </div>
  );
};

export default AboutContent;
