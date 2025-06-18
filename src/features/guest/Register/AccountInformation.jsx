// FormSections/AccountInfoSection.jsx
function AccountInfoSection({ register, errors, watch }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-8 border border-gray-100">
      {/* Section Heading */}
      <div className="flex items-center space-x-3">
        <div className="h-6 w-1.5 bg-blue-600 rounded-sm" />
        <h2 className="text-xl font-semibold text-gray-900">
          Thông tin tài khoản
        </h2>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div className="md:col-span-2">
          <label
            htmlFor="patient.email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="patient.email"
            placeholder="Nhập email của bạn"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-green-500 transition duration-150"
            {...register("patient.email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email không hợp lệ",
              },
            })}
          />
          {errors.patient?.email && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.patient.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="patient.password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            id="patient.password"
            placeholder="Nhập mật khẩu"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-green-500 transition duration-150"
            {...register("patient.password", {
              required: "Vui lòng nhập mật khẩu",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
            })}
          />
          {errors.patient?.password && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.patient.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="patient.confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            id="patient.confirmPassword"
            placeholder="Nhập lại mật khẩu"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-green-500 transition duration-150"
            {...register("patient.confirmPassword", {
              required: "Vui lòng xác nhận mật khẩu",
              validate: (value) =>
                value === watch("patient.password") || "Mật khẩu không khớp",
            })}
          />
          {errors.patient?.confirmPassword && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.patient.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountInfoSection;
