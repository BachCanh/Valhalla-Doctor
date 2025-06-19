import { Outlet, NavLink } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaUser,
  FaSignOutAlt,
  FaKey,
} from "react-icons/fa";

function PatientLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 shadow-2xl fixed top-0 left-0 bottom-0 pt-6 overflow-y-auto">
        {/* Header */}
        <div className="px-6 pb-8 border-b border-blue-700/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-400 rounded-xl flex items-center justify-center">
              <FaUser className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">Bệnh nhân</h2>
              <p className="text-blue-200 text-sm">Hệ thống quản lý</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6">
          {/* Main Navigation */}
          <div className="space-y-2 mb-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-blue-100 hover:bg-blue-700/50 hover:text-white"
                }`
              }
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <FaHome className="text-lg group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-medium">Trang chủ</span>
            </NavLink>

            <NavLink
              to="/customer/appointment-history"
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-blue-100 hover:bg-blue-700/50 hover:text-white"
                }`
              }
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <FaCalendarAlt className="text-lg group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-medium">Lịch hẹn</span>
            </NavLink>
          </div>

          {/* Personal Information Section */}
          <div className="border-t border-blue-700/30 pt-6">
            <div className="px-4 mb-4">
              <h3 className="text-blue-200 font-semibold text-sm uppercase tracking-wider">
                Thông tin cá nhân
              </h3>
            </div>

            <div className="space-y-2">
              <NavLink
                to="/customer/profile"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-blue-100 hover:bg-blue-700/50 hover:text-white"
                  }`
                }
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <FaUser className="text-lg group-hover:scale-110 transition-transform" />
                </div>
                <span className="font-medium">Thông tin</span>
              </NavLink>

              <NavLink
                to="/customer/change-password"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-blue-100 hover:bg-blue-700/50 hover:text-white"
                  }`
                }
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <FaKey className="text-lg group-hover:scale-110 transition-transform" />
                </div>
                <span className="font-medium">Đổi mật khẩu</span>
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700/30 bg-blue-900/50">
          <button
            onClick={() => {
              // TODO: Add logout logic
              console.log("Logout");
            }}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-300 hover:bg-red-600/20 hover:text-red-200 transition-all duration-200 group"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <FaSignOutAlt className="text-lg group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 pt-6 p-8 bg-gray-50 min-h-screen">
        <div className="w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default PatientLayout;
