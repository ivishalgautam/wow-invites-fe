"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { isObject } from "@/utils/object";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  async function loginUser(credentials) {
    setLoading(true);
    try {
      const response = await http().post(endpoints.auth.login, credentials);
      localStorage.setItem("user", JSON.stringify(response.user_data));
      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refresh_token);
      router.push("/");

      return response.data;
    } catch (error) {
      console.log(error);
      if (isObject(error)) {
        toast.error(error.message);
      } else {
        toast.error("Unable to complete your request.");
      }
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (formData) => {
    await loginUser(formData);
    reset();
  };

  return (
    <div className="login-gradient flex h-screen items-center justify-center px-10">
      <div className="grid w-full max-w-7xl grid-cols-1 overflow-hidden rounded-2xl bg-white p-8 shadow-2xl sm:max-w-lg lg:grid-rows-1">
        <div className="col-span-2 grid grid-rows-4 bg-white">
          <div className="relative row-span-1">
            <Image
              src={"/logo.png"}
              fill
              alt="logo"
              className="object-contain object-center"
            />
          </div>
          <div className="row-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h3 className="font-primary text-center text-2xl font-bold text-[#110B56]">
                Welcome Back
              </h3>
              <div>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 pr-10 outline-none"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <span
                    className="absolute right-3 top-[50%] z-50 block -translate-y-[50%] cursor-pointer"
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary px-6 py-3 text-white"
              >
                {loading ? "loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
        {/* <div className="relative col-span-3">
          <Image
            src={"/login.png"}
            alt="login"
            fill
            className="object-contain object-center"
          />
        </div> */}
      </div>
    </div>
  );
}
