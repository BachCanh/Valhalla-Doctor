import { Popover, Drawer, Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaPhoneAlt,
  FaWrench,
  FaUserMd,
  FaAddressBook,
  FaBloggerB,
  FaSignInAlt,
} from "react-icons/fa";

const HeaderNav = ({ open, setOpen, isLoggedIn, data, avatar, content }) => {
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <nav className="flex items-center space-x-4">
        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-500"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-500"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/appointment"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-500"
              }
            >
              Service
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-500"
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-500"
              }
            >
              Blog
            </NavLink>
          </li>

          {!isLoggedIn && (
            <>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "hover:text-blue-500"
                  }
                >
                  Register
                </NavLink>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-500">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* User Avatar */}
        {isLoggedIn && (
          <Popover content={content} placement="bottomRight">
            <div className="ml-4">
              <img
                src={data?.img || avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover border cursor-pointer"
              />
            </div>
          </Popover>
        )}

        {/* Mobile Toggle */}
        <FaBars
          className="text-2xl text-gray-700 cursor-pointer md:hidden"
          onClick={showDrawer}
        />
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        width={300}
        onClose={onClose}
        open={open}
        title="Menu"
        extra={<Button onClick={onClose}>Close</Button>}
      >
        <ul className="flex flex-col space-y-4 text-gray-800 font-medium">
          <li>
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive ? "text-blue-600" : "hover:text-blue-500"
                }`
              }
            >
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive ? "text-blue-600" : "hover:text-blue-500"
                }`
              }
            >
              <FaAddressBook /> About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/service"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive ? "text-blue-600" : "hover:text-blue-500"
                }`
              }
            >
              <FaWrench /> Service
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctors"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive ? "text-blue-600" : "hover:text-blue-500"
                }`
              }
            >
              <FaUserMd /> Doctors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive ? "text-blue-600" : "hover:text-blue-500"
                }`
              }
            >
              <FaPhoneAlt /> Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive ? "text-blue-600" : "hover:text-blue-500"
                }`
              }
            >
              <FaBloggerB /> Blog
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li>
              <Link
                to="/login"
                onClick={onClose}
                className="flex items-center gap-2 hover:text-blue-500"
              >
                <FaSignInAlt /> Login
              </Link>
            </li>
          )}
        </ul>
      </Drawer>
    </>
  );
};

export default HeaderNav;
