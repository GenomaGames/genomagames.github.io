import * as React from "react";
import { graphql, PageProps } from "gatsby";

import Layout from "../components/layout";
import Post from "../components/post";
import { MdxNode } from "../types/MdxNode";
import { SiteNode } from "../types/SiteNode";

export const query = graphql`
  query PostPage($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        author {
          nickname
        }
        date(formatString: "YYYY-MM-DD")
        title
        cover_image {
          src {
            childImageSharp {
              gatsbyImageData
            }
            relativePath
          }
          alt
          credit {
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
      slug
    }
    site {
      siteMetadata {
        description
        title
        siteUrl
      }
    }
  }
`;

type PostPageData = {
  mdx: MdxNode;
  site: SiteNode;
};

type PostPageProps = PageProps<PostPageData>;

const PostPage: React.FunctionComponent<PostPageProps> = ({ data }) => {
  const frontmatter = data.mdx.frontmatter;

  if (!frontmatter.date) throw new Error(`Missing "date" in ${data.mdx.slug}`);

  const pageTitle: string | undefined = data.mdx.headings[0].value;

  if (!pageTitle) throw new Error(`Unable to get a title on ${data.mdx.slug}`);

  return (
    <Layout pageTitle={pageTitle} isTitleHidden>
      <Post mdx={data.mdx} siteUrl={data.site.siteMetadata.siteUrl as string} />
    </Layout>
  );
};

export default PostPage;
