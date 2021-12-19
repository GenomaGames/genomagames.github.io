import * as React from "react";
import { graphql, PageProps } from "gatsby";

import Layout from "../components/layout";
import Post from "../components/post";
import { MdxNode } from "../types/MdxNode";

export const query = graphql`
  query PostPage($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        author {
          nickname
        }
        date(formatString: "YYYY-MM-DD")
        title
        hero_image {
          src {
            childImageSharp {
              gatsbyImageData
            }
          }
          alt
          author {
            name
            url
          }
        }
      }
      body
      headings {
        depth
        value
      }
      id
    }
  }
`;

type PostPageData = {
  mdx: MdxNode;
};

type PostPageProps = PageProps<PostPageData>;

const PostPage: React.FunctionComponent<PostPageProps> = ({ data }) => {
  const frontmatter = data.mdx.frontmatter;

  if (!frontmatter.date) throw new Error(`Missing "date" in ${data.mdx.slug}`);

  const pageTitle: string | undefined = data.mdx.headings[0].value;

  if (!pageTitle) throw new Error(`Unable to get a title on ${data.mdx.slug}`);

  return (
    <Layout pageTitle={pageTitle} isTitleHidden>
      <Post {...data.mdx} />
    </Layout>
  );
};

export default PostPage;
