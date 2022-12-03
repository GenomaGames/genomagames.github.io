import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

import iconImage from "@/public/icon.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-10 h-16 w-full bg-gradient-to-br from-slate-800 to-gray-900 shadow-md shadow-black">
      <div className="container mx-auto flex h-full max-w-5xl items-center px-4">
        <h1 className="flex h-full items-center">
          <Link href="/" className="flex items-center">
            <Image
              className="inline-block h-auto w-8"
              src={iconImage}
              alt={`${process.env.NEXT_PUBLIC_SITE_NAME} logo`}
            />
            <span className="ml-2 inline-block text-xl font-bold">
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </span>
          </Link>
        </h1>
        <Link
          className="ml-auto flex h-8 w-8 items-center justify-self-end"
          href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_USERNAME}`}
        >
          <FontAwesomeIcon
            className="text-[#00acee]"
            icon={faTwitter}
            size="2xl"
          />
          <span className="sr-only">{`${process.env.NEXT_PUBLIC_SITE_NAME} Twitter`}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
