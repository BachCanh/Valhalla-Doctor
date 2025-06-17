function TermsAndCondition({ register, errors }) {
  return (
    <div className="pt-1 md:pt-2">
      <div className="flex items-start">
        <input
          type="checkbox"
          id="isAgree"
          className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-0.5"
          {...register("isAgree", {
            required: "Vui lòng đồng ý với điều khoản sử dụng",
          })}
        />
        <label
          htmlFor="isAgree"
          className="ml-2 text-xs text-gray-700 sm:ml-3 sm:text-sm"
        >
          Bằng cách tạo tài khoản, tôi đồng ý với{" "}
          <span className="text-blue-600 cursor-pointer font-bold no-underline hover:text-blue-700">
            Điều khoản sử dụng
          </span>{" "}
          và{" "}
          <span className="text-blue-600 cursor-pointer font-bold no-underline hover:text-blue-700">
            Chính sách bảo mật
          </span>
          .
        </label>
      </div>
      {errors.isAgree && (
        <p className="mt-1 text-xs text-red-500 sm:text-sm">
          {errors.isAgree.message}
        </p>
      )}
    </div>
  );
}

export default TermsAndCondition;
