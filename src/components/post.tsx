import * as React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { Disqus, DisqusConfig } from "gatsby-plugin-disqus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileSystemNode } from "gatsby-source-filesystem";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";

import { MdxNode } from "../types/MdxNode";

import {
  author,
  content,
  coverImage,
  post,
  publishDate,
} from "./post.module.css";

type PostProps = {
  mdx: MdxNode;
  siteUrl: string;
};

const Post: React.FunctionComponent<PostProps> = ({ mdx, siteUrl }) => {
  const { frontmatter } = mdx;
  const coverImageSrc: FileSystemNode | undefined =
    frontmatter.cover_image?.src;
  const coverImageData: IGatsbyImageData | undefined =
    coverImageSrc && getImage(coverImageSrc);
  const postUrl: string = `${siteUrl}/${mdx.slug}`;
  const disqusConfig: DisqusConfig = {
    identifier: mdx.id,
    url: postUrl,
    title: frontmatter.title,
  };

  return (
    <article className={post}>
      <div className={author}>
        <FontAwesomeIcon icon={faUser} />{" "}
        <span>{frontmatter.author?.nickname}</span>
      </div>
      <div className={publishDate}>
        <FontAwesomeIcon icon={faCalendar} /> <span>{frontmatter.date}</span>
      </div>

      {process.env.NODE_ENV === "development" ? (
        <div>
          <h2>Debugging</h2>
          <ul>
            <li>
              <strong>ID:</strong> <span>{mdx.id}</span>
            </li>
            <li>
              <strong>Slug:</strong> <span>{mdx.slug}</span>
            </li>
            <li>
              <strong>Cover Image:</strong>{" "}
              <span>{coverImageSrc?.relativePath}</span>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}

      {coverImageData && (
        <GatsbyImage
          image={coverImageData}
          alt={frontmatter.cover_image?.alt || "Hero Image"}
          className={coverImage}
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
