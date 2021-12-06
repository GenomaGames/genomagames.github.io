import fs from "fs";

import { GatsbyGraphQLObjectType, GatsbyNode } from "gatsby";

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
                    eq: source.author,
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
};

module.exports = gatsbyNode;
