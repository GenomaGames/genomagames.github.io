import { faArrowUp, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

interface Props {}

const Footer: React.JSXElementConstructor<Props> = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-auto h-12 w-full bg-linear-to-br from-slate-800 to-gray-900 shadow-md shadow-black">
      <div className="container mx-auto flex h-full max-w-5xl items-center px-4">
        <div className="flex items-center">
          {/* TODO: implements language selector
          <div>
            <FontAwesomeIcon
              size="2xl"
              icon={faLanguage}
              title={t("languages")}
            />
            {locales.map((locale) => (
              <>
                {" "}
                <Link
                  className="rounded-sm bg-emerald-600 px-2 py-1 text-center font-bold text-slate-900 transition-colors ease-in-out hover:bg-emerald-400 focus:bg-emerald-400"
                  key={locale}
                  href={`/${locale}`}
                >
                  {/* @ts-expect-error additional.d.ts cant find this key * /}
                  {t(languages[locale].i18nKey)}
                </Link>
              </>
            ))}
          </div> */}
          <div className="text-xs text-slate-400">{t("copyright")}</div>
        </div>
        <a
          className="ml-auto flex h-8 w-8 items-center justify-center justify-self-end rounded-sm bg-emerald-800"
          href="#top"
        >
          <FontAwesomeIcon icon={faArrowUp} />
          <span className="sr-only">{t("scroll_to_top")}</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
