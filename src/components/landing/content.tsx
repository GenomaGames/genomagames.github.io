import type { NextPage } from "next";
import Image from "next/image";

import Iconstar from "./iconstar";

export type ContentType = {
  className?: string;
};

const Content: NextPage<ContentType> = ({ className = "" }) => {
  return (
    <section
      className={`text-45xl text-color-light font-born2bsporty-fs box-border flex h-[470px] flex-col items-center justify-start gap-32 self-stretch px-0 py-10 text-center ${className}`}
    >
      <div className="flex flex-row items-center justify-center self-stretch">
        <h1 className="relative m-0 font-[inherit] text-[length:inherit] leading-[90%] font-normal">
          Our Games
        </h1>
      </div>
      <div className="bg-darkslategray-200 border-darkslategray-100 text-13xl font-josefin-sans relative box-border flex h-[204px] w-[1080px] flex-row items-center justify-start gap-20 rounded-2xl border-[1px] border-solid px-[61px] py-0 [backdrop-filter:blur(9px)]">
        <div className="font-born2bsporty-fs z-[0] flex w-[335px] flex-col items-start justify-start text-left text-white">
          <h2 className="relative m-0 font-[inherit] text-[length:inherit] leading-[50px] font-normal uppercase">
            Top games
          </h2>
          <div className="font-josefin-sans flex flex-col items-start justify-start self-stretch text-base">
            <div className="flex flex-col items-start justify-start self-stretch">
              <div className="relative self-stretch leading-[20px]">{`It has a huge game inventory, high-quality exclusive games and online `}</div>
            </div>
          </div>
        </div>
        <div className="!!m-[0 important] absolute top-[-38px] left-[427px] z-[1] flex flex-row items-center justify-start gap-[38px] text-lg">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-[130px] w-[100px]">
              <div className="rounded-51xl relative flex h-[130px] w-[100px] items-center justify-center overflow-hidden">
                <Image
                  className="absolute top-[13px] left-[0px] h-full w-full [transform:scale(1.383)] object-cover"
                  fill
                  alt=""
                  src="/landing/subtract.svg"
                />
              </div>
              <div className="absolute top-[-14px] left-[-13px] mt-[-41px] ml-[-49px] h-[38px] w-[38px] shrink-0">
                <div className="border-burlywood absolute top-[0px] left-[0px] box-border h-[38px] w-[38px] rounded-[50%] border-[0px] border-solid bg-gray-300 [backdrop-filter:blur(4px)]" />
                <b className="absolute top-[10px] left-[8px] [text-shadow:0.5px_0_0_rgba(255,_200,_158,_0.1),_0_0.5px_0_rgba(255,_200,_158,_0.1),_-0.5px_0_0_rgba(255,_200,_158,_0.1),_0_-0.5px_0_rgba(255,_200,_158,_0.1)]">
                  4.8
                </b>
              </div>
              <div className="absolute top-[-15px] left-[31px] flex flex-row items-center justify-start gap-1">
                <Iconstar
                  property1={0}
                  vector="/vector.svg"
                  subtract="/subtract1.svg"
                />
                <Iconstar
                  property1={0}
                  vector="/vector.svg"
                  subtract="/subtract1.svg"
                  subtractIconHeight="20px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector.svg"
                  subtract="/subtract1.svg"
                  subtractIconHeight="20px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector.svg"
                  subtract="/subtract1.svg"
                  subtractIconHeight="20px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector-4.svg"
                  subtract="/subtract1.svg"
                  subtractIconHeight="20px"
                />
              </div>
              <div className="absolute top-[27px] left-[36px] flex h-[103px] w-16 shrink-0 items-center justify-center overflow-hidden">
                <Image
                  className="absolute top-[0px] left-[0px] h-full w-full shrink-0 [transform:scale(1)] object-cover"
                  loading="lazy"
                  fill
                  alt=""
                  src="/landing/rectangle-2981.svg"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start gap-2 self-stretch text-base text-white">
              <b className="relative self-stretch">Unknown Tales</b>
              <div className="flex flex-row items-center justify-center gap-1 text-sm">
                <div className="relative flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden">
                  <Image
                    className="absolute top-[0px] left-[0px] h-full w-full shrink-0 [transform:scale(1)] overflow-hidden object-cover"
                    loading="lazy"
                    fill
                    alt=""
                    src="/landing/3844476-eye-see-show-view-watch-icon-1.svg"
                  />
                </div>
                <div className="relative">1.298</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 text-base text-white">
            <div className="relative h-[150.8px] w-[116px] shadow-[0px_23.2px_69.6px_rgba(38,_252,_255,_0.3)]">
              <div className="rounded-4xs-1 relative flex h-[150.8px] w-[116px] shrink-0 items-center justify-center overflow-hidden">
                <Image
                  className="absolute top-[15px] left-[0px] h-full w-full shrink-0 [transform:scale(1.383)] object-cover"
                  fill
                  alt=""
                  src="/landing/subtract-1.svg"
                />
              </div>
              <div className="absolute top-[-16.2px] left-[-15.1px] flex h-[44.1px] w-[44.1px] items-center justify-center overflow-hidden">
                <Image
                  className="absolute top-[0px] left-[0px] h-full w-full [transform:scale(1)] object-cover"
                  fill
                  alt=""
                  src="/landing/number.svg"
                />
              </div>
              <div className="absolute top-[-17.4px] left-[36px] flex flex-row items-center justify-start gap-[4.6px]">
                <Iconstar
                  property1={0}
                  vector="/vector-5.svg"
                  subtract="/subtract2.svg"
                  subtractIconHeight="23.2px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector-5.svg"
                  subtract="/subtract2.svg"
                  subtractIconHeight="23.2px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector-5.svg"
                  subtract="/subtract2.svg"
                  subtractIconHeight="23.2px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector-5.svg"
                  subtract="/subtract2.svg"
                  subtractIconHeight="23.2px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector-9.svg"
                  subtract="/subtract2.svg"
                  subtractIconHeight="23.2px"
                />
              </div>
              <div className="absolute top-[31.3px] left-[41.8px] flex h-[119.5px] w-[74.2px] shrink-0 items-center justify-center overflow-hidden">
                <Image
                  className="absolute top-[0px] left-[0px] h-full w-full shrink-0 [transform:scale(1)] object-cover"
                  fill
                  alt=""
                  src="/landing/rectangle-2981-1.svg"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start gap-2 self-stretch">
              <b className="relative self-stretch">
                <p className="m-0">Yokai</p>
                <p className="m-0">Survivor</p>
              </b>
              <div className="flex flex-row items-center justify-center gap-1 text-sm">
                <div className="relative flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden">
                  <Image
                    className="absolute top-[0px] left-[0px] h-full w-full shrink-0 [transform:scale(1)] overflow-hidden object-cover"
                    fill
                    alt=""
                    src="/landing/3844476-eye-see-show-view-watch-icon-1.svg"
                  />
                </div>
                <div className="relative">101.968</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-[130px] w-[100px]">
              <div className="rounded-6xs relative flex h-[130px] w-[100px] items-center justify-center overflow-hidden">
                <Image
                  className="absolute top-[13px] left-[0px] h-full w-full [transform:scale(1.383)] object-cover"
                  fill
                  alt=""
                  src="/landing/subtract-2.svg"
                />
              </div>
              <div className="absolute top-[-14px] left-[-13px] mt-[-41px] ml-[-49px] h-[38px] w-[38px] shrink-0">
                <div className="border-burlywood absolute top-[0px] left-[0px] box-border h-[38px] w-[38px] rounded-[50%] border-[0px] border-solid bg-gray-300 [backdrop-filter:blur(4px)]" />
                <b className="absolute top-[10px] left-[7px] [text-shadow:0.5px_0_0_rgba(255,_200,_158,_0.1),_0_0.5px_0_rgba(255,_200,_158,_0.1),_-0.5px_0_0_rgba(255,_200,_158,_0.1),_0_-0.5px_0_rgba(255,_200,_158,_0.1)]">
                  5.0
                </b>
              </div>
              <div className="absolute top-[-15px] left-[31px] flex flex-row items-center justify-start gap-1">
                <Iconstar
                  property1={0}
                  vector="/vector.svg"
                  subtract="/subtract1.svg"
                  subtractIconHeight="20px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector.svg"
                  subtract="/subtract1.svg"
                  subtractIconHeight="20px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector.svg"
                  subtract="/subtract1.svg"
                  subtractIconHeight="20px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector.svg"
                  subtract="/subtract1.svg"
                  subtractIconHeight="20px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector.svg"
                  subtract="/subtract1.svg"
                  subtractIconHeight="20px"
                />
              </div>
              <div className="absolute top-[27px] left-[36px] flex h-[103px] w-16 shrink-0 items-center justify-center overflow-hidden">
                <Image
                  className="absolute top-[0px] left-[0px] h-full w-full shrink-0 [transform:scale(1)] object-cover"
                  fill
                  alt=""
                  src="/landing/rectangle-2981.svg"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start gap-2 self-stretch text-base text-white">
              <b className="relative self-stretch">Genoma Invaders</b>
              <div className="flex flex-row items-center justify-center gap-1 text-sm">
                <div className="relative flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden">
                  <Image
                    className="absolute top-[0px] left-[0px] h-full w-full shrink-0 [transform:scale(1)] overflow-hidden object-cover"
                    fill
                    alt=""
                    src="/landing/3844476-eye-see-show-view-watch-icon-1.svg"
                  />
                </div>
                <div className="relative">1.298</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-[130px] w-[100px]">
              <div className="rounded-6xs relative flex h-[130px] w-[100px] items-center justify-center overflow-hidden">
                <Image
                  className="absolute top-[13px] left-[0px] h-full w-full [transform:scale(1.383)] object-cover"
                  fill
                  alt=""
                  src="/landing/subtract-3.svg"
                />
              </div>
              <div className="absolute top-[-14px] left-[-13px] mt-[-41px] ml-[-49px] h-[38px] w-[38px] shrink-0">
                <div className="border-burlywood absolute top-[0px] left-[0px] box-border h-[38px] w-[38px] rounded-[50%] border-[0px] border-solid bg-gray-300 [backdrop-filter:blur(4px)]" />
                <b className="absolute top-[10px] left-[8px] [text-shadow:0.5px_0_0_rgba(255,_200,_158,_0.1),_0_0.5px_0_rgba(255,_200,_158,_0.1),_-0.5px_0_0_rgba(255,_200,_158,_0.1),_0_-0.5px_0_rgba(255,_200,_158,_0.1)]">
                  3.5
                </b>
              </div>
              <div className="absolute top-[-15px] left-[31px] flex flex-row items-center justify-start gap-1">
                <Iconstar
                  property1={0}
                  vector="/vector.svg"
                  subtract="/subtract1.svg"
                  subtractIconHeight="20px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector.svg"
                  subtract="/subtract1.svg"
                  subtractIconHeight="20px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector.svg"
                  subtract="/subtract1.svg"
                  subtractIconHeight="20px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector-4.svg"
                  subtract="/subtract1.svg"
                  subtractIconHeight="20px"
                />
                <Iconstar
                  property1={0}
                  vector="/vector-4.svg"
                  subtract="/subtract1.svg"
                  subtractIconHeight="20px"
                />
              </div>
              <div className="absolute top-[27px] left-[36px] flex h-[103px] w-16 shrink-0 items-center justify-center overflow-hidden">
                <Image
                  className="absolute top-[0px] left-[0px] h-full w-full shrink-0 [transform:scale(1)] object-cover"
                  fill
                  alt=""
                  src="/landing/rectangle-2981.svg"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start gap-2 self-stretch text-base text-white">
              <b className="relative self-stretch">Balon</b>
              <div className="flex flex-row items-center justify-center gap-1 text-sm">
                <div className="relative flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden">
                  <Image
                    className="absolute top-[0px] left-[0px] h-full w-full shrink-0 [transform:scale(1)] overflow-hidden object-cover"
                    fill
                    alt=""
                    src="/landing/3844476-eye-see-show-view-watch-icon-1.svg"
                  />
                </div>
                <div className="relative">1.298</div>
              </div>
            </div>
          </div>
        </div>
        <div className="!!m-[0 important] rounded-lg-9 text-mini-2 absolute top-[31.6px] left-[31.5px] z-[2] flex flex-row items-center justify-center px-[14.2px] py-[7.1px]">
          <b className="relative flex w-[87.5px] items-center justify-center">
            Portfolio
          </b>
        </div>
      </div>
    </section>
  );
};

export default Content;
