import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql, Node } from "gatsby";

import SiteHeader from "./siteHeader";

import { main } from "./layout.module.css";

interface NavJsonNode extends Node {
  name: string;
  to: string;
}

interface SiteNode extends Node {
  siteMetadata: {
    siteUrl: string;
    title: string;
  };
}

interface LayoutData {
  allNavJson: {
    nodes: NavJsonNode[];
  };
  site: SiteNode;
}

interface LayoutProps {
  pageTitle: string;
  isTitleHidden?: boolean;
}

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  const { children, pageTitle, isTitleHidden: titleHidden } = props;

  const data: LayoutData = useStaticQuery(graphql`
    query Layout {
      allNavJson {
        nodes {
          name
          to
        }
      }
      site {
        siteMetadata {
          siteUrl
          title
        }
      }
    }
  `);

  return (
    <>
      <Helmet>
        <title>
          {pageTitle} | {data.site.siteMetadata.title}
        </title>
        <meta name="robots" content="noindex" />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#81e66c"
        />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#603cba"></meta>
      </Helmet>

      <SiteHeader
        title={data.site.siteMetadata.title}
        homeUrl="/"
        navItems={data.allNavJson.nodes}
      ></SiteHeader>

      <main className={main}>
        <h1 hidden={titleHidden}>{pageTitle}</h1>
        {children}
      </main>
    </>
  );
};

export default Layout;
