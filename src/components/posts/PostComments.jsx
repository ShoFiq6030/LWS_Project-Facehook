import React, { useState } from "react";

import PostCommentList from "./PostCommentList ";
import { useAuth } from "../../hooks/useAuth";

import { actions } from "../../action";
import useApi from "../../hooks/useApi";

function PostComments({ post}) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const { auth } = useAuth();
  
  const userAvatar = auth.user.avatar;
  const { api } = useApi();

  const addComment = async (event) => {
    const keyCode = event.keyCode;

    if (keyCode === 13) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_BASE_URL}/posts/${post.id}/comment`,
          { comment }
        );
        console.log(response);

        if (response.status === 200) {
          setComments(response.data.comments);
          setComment("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={`${import.meta.env.VITE_BASE_URL}/${userAvatar}`}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => addComment(e)}
          />
        </div>
      </div>
      <div className="mt-4">
        <button className="text-gray-300 max-md:text-sm">All Comment ▾</button>
      </div>

      <PostCommentList comments={comments} />
    </div>
  );
}

export default PostComments;
