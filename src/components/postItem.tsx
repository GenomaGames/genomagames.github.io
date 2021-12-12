import * as React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faUser,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";

import {
  authorIcon,
  calendarIcon,
  postExcerpt,
  postFooter,
  postItem,
  postTitle,
  publishDate,
  readMoreLink,
} from "./postItem.module.css";

interface PostItemProps {
  author?: {
    nickname: string;
    url: string;
  };
  excerpt: string;
  id: string;
  publishedAt: string;
  slug: string;
  title: string;
}

const PostItem: React.FunctionComponent<PostItemProps> = (
  props: PostItemProps
) => {
  const { author, excerpt, publishedAt, slug, title } = props;

  const postUrl = `/${slug}`;

  return (
    <article className={postItem}>
      <header>
        <h2 className={postTitle}>
          <Link to={postUrl}>{title}</Link>
        </h2>
      </header>
      <div className={postExcerpt}>
        <p>{excerpt}</p>
      </div>
      <footer className={postFooter}>
        <Link to={postUrl} className={readMoreLink}>
          Read more
        </Link>
        <div>
          {author ? (
            <>
              <FontAwesomeIcon icon={faUser} className={authorIcon} />
              <span>{author.nickname}</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faUserSecret} className={authorIcon} />
              <span>Anonymous</span>
            </>
          )}
        </div>
        <div className={publishDate}>
          <FontAwesomeIcon className={calendarIcon} icon={faCalendar} />
          {publishedAt}
        </div>
      </footer>
    </article>
  );
};

export default PostItem;
