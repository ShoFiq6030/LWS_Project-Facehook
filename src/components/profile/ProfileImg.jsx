import React, { useRef } from "react";
import EditSvg from "../../assets/icons/edit.svg";
import { useProfile } from "./../../hooks/useProfile";
import { actions } from "../../action";
import useApi from "../../hooks/useApi";

function ProfileImg() {
  const fileUploaderRef = useRef();
  const { state, dispatch } = useProfile();
  const { api } = useApi();
  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };
  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploaderRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post(
        `${import.meta.env.VITE_BASE_URL}/profile/${state?.user?.id}/avatar`,
        formData
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="max-w-full rounded-full"
        src={`${import.meta.env.VITE_BASE_URL}/${state?.user?.avatar}`}
        alt={state?.user?.firstName}
      />

      <form id="form" encType="multipart/form-data">
        <button
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
          onClick={handleImageUpload}
          type="submit"
        >
          <img src={EditSvg} alt="Edit" />
        </button>
        <input id="file" type="file" hidden ref={fileUploaderRef} />
      </form>
    </div>
  );
}

export default ProfileImg;
