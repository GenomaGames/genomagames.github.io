import { PostHeader } from "genoma-games-website";

import { post, postWithoutCover } from "./_fixtures";
import { Main } from "./_shell";

// The masthead of a post page: cover art behind a darkening overlay, the title
// centred over it, and the publication date underneath.
export const WithCoverImage = () => (
  <Main>
    <article className="rounded-md bg-gray-800 drop-shadow-xl">
      <PostHeader {...post} />
    </article>
  </Main>
);

export const WithoutCoverImage = () => (
  <Main>
    <article className="rounded-md bg-gray-800 drop-shadow-xl">
      <PostHeader {...postWithoutCover} />
    </article>
  </Main>
);
