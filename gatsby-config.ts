import { GatsbyConfig } from "gatsby";

const gatsbyConfig: GatsbyConfig = {
  siteMetadata: {
    siteUrl: "https://genomagames.com",
    title: "Genoma Games",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/src/blog`,
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [
          {
            userAgent: "*",
            disallow: ["/"],
          },
        ],
      },
    },
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-disqus",
      options: {
        shortname: "your-disqus-shortname",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-remark-images",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          "gatsby-remark-images",
          "gatsby-remark-prismjs",
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              isIconAfterHeader: true,
            },
          },
        ],
        remarkPlugins: [require("remark-emoji")],
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-transformer-json",
  ],
};

export default gatsbyConfig;
