import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/**
 * Component trường nhập mật khẩu với chức năng hiển thị/ẩn
 */
function PasswordField({
  id,
  label,
  placeholder,
  register,
  name,
  rules,
  errors,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        className={`w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 ${className}`}
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <div
        className="absolute top-9 right-3 text-gray-500 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
      {errors && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
    </div>
  );
}

export default PasswordField;
