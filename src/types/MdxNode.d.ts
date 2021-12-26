import * as gatsby from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";

export interface MdxNode extends gatsby.Node {
  body: string;
  excerpt: string;
  frontmatter: {
    author?: {
      nickname: string;
      url: string;
    };
    date?: string;
    excerpt?: string;
    hero_image?: {
      src?: ImageDataLike;
      alt?: string;
      author?: {
        name?: string;
        url?: string;
      };
    };
    title?: string;
  };
  headings: {
    depth: number;
    value: string;
  }[];
  slug: string;
}
