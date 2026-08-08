// The components read `process.env.NEXT_PUBLIC_*` at render time (share URLs,
// site name). Outside Next.js there is no `process`, so the first component to
// touch it throws and the whole preview goes blank.
//
// Values are the repo's own public ones (from .env.example, plus the real
// public base URL from frontmatter.json). Nothing secret belongs here — this
// file is committed and the bundle it feeds is uploaded.
declare const globalThis: { process?: { env: Record<string, string> } };

const env: Record<string, string> = {
  NODE_ENV: "development",
  NEXT_PUBLIC_BASE_URL: "https://genomagames.com",
  NEXT_PUBLIC_DISQUS_SHORTNAME: "genomagames",
  NEXT_PUBLIC_POSTS_PER_PAGE: "10",
  NEXT_PUBLIC_SHOW_DRAFTS: "true",
  NEXT_PUBLIC_SITE_DESCRIPTION: "Indie Game Development Studio located in Madrid, Spain",
  NEXT_PUBLIC_SITE_NAME: "Genoma Games",
  NEXT_PUBLIC_X_SHARE_POST_HASHTAGS: "#gamedev",
  NEXT_PUBLIC_X_USERNAME: "GenomaGames",
};

globalThis.process = globalThis.process ?? { env };
Object.assign(globalThis.process.env, { ...env, ...globalThis.process.env });

export {};
