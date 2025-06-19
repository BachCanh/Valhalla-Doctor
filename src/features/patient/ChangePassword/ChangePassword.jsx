import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useChangePassword from "../../../hooks/useChangePassword";

function ChangePassword() {
  const { changePassword, isChanging, error } = useChangePassword();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    changePassword(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div>
      <div className="text-center mb-6 mt-2">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg hover:scale-105 transform transition-transform duration-300">
          <span className="text-3xl">🔐</span>
        </div>
        <h1 className="text-5xl font-bold leading-snug bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3">
          Thay đổi mật khẩu
        </h1>
        <p className="text-gray-600 text-lg">
          Để bảo mật tài khoản của bạn, hãy cập nhật mật khẩu mới.
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-2xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-6 w-1.5 bg-blue-600 rounded-sm" />
          <h2 className="text-xl font-semibold text-gray-900">
            Thay đổi mật khẩu
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Current password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu hiện tại
            </label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
              placeholder="Nhập mật khẩu hiện tại"
              {...register("currentPassword", {
                required: "Vui lòng nhập mật khẩu hiện tại",
              })}
            />
            <div
              className="absolute top-9 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu mới
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
              placeholder="Nhập mật khẩu mới"
              {...register("newPassword", {
                required: "Vui lòng nhập mật khẩu mới",
                minLength: {
                  value: 8,
                  message: "Mật khẩu phải có ít nhất 8 ký tự",
                },
                validate: {
                  hasUppercase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Mật khẩu phải có ít nhất một chữ cái viết hoa",
                  hasLowercase: (value) =>
                    /[a-z]/.test(value) ||
                    "Mật khẩu phải có ít nhất một chữ cái viết thường",
                  hasSpecialChar: (value) =>
                    /[@$!%*?&]/.test(value) ||
                    "Mật khẩu phải có ít nhất một ký tự đặc biệt (@$!%*?&)",
                },
              })}
            />
            <div
              className="absolute top-9 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Xác nhận mật khẩu mới
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
              placeholder="Xác nhận mật khẩu mới"
              {...register("confirmPassword", {
                required: "Vui lòng xác nhận mật khẩu mới",
                validate: (value) =>
                  value === watch("newPassword") || "Mật khẩu không khớp",
              })}
            />
            <div
              className="absolute top-9 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Thêm phần hiển thị các tiêu chí mật khẩu */}
          <div className="mt-2 text-xs text-gray-900">
            <p className="block text-sm font-medium text-gray-700 mb-2">
              Yêu cầu mật khẩu:
            </p>
            <ul className="list-inside space-y-1">
              <li
                className={`flex items-center ${
                  watch("newPassword")?.length >= 8
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                <span>{watch("newPassword")?.length >= 8 ? "✓" : "✗"}</span>
                <span className="ml-2">Mật khẩu tối thiểu 8 ký tự</span>
              </li>
              <li
                className={`flex items-center ${
                  /[A-Z]/.test(watch("newPassword") || "")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                <span>
                  {/[A-Z]/.test(watch("newPassword") || "") ? "✓" : "✗"}
                </span>
                <span className="ml-2">Ít nhất một chữ cái viết hoa</span>
              </li>
              <li
                className={`flex items-center ${
                  /[a-z]/.test(watch("newPassword") || "")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                <span>
                  {/[a-z]/.test(watch("newPassword") || "") ? "✓" : "✗"}
                </span>
                <span className="ml-2">Ít nhất một chữ cái viết thường</span>
              </li>
              <li
                className={`flex items-center ${
                  /[@$!%*?&]/.test(watch("newPassword") || "")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                <span>
                  {/[@$!%*?&]/.test(watch("newPassword") || "") ? "✓" : "✗"}
                </span>
                <span className="ml-2">
                  Ít nhất một ký tự đặc biệt (@$!%*?&)
                </span>
              </li>
            </ul>
          </div>

          {/* Error message if API call fails */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error.message}
            </div>
          )}

          {/* Submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isChanging}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-300 flex items-center gap-2"
            >
              {isChanging ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Đang cập nhật...</span>
                </>
              ) : (
                <span>Cập nhật mật khẩu</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
