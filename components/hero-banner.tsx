import type { NextPage } from "next";

export type HeroBannerType = {
  className?: string;
};

const HeroBanner: NextPage<HeroBannerType> = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex-1 flex flex-col items-center justify-center pt-0 px-0 pb-12 gap-6 text-center text-45xl text-Color-Light font-born2bsporty-fs ${className}`}
    >
      <h1 className="m-0 relative text-[length:inherit] leading-[90%] font-normal font-[inherit]">
        <p className="m-0">{`Creating Worlds, `}</p>
        <p className="m-0">Crafting Experiences</p>
      </h1>
      <b className="relative text-xl font-josefin-sans text-white">
        <p className="m-0">{`We are Genoma Games Studio, a passionate team of developers, artists, and storytellers `}</p>
        <p className="m-0">
          building the next generation of immersive gaming experiences.
        </p>
      </b>
      <div className="flex flex-row items-start justify-start gap-6">
        <button className="cursor-pointer [border:none] p-4 bg-Color-Main rounded-lg flex flex-row items-center justify-center">
          <div className="relative text-5xl font-born2bsporty-fs text-white text-left">
            Our Games
          </div>
        </button>
        <button className="cursor-pointer border-Color-Main border-solid border-[1px] p-4 bg-white rounded-lg flex flex-row items-center justify-center">
          <div className="relative text-5xl font-born2bsporty-fs text-Color-Main text-left">
            Learn More
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
