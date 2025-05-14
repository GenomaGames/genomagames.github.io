import type { NextPage } from "next";
import Image from "next/image";

export type HeaderType = {
  className?: string;
};

const Header: NextPage<HeaderType> = ({ className = "" }) => {
  return (
    <header
      className={`self-stretch flex flex-row items-start justify-start py-6 px-10 gap-2 ${className}`}
    >
      <div className="h-20 w-[215px] relative overflow-hidden flex items-center justify-center">
        <Image
          className="h-full w-full object-cover absolute left-[0px] top-[0px] [transform:scale(1)]"
          loading="lazy"
          fill
          alt=""
          src="/logo.svg"
        />
      </div>
      <nav className="m-0 flex-1 flex flex-row items-center justify-end gap-8 text-left text-5xl text-white font-born2bsporty-fs">
        <a className="[text-decoration:none] relative text-[inherit]">HOME</a>
        <a className="[text-decoration:none] relative text-[inherit]">GAMES</a>
        <a className="[text-decoration:none] relative text-[inherit]">ABOUT</a>
        <a className="[text-decoration:none] relative text-[inherit]">TEAM</a>
        <button className="cursor-pointer [border:none] p-4 bg-Color-Main rounded-lg flex flex-row items-center justify-center">
          <div className="h-6 w-[74px] relative text-5xl font-born2bsporty-fs text-white text-left flex items-center">
            CONTACT
          </div>
        </button>
      </nav>
    </header>
  );
};

export default Header;
