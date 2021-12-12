import { Node } from "gatsby";

export interface MdxNode extends Node {
  excerpt: string;
  frontmatter: {
    author?: {
      nickname: string;
      url: string;
    };
    date?: string;
    excerpt?: string;
    title?: string;
  };
  headings: {
    depth: number;
    value: string;
  }[];
  slug: string;
}
