import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import MovingAnimation from "./MovingAnimation";
import LoginInformation from "./LoginInformation";
import SubmitButton from "./SubmitButton";
function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    // No real login; just a placeholder
    console.log("Submitted:", data);
  };

  return (
    <div className="flex items-center justify-center p-4 mt-4 mb-4">
      <div className="flex flex-col w-full max-w-6xl overflow-hidden bg-white rounded-2xl shadow-lg md:flex-row">
        {/* Left animation */}
        <MovingAnimation />
        {/* Right form section */}
        <div className="w-full p-8 md:w-1/2">
          <h2 className="mb-2 text-2xl font-bold text-[#1e3a8a] md:text-3xl">
            Đăng nhập
          </h2>
          <p className="mb-6 text-sm text-gray-600 md:text-base">
            Vui lòng nhập email và mật khẩu để đăng nhập vào hệ thống.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <LoginInformation register={register} errors={errors} />
            {/* Login button and forgot password */}
            <div className="flex flex-col items-center justify-between gap-4 mb-4 sm:flex-row sm:gap-0">
              <SubmitButton />
              <Link
                to="/forget-password"
                className="hover:underline text-sm text-blue-600 w-full sm:w-auto text-center sm:text-right"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600 sm:text-left">
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
