import { useAuth } from "../hooks/useAuth";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import MyPost from "../components/profile/MyPost";
import { useProfile } from "../hooks/useProfile";
import { actions } from "./../action/index";

function ProfilePage() {
  const { api } = useApi();
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch({ type: actions.profile.DATA_FETCHING });
      try {
        const response = await api.get(
          `${import.meta.env.VITE_BASE_URL}/profile/${auth?.user?.id}`
        );
        // console.log(response.data);

        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: actions.profile.DATA_FETCH_ERROR });
      }
    };
    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div> Fetching your Profile data...</div>;
  }
  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        <ProfileInfo />
        <MyPost />
      </div>
    </main>
  );
}

export default ProfilePage;
