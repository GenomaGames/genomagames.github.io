import { PostArticle } from "genoma-games-website";

import { draftPost, post } from "./_fixtures";
import { Main } from "./_shell";

// The full post page body: cover header, rendered markdown, share footer, and
// the draft badge. `content` is an HTML string — the markdown is rendered
// upstream and handed to the component already compiled.
export const Published = () => (
  <Main>
    <PostArticle {...post} />
  </Main>
);

export const Draft = () => (
  <Main>
    <PostArticle {...draftPost} />
  </Main>
);
