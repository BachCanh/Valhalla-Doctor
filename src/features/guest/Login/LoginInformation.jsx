function LoginInformation({ register, errors }) {
  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Email hoặc Số điện thoại"
          className="w-full border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none py-3 px-1 text-sm md:text-base placeholder-gray-400"
          {...register("email", {
            required: "Vui lòng nhập email",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email không hợp lệ",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password input */}
      <div className="mb-6">
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none py-3 px-1 text-sm md:text-base placeholder-gray-400"
          {...register("password", {
            required: "Vui lòng nhập mật khẩu",
            minLength: {
              value: 6,
              message: "Mật khẩu phải có ít nhất 6 ký tự",
            },
          })}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
    </>
  );
}

export default LoginInformation;
