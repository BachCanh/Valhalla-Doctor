import { Popover, Drawer, Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaHome,
  FaPhoneAlt,
  FaWrench,
  FaUserMd,
  FaAddressBook,
  FaBloggerB,
  FaSignInAlt,
  FaTimes,
  FaChevronDown,
  FaUserPlus,
  FaStar,
  FaHeart,
  FaRocket,
} from "react-icons/fa";

const HeaderNav = ({ open, setOpen, isLoggedIn, data, avatar, content }) => {
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAuthDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { to: "/", label: "Trang chủ", icon: <FaHome /> },
    { to: "/about", label: "Về chúng tôi", icon: <FaAddressBook /> },
    { to: "/appointment", label: "Dịch vụ", icon: <FaWrench /> },
    { to: "/contact", label: "Liên lạc", icon: <FaPhoneAlt /> },
    { to: "/blog", label: "Blog", icon: <FaBloggerB /> },
  ];

  const mobileNavItems = navItems;
  return (
    <>
      <nav className="flex items-center space-x-6 ml-auto">
        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map(({ to, label }) => (
            <li key={to} className="relative group">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-all duration-300 ease-out transform ${
                    isActive
                      ? "text-blue-600 scale-105"
                      : "text-gray-600 hover:text-blue-600 hover:scale-105"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{label}</span>
                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform transition-all duration-300 ${
                        isActive
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                      }`}
                    />
                    {/* Hover background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </>
                )}
              </NavLink>
            </li>
          ))}

          {/* Auth Dropdown for Desktop */}
          {!isLoggedIn && (
            <li className="relative ml-4" ref={dropdownRef}>
              <button
                onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
              >
                <FaSignInAlt />
                Tài khoản
                <FaChevronDown
                  className={`text-xs transition-transform duration-300 ${
                    authDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 origin-top-right ${
                  authDropdownOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="py-2">
                  <Link
                    to="/register"
                    onClick={() => setAuthDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200"
                  >
                    <FaUserPlus className="text-blue-500" />
                    <div>
                      <div className="font-medium">Tạo tài khoản</div>
                      <div className="text-xs text-gray-500">Tham gia ngay</div>
                    </div>
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setAuthDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200"
                  >
                    <FaSignInAlt className="text-purple-500" />
                    <div>
                      <div className="font-medium">Đăng nhập</div>
                      <div className="text-xs text-gray-500">
                        chào mừng trở lại
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </li>
          )}
        </ul>

        {/* User Avatar with enhanced styling */}
        {isLoggedIn && (
          <Popover content={content} placement="bottomRight" arrow={false}>
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur"></div>
              <img
                src={data?.img || avatar}
                alt="avatar"
                className="relative w-11 h-11 rounded-full object-cover border-2 border-white shadow-lg group-hover:scale-110 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
          </Popover>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={showDrawer}
          className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110"
        >
          <FaBars className="text-xl" />
        </button>
      </nav>

      {/* Enhanced Beautiful Mobile Drawer */}
      <Drawer
        placement="left"
        width={350}
        onClose={onClose}
        open={open}
        closeIcon={null}
        title={null}
        styles={{
          body: {
            padding: 0,
            background: "transparent",
          },
        }}
        className="[&_.ant-drawer-content]:!bg-transparent"
      >
        {/* Custom Beautiful Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>

          {/* Sparkle effects */}
          <div className="absolute inset-0">
            <FaStar className="absolute top-16 left-8 text-yellow-300/40 text-xs animate-pulse" />
            <FaStar className="absolute top-32 right-12 text-pink-300/40 text-sm animate-pulse delay-300" />
            <FaStar className="absolute bottom-32 left-16 text-blue-300/40 text-xs animate-pulse delay-700" />
            <FaHeart className="absolute top-48 right-8 text-red-300/30 text-sm animate-pulse delay-1000" />
            <FaRocket className="absolute bottom-48 right-16 text-purple-300/30 text-lg animate-pulse delay-500" />
          </div>
        </div>

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border-r border-white/10"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Enhanced Header */}
          <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <FaBars className="text-white text-lg" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Navigation</h3>
                  <p className="text-sm text-white/60">Explore our services</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-3">
                Main Menu
              </h4>
              <ul className="space-y-2">
                {mobileNavItems.map(({ to, label, icon, color }, index) => (
                  <li
                    key={to}
                    className="transform transition-all duration-500 ease-out"
                    style={{
                      animation: `slideInFromLeft 0.6s ease-out ${
                        (index + 1) * 0.1
                      }s both`,
                    }}
                  >
                    <NavLink
                      to={to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `relative group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 transform overflow-hidden ${
                          isActive
                            ? "bg-white/20 text-white shadow-2xl scale-105 border border-white/20"
                            : "hover:bg-white/10 text-white/90 hover:text-white hover:scale-105"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* Background gradient */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                          ></div>

                          {/* Icon container */}
                          <div
                            className={`relative z-10 w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            <span className="text-white text-lg">{icon}</span>
                          </div>

                          {/* Label */}
                          <div className="relative z-10 flex-1">
                            <span className="font-semibold text-lg">
                              {label}
                            </span>
                            {isActive && (
                              <div className="text-xs text-white/70 mt-1">
                                Currently viewing
                              </div>
                            )}
                          </div>

                          {/* Arrow indicator */}
                          <div
                            className={`relative z-10 transform transition-all duration-300 ${
                              isActive
                                ? "translate-x-0 opacity-100"
                                : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            }`}
                          >
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Auth Buttons for Mobile */}
            {!isLoggedIn && (
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">
                  Account
                </h4>
                <div className="space-y-3">
                  <Link
                    to="/register"
                    onClick={onClose}
                    className="flex items-center gap-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-4 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl transform group"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FaUserPlus className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold">Create Account</div>
                      <div className="text-sm text-white/80">
                        Join our community
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/login"
                    onClick={onClose}
                    className="flex items-center gap-4 bg-white/10 text-white font-semibold px-6 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FaSignInAlt className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold">Sign In</div>
                      <div className="text-sm text-white/80">Welcome back</div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Beautiful Footer */}
          <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
              <FaHeart className="text-pink-400 animate-pulse" />
              <span>Made with love</span>
            </div>
          </div>
        </div>
      </Drawer>

      {/* Enhanced Keyframes */}
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100%) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default HeaderNav;
