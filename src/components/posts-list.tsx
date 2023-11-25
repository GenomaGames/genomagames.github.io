import PostItem from "@/src/components/post-item";

import { Post } from "../Posts/domain/Post";

interface Props {
  className?: string;
  posts: Post[];
}

const PostsList: React.JSXElementConstructor<Props> = (props) => {
  return (
    <div className={props.className}>
      {props.posts.map((post, index) => (
        <PostItem key={index} {...post} />
      ))}
    </div>
  );
};

export default PostsList;
