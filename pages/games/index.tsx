import { GetStaticProps, GetStaticPropsResult } from "next";
import Layout from "@/components/layout";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

interface Props {
  games: {
    coverImage: {
      src: string;
    } | null;
    isInDevelopment: boolean;
    releasedAt: Date | null;
    slug: string;
    summary: string;
    name: string;
  }[];
}

const GamesPage: React.JSXElementConstructor<Props> = ({ games }: Props) => {
  return (
    <Layout>
      <article className="mb-8">
        <h1 className="mb-4 inline-block w-full self-center px-8 text-center text-2xl font-bold md:text-3xl lg:text-4xl">
          Our Games
        </h1>
        <div className="mx-auto grid max-w-sm gap-x-4 gap-y-6 sm:max-w-full sm:grid-cols-2">
          {games.map(
            ({ coverImage, releasedAt, slug, summary, name: title }, index) => {
              return (
                <article key={index} className="mx-auto">
                  <Link
                    className="md group relative block rounded-md bg-gray-800 drop-shadow-xl transition-colors ease-in-out"
                    href="games/[game]"
                    as={`/games/${slug}`}
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
                        <div className="h-2 w-full rounded-t-md bg-gradient-to-r from-emerald-500 via-emerald-700 to-indigo-800 group-hover:from-emerald-300 group-hover:to-indigo-700 group-focus:from-emerald-300 group-focus:to-indigo-700"></div>
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
                          <span className="mr-2">Release date:</span>
                          {releasedAt !== null ? (
                            <time dateTime={format(releasedAt, "yyyy-MM-dd")}>
                              {format(releasedAt, "yyyy-MM-dd")}
                            </time>
                          ) : (
                            <abbr title="To be decided">TBD</abbr>
                          )}
                        </div>
                      </footer>
                    </div>
                  </Link>
                </article>
              );
            }
          )}
        </div>
      </article>
    </Layout>
  );
};

export default GamesPage;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const result: GetStaticPropsResult<Props> = {
    props: {
      games: [
        {
          coverImage: null,
          isInDevelopment: true,
          releasedAt: null,
          slug: "genoma-invaders",
          summary:
            "Fixed shooter (Shoot 'em up) where you control a microscopic 🔬 robot exploring the human body while fighting off bacteria, viruses, and other microorganisms 🦠.",
          name: "Genoma Invaders",
        },
      ],
    },
  };

  return result;
};
