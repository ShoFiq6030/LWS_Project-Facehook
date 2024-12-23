import { usePost } from "../../hooks/usePost";
import PostList from "../posts/PostList";
import { useProfile } from "./../../hooks/useProfile";

function MyPost() {
  const { state: profile } = useProfile();
  const { state: posts } = usePost();
  const allPosts = posts?.posts;
  const myPost = allPosts.filter(
    (post) => post?.author?.id === profile?.user?.id
  );
  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
      <PostList posts={myPost} />
    </>
  );
}

export default MyPost;
