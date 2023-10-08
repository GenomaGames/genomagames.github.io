import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DiscussionEmbed } from "disqus-react";

interface Props {
  slug: string;
  title: string;
}

const PostFooter: React.JSXElementConstructor<Props> = ({
  slug,
  title,
}: Props) => {
  const twitterShareUrl = new URL("https://twitter.com/intent/tweet");
  const postUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${slug}`;

  twitterShareUrl.searchParams.set(
    "text",
    `${title} by @${process.env.NEXT_PUBLIC_TWITTER_USERNAME} ${process.env.NEXT_PUBLIC_TWITTER_SHARE_POST_HASHTAGS} ${postUrl}`,
  );

  return (
    <>
      <hr className="my-4 border-t-2 border-indigo-600" />

      <a
        className="mb-4 inline-block h-8 rounded-md bg-[#00acee] px-3 font-bold leading-8"
        href={twitterShareUrl.href}
      >
        <FontAwesomeIcon className="mr-1" icon={faTwitter} />
        <span>Tweet this</span>
      </a>

      {process.env.NEXT_PUBLIC_DISQUS_SHORTNAME && (
        <DiscussionEmbed
          shortname={process.env.NEXT_PUBLIC_DISQUS_SHORTNAME}
          config={{
            identifier: slug,
            title: title,
          }}
        />
      )}
    </>
  );
};

export default PostFooter;
