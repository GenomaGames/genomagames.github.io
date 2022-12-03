import PostItem from "@/components/post-item";
import PostType from "@/interfaces/post";

interface Props {
  posts: PostType[];
}

const PostsList: React.JSXElementConstructor<Props> = (props) => {
  return (
    <div>
      {props.posts.map((post, index) => (
        <PostItem key={index} {...post} />
      ))}
    </div>
  );
};

export default PostsList;
