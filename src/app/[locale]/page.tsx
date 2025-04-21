import { ParsedUrlQuery } from "node:querystring";

import Link from "next/link";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import PostsList from "@/src/components/posts-list";
import { listPostsUseCase } from "@/src/Posts/application/ListPostsUseCase";

interface Params extends ParsedUrlQuery {
  locale: string;
}

interface Props {
  params: Promise<Params>;
}

const IndexPage: React.JSXElementConstructor<Props> = async (props: Props) => {
  const { locale } = await props.params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: "IndexPage",
  });

  const { entities: posts, hasMore } = await listPostsUseCase.run({
    page: 1,
    locale,
  });

  return (
    <>
      <PostsList className="mx-auto max-w-sm sm:max-w-full" posts={posts} />
      {hasMore && (
        <nav className="mx-auto max-w-sm sm:max-w-full">
          <Link
            className="mb-4 block h-10 flex-1 rounded bg-emerald-600 text-center font-bold leading-10 text-slate-900 transition-colors ease-in-out hover:bg-emerald-400 focus:bg-emerald-400"
            href={`/${locale}/2`}
            rel="next"
          >
            {t("more_posts")}
          </Link>
        </nav>
      )}
    </>
  );
};

export default IndexPage;
