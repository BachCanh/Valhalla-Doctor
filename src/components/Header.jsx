import HeaderNav from "./HeaderNav";
import avatar from "../../public/favicon.png";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth"; // <-- Correct import

const Header = () => {
  const dummyUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    img: null,
  };
  const { isAuthenticated } = useAuthContext();
  const [open, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Call the useAuth hook and destructure its returned values
  const { logout, loading } = useAuth();

  const content = (
    <div className="p-4 text-sm text-gray-700">
      <div className="mb-3">
        <h5 className="font-semibold capitalize">{`${dummyUser.firstName} ${dummyUser.lastName}`}</h5>
        <p className="text-xs text-gray-500">{dummyUser.email}</p>
        <Link
          to="/customer/appointment-history"
          className="text-blue-600 hover:underline text-sm block mt-1"
        >
          Go to Dashboard
        </Link>
      </div>
      <button
        className="w-full text-red-600 text-sm font-medium hover:underline"
        onClick={() => logout()} // Call the logout function
        disabled={loading} // Disable button while loading
      >
        {loading ? "Đang đăng xuất..." : "Log Out"}
      </button>
    </div>
  );

  return (
    <header className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        <HeaderNav
          isLoggedIn={isAuthenticated}
          data={dummyUser}
          avatar={avatar}
          content={content}
          open={open}
          setOpen={() => {
            setIsOpen((c) => !c);
          }}
        />
      </div>
    </header>
  );
};

export default Header;