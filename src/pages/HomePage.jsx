import React, { useEffect } from "react";

import PostList from "./../components/posts/PostList";
import { usePost } from "./../hooks/usePost";

import useApi from "./../hooks/useApi";
import { actions } from "../action";
import NewPost from "../components/posts/NewPost";

function HomePage() {
  const { state, dispatch } = usePost();
  console.log(state);
  const { api } = useApi();
  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });
    async function postFetch() {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_BASE_URL}/posts`
        );

        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, payload: response.data });
        }
      } catch (err) {
        dispatch({ type: actions.post.DATA_FETCH_ERROR, payload: err });
        console.log(err.message);
      }
    }
    postFetch();
  }, []);

  if (state?.loading) {
    return <div> We are working...</div>;
  }

  if (state?.error) {
    return <div> Error in fetching posts {state?.error?.message}</div>;
  }

  return (
    <div>
      <NewPost />
      <PostList posts={state?.posts} />
    </div>
  );
}

export default HomePage;
