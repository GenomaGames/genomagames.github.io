import { PostsList } from "genoma-games-website";

import { post, posts } from "./_fixtures";
import { Main } from "./_shell";

// How the home page and the paginated archive render their feed
// (src/app/[locale]/(main)/page.tsx).
export const Feed = () => (
  <Main>
    <PostsList className="mx-auto max-w-sm sm:max-w-full" locale="en" posts={posts} />
  </Main>
);

export const SinglePost = () => (
  <Main>
    <PostsList className="mx-auto max-w-sm sm:max-w-full" locale="en" posts={[post]} />
  </Main>
);

export const Empty = () => (
  <Main>
    <PostsList className="mx-auto max-w-sm sm:max-w-full" locale="en" posts={[]} />
    <p className="text-sm text-slate-400">No posts yet — the list renders nothing.</p>
  </Main>
);
