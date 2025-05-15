import type { NextPage } from "next";

export type HeroBannerType = {
  className?: string;
};

const HeroBanner: NextPage<HeroBannerType> = ({ className = "" }) => {
  return (
    <div
      className={`text-45xl text-color-light font-born2bsporty-fs flex flex-1 flex-col items-center justify-center gap-6 self-stretch px-0 pt-0 pb-12 text-center ${className}`}
    >
      <h1 className="relative m-0 font-[inherit] text-[length:inherit] leading-[90%] font-normal">
        <p className="m-0">{`Creating Worlds, `}</p>
        <p className="m-0">Crafting Experiences</p>
      </h1>
      <b className="font-josefin-sans relative text-xl text-white">
        <p className="m-0">{`We are Genoma Games Studio, a passionate team of developers, artists, and storytellers `}</p>
        <p className="m-0">
          building the next generation of immersive gaming experiences.
        </p>
      </b>
      <div className="flex flex-row items-start justify-start gap-6">
        <button className="bg-Color-Main flex cursor-pointer flex-row items-center justify-center rounded-lg p-4 [border:none]">
          <div className="font-born2bsporty-fs relative text-left text-5xl text-white">
            Our Games
          </div>
        </button>
        <button className="border-Color-Main flex cursor-pointer flex-row items-center justify-center rounded-lg border-[1px] border-solid bg-white p-4">
          <div className="font-born2bsporty-fs text-Color-Main relative text-left text-5xl">
            Learn More
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
