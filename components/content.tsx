import type { NextPage } from "next";
import Image from "next/image";
import Iconstar from "./iconstar";

export type ContentType = {
  className?: string;
};

const Content: NextPage<ContentType> = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch h-[470px] flex flex-col items-center justify-start py-10 px-0 box-border gap-32 text-center text-45xl text-Color-Light font-born2bsporty-fs ${className}`}
    >
      <div className="self-stretch flex flex-row items-center justify-center">
        <h1 className="m-0 relative text-[length:inherit] leading-[90%] font-normal font-[inherit]">
          Our Games
        </h1>
      </div>
      <div className="w-[1080px] h-[204px] [backdrop-filter:blur(9px)] rounded-2xl bg-darkslategray-200 border-darkslategray-100 border-solid border-[1px] box-border flex flex-row items-center justify-start py-0 px-[61px] relative gap-20 text-13xl font-josefin-sans">
        <div className="w-[335px] flex flex-col items-start justify-start z-[0] text-left text-white font-born2bsporty-fs">
          <h2 className="m-0 relative text-[length:inherit] leading-[50px] uppercase font-normal font-[inherit]">
            Top games
          </h2>
          <div className="self-stretch flex flex-col items-start justify-start text-base font-josefin-sans">
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="self-stretch relative leading-[20px]">{`It has a huge game inventory, high-quality exclusive games and online `}</div>
            </div>
          </div>
        </div>
        <div className="!!m-[0 important] absolute top-[-38px] left-[427px] flex flex-row items-center justify-start gap-[38px] z-[1] text-lg">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-[100px] h-[130px] relative">
              <div className="relative rounded-51xl w-[100px] h-[130px] overflow-hidden flex items-center justify-center">
                <Image
                  className="w-full h-full object-cover absolute left-[0px] top-[13px] [transform:scale(1.383)]"
                  fill
                  alt=""
                  src="/subtract.svg"
                />
              </div>
              <div className="mt-[-41px] ml-[-49px] absolute top-[-14px] left-[-13px] w-[38px] h-[38px] shrink-0">
                <div className="absolute top-[0px] left-[0px] [backdrop-filter:blur(4px)] rounded-[50%] bg-gray-300 border-burlywood border-solid border-[0px] box-border w-[38px] h-[38px]" />
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
              <div className="absolute top-[27px] left-[36px] w-16 h-[103px] shrink-0 overflow-hidden flex items-center justify-center">
                <Image
                  className="w-full h-full shrink-0 object-cover absolute left-[0px] top-[0px] [transform:scale(1)]"
                  loading="lazy"
                  fill
                  alt=""
                  src="/rectangle-2981.svg"
                />
              </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-start gap-2 text-base text-white">
              <b className="self-stretch relative">Unknown Tales</b>
              <div className="flex flex-row items-center justify-center gap-1 text-sm">
                <div className="h-4 w-4 relative shrink-0 overflow-hidden flex items-center justify-center">
                  <Image
                    className="h-full w-full overflow-hidden shrink-0 object-cover absolute left-[0px] top-[0px] [transform:scale(1)]"
                    loading="lazy"
                    fill
                    alt=""
                    src="/3844476-eye-see-show-view-watch-icon-1.svg"
                  />
                </div>
                <div className="relative">1.298</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 text-base text-white">
            <div className="w-[116px] h-[150.8px] relative shadow-[0px_23.2px_69.6px_rgba(38,_252,_255,_0.3)]">
              <div className="relative rounded-4xs-1 w-[116px] h-[150.8px] shrink-0 overflow-hidden flex items-center justify-center">
                <Image
                  className="w-full h-full shrink-0 object-cover absolute left-[0px] top-[15px] [transform:scale(1.383)]"
                  fill
                  alt=""
                  src="/subtract-1.svg"
                />
              </div>
              <div className="absolute top-[-16.2px] left-[-15.1px] w-[44.1px] h-[44.1px] overflow-hidden flex items-center justify-center">
                <Image
                  className="w-full h-full object-cover absolute left-[0px] top-[0px] [transform:scale(1)]"
                  fill
                  alt=""
                  src="/number.svg"
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
              <div className="absolute top-[31.3px] left-[41.8px] w-[74.2px] h-[119.5px] shrink-0 overflow-hidden flex items-center justify-center">
                <Image
                  className="w-full h-full shrink-0 object-cover absolute left-[0px] top-[0px] [transform:scale(1)]"
                  fill
                  alt=""
                  src="/rectangle-2981-1.svg"
                />
              </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-start gap-2">
              <b className="self-stretch relative">
                <p className="m-0">Yokai</p>
                <p className="m-0">Survivor</p>
              </b>
              <div className="flex flex-row items-center justify-center gap-1 text-sm">
                <div className="h-4 w-4 relative shrink-0 overflow-hidden flex items-center justify-center">
                  <Image
                    className="h-full w-full overflow-hidden shrink-0 object-cover absolute left-[0px] top-[0px] [transform:scale(1)]"
                    fill
                    alt=""
                    src="/3844476-eye-see-show-view-watch-icon-1.svg"
                  />
                </div>
                <div className="relative">101.968</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-[100px] h-[130px] relative">
              <div className="relative rounded-6xs w-[100px] h-[130px] overflow-hidden flex items-center justify-center">
                <Image
                  className="w-full h-full object-cover absolute left-[0px] top-[13px] [transform:scale(1.383)]"
                  fill
                  alt=""
                  src="/subtract-2.svg"
                />
              </div>
              <div className="mt-[-41px] ml-[-49px] absolute top-[-14px] left-[-13px] w-[38px] h-[38px] shrink-0">
                <div className="absolute top-[0px] left-[0px] [backdrop-filter:blur(4px)] rounded-[50%] bg-gray-300 border-burlywood border-solid border-[0px] box-border w-[38px] h-[38px]" />
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
              <div className="absolute top-[27px] left-[36px] w-16 h-[103px] shrink-0 overflow-hidden flex items-center justify-center">
                <Image
                  className="w-full h-full shrink-0 object-cover absolute left-[0px] top-[0px] [transform:scale(1)]"
                  fill
                  alt=""
                  src="/rectangle-2981.svg"
                />
              </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-start gap-2 text-base text-white">
              <b className="self-stretch relative">Genoma Invaders</b>
              <div className="flex flex-row items-center justify-center gap-1 text-sm">
                <div className="h-4 w-4 relative shrink-0 overflow-hidden flex items-center justify-center">
                  <Image
                    className="h-full w-full overflow-hidden shrink-0 object-cover absolute left-[0px] top-[0px] [transform:scale(1)]"
                    fill
                    alt=""
                    src="/3844476-eye-see-show-view-watch-icon-1.svg"
                  />
                </div>
                <div className="relative">1.298</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-[100px] h-[130px] relative">
              <div className="relative rounded-6xs w-[100px] h-[130px] overflow-hidden flex items-center justify-center">
                <Image
                  className="w-full h-full object-cover absolute left-[0px] top-[13px] [transform:scale(1.383)]"
                  fill
                  alt=""
                  src="/subtract-3.svg"
                />
              </div>
              <div className="mt-[-41px] ml-[-49px] absolute top-[-14px] left-[-13px] w-[38px] h-[38px] shrink-0">
                <div className="absolute top-[0px] left-[0px] [backdrop-filter:blur(4px)] rounded-[50%] bg-gray-300 border-burlywood border-solid border-[0px] box-border w-[38px] h-[38px]" />
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
              <div className="absolute top-[27px] left-[36px] w-16 h-[103px] shrink-0 overflow-hidden flex items-center justify-center">
                <Image
                  className="w-full h-full shrink-0 object-cover absolute left-[0px] top-[0px] [transform:scale(1)]"
                  fill
                  alt=""
                  src="/rectangle-2981.svg"
                />
              </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-start gap-2 text-base text-white">
              <b className="self-stretch relative">Balon</b>
              <div className="flex flex-row items-center justify-center gap-1 text-sm">
                <div className="h-4 w-4 relative shrink-0 overflow-hidden flex items-center justify-center">
                  <Image
                    className="h-full w-full overflow-hidden shrink-0 object-cover absolute left-[0px] top-[0px] [transform:scale(1)]"
                    fill
                    alt=""
                    src="/3844476-eye-see-show-view-watch-icon-1.svg"
                  />
                </div>
                <div className="relative">1.298</div>
              </div>
            </div>
          </div>
        </div>
        <div className="!!m-[0 important] absolute top-[31.6px] left-[31.5px] rounded-lg-9 flex flex-row items-center justify-center py-[7.1px] px-[14.2px] z-[2] text-mini-2">
          <b className="w-[87.5px] relative flex items-center justify-center">
            Portfolio
          </b>
        </div>
      </div>
    </section>
  );
};

export default Content;
