import PostType from "@/interfaces/post";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import Image from "next/image";

type Props = PostType;

const PostHeader: React.JSXElementConstructor<Props> = ({
  coverImage,
  date,
  title,
}: Props) => {
  return (
    <header>
      <div className="h-36 leading-[9rem]">
        <div className="absolute left-0 right-0 top-0 -z-10 h-36 w-full overflow-hidden rounded-t-md">
          {coverImage ? (
            <Image
              src={coverImage.src}
              alt={title}
              className="absolute top-0 bottom-0 my-auto block h-full w-full object-cover opacity-40"
            />
          ) : (
            <div className="absolute top-0 bottom-0 h-full w-full bg-gradient-to-br from-emerald-900 to-indigo-900"></div>
          )}
          <div className="h-full w-full bg-black bg-opacity-50 backdrop-blur-sm"></div>
        </div>
        <h1 className="inline-block w-full text-center align-middle text-2xl font-bold">
          {title}
        </h1>
      </div>
      <div className="px-3 text-right sm:px-6 md:px-8">
        <time
          dateTime={format(date, "yyyy-MM-dd")}
          className="text-xs text-slate-400"
        >
          <FontAwesomeIcon className="mr-1" icon={faCalendarDay} size="sm" />
          <span>{format(date, "yyyy-MM-dd")}</span>
        </time>
      </div>
    </header>
  );
};

export default PostHeader;
