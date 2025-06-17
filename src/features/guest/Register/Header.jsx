import { Link } from "react-router";

function Header() {
  return (
    <div className="mb-4 text-center md:mb-8">
      <h1 className="mb-2 text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl">
        Mở tài khoản Valhalla Meds trực tuyến
      </h1>
      <p className="text-xs text-gray-700 sm:text-sm">
        Nếu đã có tài khoản tại Valhalla Meds, vui lòng{" "}
        <Link
          to="/signin"
          className="font-medium text-blue-600 hover:underline"
        >
          đăng nhập
        </Link>
      </p>
    </div>
  );
}

export default Header;
