import type { NextPage } from "next";
import Image from "next/image";

export type HeaderType = {
  className?: string;
};

const Header: NextPage<HeaderType> = ({ className = "" }) => {
  return (
    <header
      className={`flex flex-row items-start justify-start gap-2 self-stretch px-10 py-6 ${className}`}
    >
      <div className="relative flex h-20 w-[215px] items-center justify-center overflow-hidden">
        <Image
          className="absolute top-[0px] left-[0px] h-full w-full [transform:scale(1)] object-cover"
          loading="lazy"
          fill
          alt=""
          src="/landing/logo.svg"
        />
      </div>
      <nav className="font-born2bsporty-fs m-0 flex flex-1 flex-row items-center justify-end gap-8 text-left text-5xl text-white">
        <a className="relative text-[inherit] [text-decoration:none]">HOME</a>
        <a className="relative text-[inherit] [text-decoration:none]">GAMES</a>
        <a className="relative text-[inherit] [text-decoration:none]">ABOUT</a>
        <a className="relative text-[inherit] [text-decoration:none]">TEAM</a>
        <button className="bg-Color-Main flex cursor-pointer flex-row items-center justify-center rounded-lg p-4 [border:none]">
          <div className="font-born2bsporty-fs relative flex h-6 w-[74px] items-center text-left text-5xl text-white">
            CONTACT
          </div>
        </button>
      </nav>
    </header>
  );
};

export default Header;
