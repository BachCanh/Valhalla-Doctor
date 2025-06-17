import { FaArrowRightToBracket } from "react-icons/fa6";

function SubmitButton() {
  return (
    <button
      type="submit"
      className="text-white bg-blue-600 border-2 border-blue-600 px-6 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-blue-600 transition-colors duration-300 w-full sm:w-auto text-base"
    >
      <FaArrowRightToBracket className="w-5 h-5" />
      <span>Đăng nhập</span>
    </button>
  );
}

export default SubmitButton;
