import * as React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from "gatsby-plugin-image";
import { Disqus, DisqusConfig } from "gatsby-plugin-disqus";
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

type PostProps = {
  mdx: MdxNode;
  siteUrl: string;
};

const Post: React.FunctionComponent<PostProps> = ({ mdx, siteUrl }) => {
  const { frontmatter } = mdx;
  const heroImageSrc: ImageDataLike | undefined = frontmatter.hero_image?.src;
  const heroImageData: IGatsbyImageData | undefined =
    heroImageSrc && getImage(heroImageSrc);
  const postUrl: string = `${siteUrl}/${mdx.slug}`;
  const disqusConfig: DisqusConfig = {
    identifier: mdx.id,
    url: postUrl,
    title: frontmatter.title,
  };

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
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </div>

      <hr />

      <footer>
        <Disqus config={disqusConfig} />
      </footer>
    </article>
  );
};

export default Post;
