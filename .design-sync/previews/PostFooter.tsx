import { PostFooter } from "genoma-games-website";

import { post } from "./_fixtures";
import { Main } from "./_shell";

// The share row that closes every post body (see PostArticle): a rule, then the
// "Post this" button pointing at X with the post's title and URL prefilled.
// The props only change the share URL, so there is one visual state.
export const Default = () => (
  <Main>
    <div className="rounded-md bg-gray-800 px-3 py-4 sm:px-6 md:px-8">
      <p className="mb-4 text-slate-300">…end of the post body.</p>
      <PostFooter slug={post.slug} title={post.title} />
    </div>
  </Main>
);
