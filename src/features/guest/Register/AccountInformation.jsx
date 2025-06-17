// FormSections/AccountInfoSection.jsx
export default function AccountInfoSection({ register, errors, watch }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900 border-l-4 border-blue-500 pl-3">
        Thông tin tài khoản
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div className="md:col-span-2">
          <label
            htmlFor="customer.email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="customer.email"
            placeholder="Nhập email của bạn"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-green-500 transition duration-150"
            {...register("customer.email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email không hợp lệ",
              },
            })}
          />
          {errors.customer?.email && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.customer.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="customer.password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            id="customer.password"
            placeholder="Nhập mật khẩu"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-green-500 transition duration-150"
            {...register("customer.password", {
              required: "Vui lòng nhập mật khẩu",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
            })}
          />
          {errors.customer?.password && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.customer.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="customer.confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            id="customer.confirmPassword"
            placeholder="Nhập lại mật khẩu"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-green-500 transition duration-150"
            {...register("customer.confirmPassword", {
              required: "Vui lòng xác nhận mật khẩu",
              validate: (value) =>
                value === watch("customer.password") || "Mật khẩu không khớp",
            })}
          />
          {errors.customer?.confirmPassword && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.customer.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
