import { ParsedUrlQuery } from "node:querystring";

import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { listGamesUseCase } from "@/src/Games/application/ListGamesUserCase";

interface Params extends ParsedUrlQuery {
  locale: string;
}

interface Props {
  params: Promise<Params>;
}

export const generateMetadata = async (
  { params }: { params: Promise<Params> }
): Promise<Metadata> => {
  const { locale } = await params;
  
  setRequestLocale(locale);
  
  const t = await getTranslations({
    locale,
    namespace: "GamesPage",
  });
  
  return {
    title: `${t("meta_title")} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: t("meta_description"),
  };
};

const GamesPage: React.JSXElementConstructor<Props> = async (props: Props) => {
  const { locale } = await props.params;
  
  setRequestLocale(locale);
  
  const t = await getTranslations({
    locale,
    namespace: "GamesPage",
  });
  
  const { entities: games } = await listGamesUseCase.run({ locale });

  return (
    <div className="mb-8">
      <h1 className="mb-4 inline-block w-full self-center px-8 text-center text-2xl font-bold md:text-3xl lg:text-4xl">
        {t("title")}
      </h1>
      <div className="mx-auto grid max-w-sm gap-x-4 gap-y-6 sm:max-w-full sm:grid-cols-2">
        {games.map(
          ({ coverImage, releasedAt, slug, summary, name: title }, index) => {
            return (
              <article key={index} className="mx-auto w-full">
                <Link
                  className="md group relative block rounded-md bg-gray-800 drop-shadow-xl transition-colors ease-in-out"
                  href={`/${locale}/games/${slug}`}
                >
                  <header>
                    {coverImage ? (
                      <Image
                        alt={title}
                        src={coverImage.src}
                        className="mb-2 aspect-video max-h-36 w-full rounded-t-md object-cover brightness-50 group-hover:brightness-100"
                        width={384}
                        height={144}
                      />
                    ) : (
                      <div className="h-2 w-full rounded-t-md bg-linear-to-r from-emerald-500 via-emerald-700 to-indigo-800 group-hover:from-emerald-300 group-hover:to-indigo-700 group-focus:from-emerald-300 group-focus:to-indigo-700"></div>
                    )}
                    <h2 className="mt-3 mb-2 px-3 text-lg font-bold text-emerald-500 transition-colors ease-in-out group-hover:text-emerald-200 group-hover:underline group-hover:underline-offset-4 group-focus:text-emerald-200 group-focus:underline group-focus:underline-offset-4">
                      {title}
                    </h2>
                  </header>
                  <div className="px-3 pb-4">
                    <p className="mb-2">{summary}</p>
                    <footer className="text-right text-sm leading-none text-slate-400">
                      <div className="inline-block">
                        <FontAwesomeIcon
                          className="mr-1"
                          icon={faCalendarDay}
                          size="sm"
                        />
                        <span className="mr-2">{t("release_date")}</span>
                        {releasedAt !== null ? (
                          <time dateTime={format(releasedAt, "yyyy-MM-dd")}>
                            {format(releasedAt, "yyyy-MM-dd")}
                          </time>
                        ) : (
                          <abbr title={t("to_be_decided")}>TBD</abbr>
                        )}
                      </div>
                    </footer>
                  </div>
                </Link>
              </article>
            );
          },
        )}
      </div>
    </div>
  );
};

export default GamesPage;
