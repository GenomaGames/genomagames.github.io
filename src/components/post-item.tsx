import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";

import { Post } from "../Posts/domain/Post";
import DraftLabel from "./draft-label";
// import { CommentCount } from "disqus-react";

type Props = Post;

const PostItem: React.JSXElementConstructor<Props> = async ({
  coverImage,
  date,
  draft,
  summary,
  title,
  slug,
}: Props) => {
  const locale = await getLocale();

  return (
    <article className="mx-auto mb-4">
      <Link
        className="md group relative block rounded-md bg-gray-800 drop-shadow-xl transition-all duration-200 ease-in-out hover:scale-[1.02] hover:drop-shadow-2xl sm:pt-2 sm:pl-44 lg:pl-56"
        href={`/${locale}/posts/${slug}`}
      >
        <DraftLabel isDraft={draft} />
        <header>
          {coverImage ? (
            <Image
              alt={title}
              src={coverImage.src}
              className="mb-2 aspect-video max-h-36 w-full rounded-t-md object-cover brightness-50 transition-all duration-200 group-hover:brightness-100 sm:absolute sm:top-0 sm:left-0 sm:mb-0 sm:h-full sm:max-h-full sm:w-44 sm:rounded-none sm:rounded-l-md lg:w-56"
              width={384}
              height={144}
            />
          ) : (
            <div className="h-2 w-full rounded-t-md bg-linear-to-r from-emerald-500 via-emerald-700 to-indigo-800 transition-all duration-200 group-hover:from-emerald-300 group-hover:to-indigo-700 group-focus:from-emerald-300 group-focus:to-indigo-700 sm:absolute sm:top-0 sm:left-0 sm:h-full sm:w-44 sm:rounded-none sm:rounded-l-md sm:bg-linear-to-br lg:w-56"></div>
          )}
          <h2 className="mt-3 mb-2 px-3 text-lg font-bold text-emerald-500 transition-colors ease-in-out group-hover:text-emerald-200 group-hover:underline group-hover:underline-offset-4 group-focus:text-emerald-200 group-focus:underline group-focus:underline-offset-4 sm:mt-0">
            {title}
          </h2>
        </header>
        <div className="px-3 pb-4">
          <p className="mb-2">{summary}</p>

          <footer className="text-right text-sm leading-none text-slate-400">
            {/* <div className="inline-block mr-2">
              <CommentCount
                shortname={DISQUS_SHORTNAME}
                config={{
                  identifier: slug,
                  title: title,
                }}
              />
            </div> */}
            <time
              className="inline-block"
              dateTime={format(date, "yyyy-MM-dd")}
            >
              <FontAwesomeIcon
                className="mr-1"
                icon={faCalendarDay}
                size="sm"
              />
              <span>{format(date, "yyyy-MM-dd")}</span>
            </time>
          </footer>
        </div>
      </Link>
    </article>
  );
};

export default PostItem;
