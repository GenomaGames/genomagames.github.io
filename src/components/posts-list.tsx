import { getLocale } from "next-intl/server";

import { PostItemView } from "@/src/components/post-item";

import { Post } from "../Posts/domain/Post";

interface Props {
  className?: string;
  posts: Post[];
}

export type PostsListViewProps = Props & {
  locale: string;
};

/**
 * The list itself. Split out of the default export for the same reason as
 * PostItemView: it renders from the locale it is handed, so it works outside a
 * request scope.
 */
export const PostsListView: React.JSXElementConstructor<PostsListViewProps> = ({
  className,
  locale,
  posts,
}: PostsListViewProps) => {
  return (
    <div className={className}>
      {posts.map((post, index) => (
        <PostItemView key={index} {...post} locale={locale} />
      ))}
    </div>
  );
};

const PostsList: React.JSXElementConstructor<Props> = async (props: Props) => {
  const locale = await getLocale();

  return <PostsListView {...props} locale={locale} />;
};

export default PostsList;
