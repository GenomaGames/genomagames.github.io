import { PostItem } from "genoma-games-website";

import { draftPost, post, postWithoutCover } from "./_fixtures";
import { Main } from "./_shell";

// The card the post lists are built from. `locale` is a prop here because the
// exported view is the synchronous half of src/components/post-item.tsx — the
// default export awaits the request locale and hands it to this one.
export const WithCoverImage = () => (
  <Main>
    <PostItem {...post} locale="en" />
  </Main>
);

export const WithoutCoverImage = () => (
  <Main>
    <PostItem {...postWithoutCover} locale="en" />
  </Main>
);

export const Draft = () => (
  <Main>
    <PostItem {...draftPost} locale="en" />
  </Main>
);
