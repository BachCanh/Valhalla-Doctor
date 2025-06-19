import { useForm } from "react-hook-form";
import useChangePassword from "../../../hooks/useChangePassword";
import SectionHeader from "./SectionHeader";
import PasswordField from "./PasswordField";
import PasswordRequirements from "./PasswordRequirements";
import LoadingButton from "./LoadingButton";

function ChangePassword() {
  const { changePassword, isChanging, error } = useChangePassword();

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
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto mb-10 text-center">
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
        <SectionHeader title="Thay đổi mật khẩu" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Current password */}
          <PasswordField
            id="currentPassword"
            label="Mật khẩu hiện tại"
            placeholder="Nhập mật khẩu hiện tại"
            register={register}
            name="currentPassword"
            rules={{ required: "Vui lòng nhập mật khẩu hiện tại" }}
            errors={errors.currentPassword}
          />

          {/* New password */}
          <PasswordField
            id="newPassword"
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            register={register}
            name="newPassword"
            rules={{
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
            }}
            errors={errors.newPassword}
          />

          {/* Password requirements */}
          <PasswordRequirements password={watch("newPassword") || ""} />

          {/* Confirm password */}
          <PasswordField
            id="confirmPassword"
            label="Xác nhận mật khẩu mới"
            placeholder="Xác nhận mật khẩu mới"
            register={register}
            name="confirmPassword"
            rules={{
              required: "Vui lòng xác nhận mật khẩu mới",
              validate: (value) =>
                value === watch("newPassword") || "Mật khẩu không khớp",
            }}
            errors={errors.confirmPassword}
          />

          {/* Error message if API call fails */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error.message}
            </div>
          )}

          {/* Submit button */}
          <div className="flex justify-end">
            <LoadingButton
              type="submit"
              isLoading={isChanging}
              loadingText="Đang cập nhật..."
            >
              Cập nhật mật khẩu
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
