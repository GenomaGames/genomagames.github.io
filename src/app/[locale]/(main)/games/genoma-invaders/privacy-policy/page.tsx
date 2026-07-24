import fs from "node:fs";
import path from "node:path";
import { ParsedUrlQuery } from "node:querystring";

import { Metadata } from "next";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import { unified } from "unified";

import markdownStyles from "@/src/styles/markdown-styles.module.css";

interface Params extends ParsedUrlQuery {
  locale: string;
}

interface Props {
  params: Promise<Params>;
}

export const metadata: Metadata = {
  title: "Privacy Policy - Genoma Invaders",
  description: "Genoma Invaders' Privacy Policy",
};

async function getPrivacyPolicyContent(_locale: string) {
  // You might want to have localized versions in the future
  const filePath = path.join(
    process.cwd(),
    "data/games/genoma-invaders/privacy-policy.md",
  );

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Remove frontmatter comment lines
    const cleanedContent = fileContent
      .replace(/\[\/\/\]: # .*$/gm, "")
      .replace(/<!-- filepath:.*? -->/g, "");

    // Process markdown using your existing unified pipeline
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkSqueezeParagraphs)
      .use(remarkEmoji)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeUnwrapImages)
      .use(rehypeExternalLinks)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings)
      .use(rehypePrettyCode, {
        keepBackground: false,
        theme: JSON.parse(
          fs.readFileSync(
            path.join(process.cwd(), "src/CodeThemes/moonlight-ii.json"),
            "utf-8",
          ),
        ),
      })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(cleanedContent);

    return processedContent.toString();
  } catch (error) {
    console.error("Error reading or processing privacy policy file:", error);

    return "<p>Privacy policy content could not be loaded.</p>";
  }
}

const PrivacyPolicyPage = async (props: Props) => {
  const params = await props.params;
  const content = await getPrivacyPolicyContent(params.locale);

  return (
    <div className={markdownStyles["markdown"]}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PrivacyPolicyPage;
