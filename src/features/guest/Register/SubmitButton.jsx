function SubmitButton({ isAgree }) {
  return (
    <div className="pt-2 md:pt-4">
      <button
        type="submit"
        className={`w-full border-2 font-semibold py-2.5 sm:py-3 md:py-3.5 rounded-lg transition duration-200 
                ${
                  isAgree
                    ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
                    : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                }`}
        disabled={!isAgree}
      >
        Tạo tài khoản
      </button>
    </div>
  );
}

export default SubmitButton;
