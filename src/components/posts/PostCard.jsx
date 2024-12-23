import React from "react";
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostAction from './PostAction';
import PostComments from './PostComments';

function PostCard({post}) {
  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader post={post} />
      <PostBody poster={post?.image} content={post?.content} />
      <PostAction postId={post?.id} commentCount={post?.comments?.length} post={post} />
      <PostComments post={post} />
    </article>
  );
}

export default PostCard;
