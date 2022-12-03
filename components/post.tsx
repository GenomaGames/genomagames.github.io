import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import remarkEmoji from "remark-emoji";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import remarkUnwrapImages from "remark-unwrap-images";
import { visit } from "unist-util-visit";
import { remove } from "unist-util-remove";
import type hast from "hast";
import type mdast from "mdast";
import type unist from "unist";
import PostHeader from "@/components/post-header";
import PostFooter from "@/components/post-footer";

import markdownStyles from "@/components/markdown-styles.module.css";
import "prism-themes/themes/prism-vsc-dark-plus.min.css";
import { faPersonDigging } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostType from "@/interfaces/post";

type Props = PostType;

function rehypeDefaultCodeLanguage(options = { language: "text" }) {
  return (tree: hast.Node) => {
    visit(tree, "element", (node: hast.Element, index, parent) => {
      if (node.tagName === "code") {
        if (node.properties === undefined) {
          node.properties = {
            className: [],
          };
        }

        if (!Array.isArray(node.properties.className)) {
          node.properties.className = [];
        }

        if (
          node.properties.className.findIndex((className) =>
            String(className).startsWith("language-")
          ) === -1
        ) {
          node.properties.className.push(`language-${options.language}`);
        }
      }
    });
  };
}

function remarkRemoveFirstHeader() {
  return (tree: unist.Node) => {
    remove(tree, (node, index, parent) => {
      return (
        index === 0 &&
        node.type === "heading" &&
        (node as mdast.Heading).depth === 1
      );
    });
  };
}

const Post: React.JSXElementConstructor<Props> = (props: Props) => {
  const { content, draft, title, slug } = props;

  return (
    <article className="container mx-auto mb-4 break-words rounded-md bg-gray-800 drop-shadow-xl">
      {draft && (
        <div
          className="absolute top-0 right-0 w-8 rounded-tr-md rounded-bl-md bg-indigo-700 text-center"
          title="Draft post"
        >
          <FontAwesomeIcon icon={faPersonDigging} />
        </div>
      )}
      <PostHeader {...props} />

      <div className="px-3 py-4 sm:px-6 md:px-8">
        <ReactMarkdown
          className={markdownStyles["markdown"]}
          remarkPlugins={[
            remarkRemoveFirstHeader,
            remarkSqueezeParagraphs,
            remarkEmoji,
            remarkUnwrapImages,
          ]}
          rehypePlugins={[
            rehypeRaw,
            rehypeDefaultCodeLanguage,
            rehypeExternalLinks,
            rehypeSlug,
            rehypeAutolinkHeadings,
            rehypePrismPlus,
          ]}
          remarkRehypeOptions={{
            allowDangerousHtml: true,
          }}
        >
          {content}
        </ReactMarkdown>

        <PostFooter slug={slug} title={title} />
      </div>
    </article>
  );
};

export default Post;
