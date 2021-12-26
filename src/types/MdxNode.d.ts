import * as gatsby from "gatsby";
import { FileSystemNode } from "gatsby-source-filesystem";

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
    cover_image?: {
      src?: FileSystemNode;
      alt?: string;
      credit?: {
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
