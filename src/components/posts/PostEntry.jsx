import React from "react";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import Field from "./../common/Field";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "./../../hooks/usePost";
import useApi  from "../../hooks/useApi";
import { actions } from "../../action/index";

function PostEntry({ onCreate }) {
  const { auth } = useAuth();
  const {state, dispatch } = usePost();
  const { api } = useApi();
  console.log(state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const avatar = auth?.user?.avatar;

  const handlePostSubmit = (formData) => {
    console.log(formData);
    dispatch({ type: actions.post.DATA_FETCHING });
    async function postCreate() {
      try {
        const response = await api.post(
          `${import.meta.env.VITE_BASE_URL}/posts`,
          formData
        );
        console.log(response);

        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_CREATED, payload: response.data });
          onCreate();
        }
      } catch (err) {
        dispatch({ type: actions.post.DATA_CREATE_ERROR, payload: err });
        console.log(err.message);
      }

    }
    postCreate();
  };
  return (
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Create Post
      </h6>
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_BASE_URL}/${avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {auth?.user?.firstName} {auth?.user?.lastName}{" "}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer !text-gray-100"
            htmlFor="photo"
          >
            <img src={AddPhoto} alt="Add Photo" />
            Add Photo
          </label>
          <input type="file" name="photo" id="photo" className="hidden" />
        </div>
        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text is mandatory!",
            })}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
          ></textarea>
        </Field>
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostEntry;
