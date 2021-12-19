import * as React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faIdCard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import {
  author,
  content,
  heroImage,
  post,
  publishDate,
} from "./post.module.css";
import { MdxNode } from "../types/MdxNode";

type PostProps = MdxNode;

const Post: React.FunctionComponent<PostProps> = (props) => {
  const { body, frontmatter, headings, id } = props;
  const heroImageSrc: ImageDataLike | undefined = frontmatter.hero_image?.src;
  const heroImageData: IGatsbyImageData | undefined =
    heroImageSrc && getImage(heroImageSrc);

  return (
    <article className={post}>
      {/* <div>
        <FontAwesomeIcon icon={faIdCard} /> <span>{id}</span>
      </div> */}
      <div className={author}>
        <FontAwesomeIcon icon={faUser} />{" "}
        <span>{frontmatter.author?.nickname}</span>
      </div>
      <div className={publishDate}>
        <FontAwesomeIcon icon={faCalendar} /> <span>{frontmatter.date}</span>
      </div>

      {heroImageData && (
        <GatsbyImage
          image={heroImageData}
          alt={frontmatter.hero_image?.alt || "Hero Image"}
          className={heroImage}
        />
      )}

      <div className={content}>
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    </article>
  );
};

export default Post;
