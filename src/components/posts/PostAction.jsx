import { useState } from "react";

import Like from "../../assets/icons/like.svg";
import BlueLike from "../../assets/icons/blueLike.svg";

import Comment from "../../assets/icons/comment.svg";
import Share from "../../assets/icons/share.svg";
import useApi from "../../hooks/useApi";
import { isLikedByMe } from "../../utils";

function PostAction({ postId, commentCount, post }) {
  const isLiked = isLikedByMe(post);

  const [liked, setLiked] = useState(isLiked);
  const { api } = useApi();

  const handleLike = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_BASE_URL}/posts/${postId}/like`
      );
      // console.log(response);

      if (response.status === 200) {
        setLiked(!liked);
      }
    } catch (error) {
      console.error(error);
      setLiked(false);
    }
  };
  return (
    <div class="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      <button
        onClick={handleLike}
        class="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
      >
        {liked ? (
          <>
            <img src={BlueLike} alt="Like" />
            <span className="text-sky-600">Like</span>
          </>
        ) : (
          <>
            <img src={Like} alt="Like" />
            <span>Like</span>
          </>
        )}
      </button>

      <button class="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
        <img src={Comment} alt="Comment" />
        <span>Comment ({commentCount ?? 0})</span>
      </button>

      <button class="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
        <img src={Share} alt="Share" />
        <span>Share</span>
      </button>
    </div>
  );
}

export default PostAction;
