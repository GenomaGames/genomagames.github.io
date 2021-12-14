import * as React from "react";
import { graphql, PageProps } from "gatsby";

import Layout from "../components/layout";
import { MdxNode } from "../types/MdxNode";
import PostItem from "../components/postItem";

interface HomePageData {
  allMdx: {
    nodes: MdxNode[];
  };
}

type HomePageProps = PageProps<HomePageData>;

export const query = graphql`
  query HomePage {
    allMdx(sort: { order: DESC, fields: frontmatter___date }) {
      nodes {
        excerpt
        frontmatter {
          author {
            nickname
            url
          }
          date(formatString: "YYYY-MM-DD")
          excerpt
          title
        }
        headings {
          depth
          value
        }
        id
        slug
      }
    }
  }
`;

const transformMdxNodeToPostItemProps: (
  node: MdxNode
) => React.ComponentPropsWithoutRef<typeof PostItem> = (node) => {
  if (!node.frontmatter.date)
    throw new Error(`Required frontmatter 'date' field in ${node.slug}`);

  const postItemProps: React.ComponentPropsWithoutRef<typeof PostItem> = {
    author: node.frontmatter.author,
    excerpt: node.excerpt,
    id: node.id,
    publishedAt: node.frontmatter.date,
    slug: node.slug,
    title: node.headings[0]?.value,
  };

  return postItemProps;
};

const IndexPage: React.FunctionComponent<HomePageProps> = (
  props: HomePageProps
) => {
  const { data } = props;

  const postItemsProps = data.allMdx.nodes.map(transformMdxNodeToPostItemProps);

  return (
    <Layout pageTitle="Home" isTitleHidden>
      {postItemsProps.map((postItemProps) => (
        <PostItem key={postItemProps.id} {...postItemProps} />
      ))}
    </Layout>
  );
};

export default IndexPage;
