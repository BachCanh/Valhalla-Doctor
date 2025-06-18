function SubmitButton({ isAgree, isLoading }) {
  return (
    <div className="pt-2 md:pt-4">
      <button
        type="submit"
        className={`w-full border-2 font-semibold py-2.5 sm:py-3 md:py-3.5 rounded-lg transition duration-200 
                ${
                  isAgree && !isLoading
                    ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
                    : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                }`}
        disabled={!isAgree || isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            Đang xử lý...
          </div>
        ) : (
          "Tạo tài khoản"
        )}
      </button>
    </div>
  );
}

export default SubmitButton;
