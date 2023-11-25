import "prism-themes/themes/prism-vsc-dark-plus.min.css";

import { faPersonDigging } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PostFooter from "@/src/components/post-footer";
import PostHeader from "@/src/components/post-header";
import markdownStyles from "@/src/styles/markdown-styles.module.css";

import { Post } from "../Posts/domain/Post";

type Props = Post;

const PostArticle: React.JSXElementConstructor<Props> = (props: Props) => {
  const { content, draft, title, slug } = props;

  return (
    <article className="container mx-auto mb-4 break-words rounded-md bg-gray-800 drop-shadow-xl">
      {draft && (
        <div
          className="absolute right-0 top-0 w-8 rounded-bl-md rounded-tr-md bg-indigo-700 text-center"
          title="Draft post"
        >
          <FontAwesomeIcon icon={faPersonDigging} />
        </div>
      )}
      <PostHeader {...props} />

      <div className="px-3 py-4 sm:px-6 md:px-8">
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <PostFooter slug={slug} title={title} />
      </div>
    </article>
  );
};

export default PostArticle;
