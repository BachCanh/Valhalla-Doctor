import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SubmitButton from "./SubmitButton";
import MovingAnimation from "./MovingAnimation";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = (data) => {
    console.log("Submitted:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 -mt-16 px-4">
      <div className="flex flex-col w-full max-w-6xl overflow-hidden bg-white rounded-2xl shadow-lg md:flex-row">
        {/* Left animation */}
        <MovingAnimation />

        {/* Right form section */}
        <div className="w-full px-8 py-10 md:w-1/2">
          <h2 className="mb-3 text-3xl font-bold text-[#1e3a8a]">Đăng nhập</h2>
          <p className="mb-6 text-sm text-gray-600 md:text-base">
            Vui lòng nhập email và mật khẩu để đăng nhập vào hệ thống.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email hoặc Số điện thoại
              </label>
              <input
                type="text"
                {...register("email", { required: "Vui lòng nhập email hoặc số điện thoại" })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Vui lòng nhập mật khẩu" })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <div
                onClick={togglePassword}
                className="absolute top-[38px] right-3 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Button & Forgot */}
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
              <SubmitButton />
              <Link
                to="/forget-password"
                className="text-sm text-blue-600 hover:underline text-center sm:text-right"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </form>

          {/* Register link */}
          <p className="mt-6 text-sm text-center text-gray-600 sm:text-left">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
