import React, { useState } from "react";
import { useAvatar } from "./../../hooks/useAvatar";
import ThreeDotsIcon from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import TimeIcon from "../../assets/icons/time.svg";
import { getDateDifferenceFromNow } from "./../../utils/index";
import { useAuth } from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import { usePost } from "../../hooks/usePost";
import { actions } from "./../../action/index";

function PostHeader({ post }) {
  const [toggle, setToggle] = useState(false);
  const { avatarURL } = useAvatar(post);
  const { auth } = useAuth();
  const { api } = useApi();
  const { dispatch } = usePost();
  const isMe = post?.author?.id === auth?.user?.id;

  const handleDeletePost = async (postID) => {
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.delete(
        `${import.meta.env.VITE_BASE_URL}/posts/${postID}`
      );

      if (response.status === 200) {
        dispatch({
          type: actions.post.POST_DELETED,
          payload: post.id,
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: response.error,
      });
    }
  };

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={avatarURL}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcon} />
            <span className="text-sm text-gray-400 lg:text-base">{`${getDateDifferenceFromNow(
              post?.createAt
            )} ago`}</span>
          </div>
        </div>
      </div>

      <div class="relative">
        {isMe ? (
          <button onClick={() => setToggle(!toggle)}>
            <img src={ThreeDotsIcon} alt="3dots of Action" />
          </button>
        ) : null}

        {toggle && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button
              onClick={() => handleDeletePost(post.id)}
              class="action-menu-item hover:text-red-500"
            >
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default PostHeader;
