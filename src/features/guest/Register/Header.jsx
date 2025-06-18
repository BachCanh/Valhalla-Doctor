import { Link } from "react-router";
import logo from "../../../../public/favicon.png"

function Header() {
  return (
    <div className="mb-8 text-center px-4">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img
          src={logo}
          alt="Valhalla Meds Logo"
          className="h-12 w-auto sm:h-16"
        />
      </div>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl leading-tight tracking-tight">
        Mở tài khoản Valhalla Meds trực tuyến
      </h1>
      <p className="text-base sm:text-lg text-gray-600">
        Nếu đã có tài khoản tại Valhalla Meds, vui lòng{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
        >
          đăng nhập
        </Link>
      </p>
    </div>
  );
}

export default Header;
