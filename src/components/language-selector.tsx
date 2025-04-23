"use client";

import "flag-icons/css/flag-icons.min.css";

import { faLanguage, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Props = object;

const LanguageSelector: React.JSXElementConstructor<Props> = (
  _props: Props,
) => {
  const t = useTranslations("Header");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Add effect to control body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      // When drawer opens, disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // When drawer closes, re-enable scrolling
      document.body.style.overflow = "auto";
    }

    // Cleanup function to ensure scroll is restored when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDrawerOpen]);

  return (
    <div className="relative">
      <button
        className="flex h-12 w-12 cursor-pointer items-center justify-center"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        aria-label={t("languages")}
      >
        <FontAwesomeIcon className="text-white" icon={faLanguage} size="xl" />
      </button>
      <div
        className={`fixed top-0 right-0 z-30 h-full w-full bg-slate-800 py-6 shadow-lg transition-transform duration-200 ease-in-out md:w-xs ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between px-6 md:px-4">
          <h3 className="text-xl font-bold text-white md:text-lg">
            {t("languages")}
          </h3>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="cursor-pointer text-gray-300 hover:text-white"
            aria-label="Close menu"
          >
            <FontAwesomeIcon icon={faXmark} className="text-3xl md:text-xl" />
          </button>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <Link
            className="flex w-full items-center justify-center px-4 py-4 hover:bg-slate-700 md:justify-start md:py-3"
            href="/en"
            hrefLang="en"
            onClick={() => setIsDrawerOpen(false)}
          >
            <span className="fi fi-us mr-2 text-lg"></span>
            <span className="text-lg text-white md:text-base">English</span>
          </Link>
          <Link
            className="flex w-full items-center justify-center px-4 py-4 hover:bg-slate-700 md:justify-start md:py-3"
            href="/es"
            hrefLang="es"
            onClick={() => setIsDrawerOpen(false)}
          >
            <span className="fi fi-es mr-2 text-lg"></span>
            <span className="text-lg text-white md:text-base">Español</span>
          </Link>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-20 bg-black transition-opacity duration-200 ${
          isDrawerOpen ? "opacity-70" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default LanguageSelector;
