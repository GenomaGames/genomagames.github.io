// Design-sync entry: named re-exports of the site's components.
// The repo has no library build, and every component is a default export, so
// the converter's synthesized `export *` entry would export nothing. This file
// is the explicit barrel it bundles instead.
//
// The process shim is imported first on purpose: esbuild preserves import
// order, so `process.env` exists before any component module evaluates.
import "./shims/process";

export { default as AlphaSignUpForm } from "@/src/components/alpha-sign-up-form";
export { default as DraftLabel } from "@/src/components/draft-label";
export { default as Footer } from "@/src/components/footer";
export { default as Header } from "@/src/components/header";
export { default as ItchioWidget } from "@/src/components/itchio-widget";
export { default as LanguageSelector } from "@/src/components/language-selector";
export { default as PostArticle } from "@/src/components/post-article";
export { default as PostFooter } from "@/src/components/post-footer";
export { default as PostHeader } from "@/src/components/post-header";
// PostItem/PostsList are async server components (they await the request
// locale). Their presentational halves take `locale` as a prop and are what a
// browser can render — same code, one await lifted out.
export { PostItemView as PostItem } from "@/src/components/post-item";
export { PostsListView as PostsList } from "@/src/components/posts-list";
