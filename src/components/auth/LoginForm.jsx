import React from "react";
import Field from "../common/Field";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  

  async function submitForm(formData) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        formData
      );
      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;
          console.log(`login time: ${token}`);
          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
      setError('root.random',{
        type: "server",
        message: err.response.data.error,
      })
      // console.log(err.response.data.error)
    }
  }
  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", {
            required: "Email is required",
            // pattern: /^\S+@\S+\.\S+$/,
          })}
          className={`auth-input ${
            !!errors.email ? "border-red-600" : "border-gray-200"
          }`}
          type="email"
          name="email"
          id="email"
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          className={`auth-input ${
            !!errors.password ? "border-red-600" : "border-gray-200"
          }`}
          type="password"
          name="password"
          id="password"
        />
      </Field>
     <p className="text-red-600">{errors?.root?.random?.message}</p>
      <Field>
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  );
}

export default LoginForm;
