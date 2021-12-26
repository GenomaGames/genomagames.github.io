import fs from "fs";
import path from "path";

import { GatsbyGraphQLObjectType, GatsbyNode } from "gatsby";

import { isObject } from "./src/utils/isObject";

const gatsbyNode: GatsbyNode = {
  createSchemaCustomization: ({ actions, schema }) => {
    const { createTypes } = actions;

    const authorJsonType: string = fs
      .readFileSync(`${__dirname}/src/graphql/schemas/AuthorJson.graphql`)
      .toString();

    createTypes(authorJsonType);

    const mdxFrontmatterType: GatsbyGraphQLObjectType = schema.buildObjectType({
      name: "MdxFrontmatter",
      fields: {
        author: {
          type: "AuthorJson",
          resolve: (source, args, context, info) => {
            return context.nodeModel.findOne({
              type: "AuthorJson",
              query: {
                filter: {
                  nickname: {
                    eq: source.author || "AlbertoFdzM",
                  },
                },
              },
            });
          },
        },
        title: {
          type: "String",
        },
      },
    });

    createTypes(mdxFrontmatterType);
  },

  onCreateNode: ({ actions, node, createNodeId, createContentDigest }) => {
    if (node.internal.type === "Mdx") {
      const frontmatterDate: string | null =
        (isObject(node.frontmatter) &&
          "date" in node.frontmatter &&
          typeof node.frontmatter.date === "string" &&
          node.frontmatter.date) ||
        null;

      let date: Date | null =
        frontmatterDate !== null ? new Date(frontmatterDate) : null;

      if (date === null && typeof node.fileAbsolutePath === "string") {
        const basename: string = path.basename(node.fileAbsolutePath);

        const basenameDate: string = basename.replace(
          /(\d{4}-\d{2}-\d{2})?.*/,
          "$1"
        );

        date = basenameDate ? new Date(basenameDate) : null;
      }

      const postNodeData = {
        date: date,
        id: createNodeId(node.id),
        parent: node.id,
      };

      actions.createNode({
        ...postNodeData,
        internal: {
          type: "Post",
          contentDigest: createContentDigest(JSON.stringify(postNodeData)),
        },
      });
    }
  },
};

module.exports = gatsbyNode;
