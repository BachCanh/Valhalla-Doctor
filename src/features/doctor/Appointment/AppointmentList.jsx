import { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import useGetDoctorAppointments from "../../../hooks/useGetDoctorAppointment";
import { useAuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router";
import FlexibleSpinner from "../../../components/FlexibleSpinner";

function DoctorAppointment() {
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { isAuthenticated, loading } = useAuthContext();

  const {
    data,
    isFetching, // 👈 Add this line
    isError,
    error,
  } = useGetDoctorAppointments({ status, page, limit });

  if (!isAuthenticated && !loading) {
    return <Navigate to="/" replace />;
  }

  const getStatusConfig = (type) => {
    const configs = {
      all: {
        label: "Tất cả",
        icon: "📋",
        gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
      },
      scheduled: {
        label: "Đang chờ",
        icon: "🕒",
        gradient: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      },
      confirmed: {
        label: "Sắp tới",
        icon: "📅",
        gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
      },
      completed: {
        label: "Đã qua",
        icon: "✅",
        gradient: "bg-gradient-to-r from-green-500 to-green-600",
      },
      cancelled: {
        label: "Hủy lịch",
        icon: "❌",
        gradient: "bg-gradient-to-r from-red-500 to-red-600",
      },
      rejected: {
        label: "Từ chối",
        icon: "🚫",
        gradient: "bg-gradient-to-r from-pink-500 to-pink-600",
      },
    };
    return configs[type];
  };

  // Pagination cho từng filter
  const appointments = data?.appointments || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto pt-8 pb-16 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg hover:scale-105 transform transition-transform duration-300">
            <span className="text-3xl">📅</span>
          </div>
          <h1 className="text-5xl font-bold leading-snug bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3">
            Lịch hẹn của tôi
          </h1>
          <p className="text-gray-600 text-lg">
            Quản lý và theo dõi các cuộc hẹn của bạn
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20">
            <div className="flex gap-2">
              {[
                "all",
                "scheduled",
                "confirmed",
                "completed",
                "cancelled",
                "rejected",
              ].map((type) => {
                const config = getStatusConfig(type);
                const isActive = status === type;

                return (
                  <button
                    key={type}
                    className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? `${config.gradient} text-white shadow-lg shadow-blue-500/25`
                        : "text-gray-700 hover:bg-gray-100/80 hover:shadow-md"
                    }`}
                    onClick={() => {
                      setStatus(type);
                      setPage(1);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{config.icon}</span>
                      <span>{config.label}</span>
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Error Handling */}
        {isError && (
          <div className="mb-8 animate-fade-in">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-red-800">
                    Có lỗi xảy ra
                  </h3>
                  <p className="text-red-600 mt-1">
                    {error?.message || "Không thể tải dữ liệu"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments */}
        <div className="relative">
          {isFetching ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
                <FlexibleSpinner />
                <p className="text-gray-600 mt-6 text-center font-medium">
                  Đang tải lịch hẹn...
                </p>
              </div>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">📅</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Không có lịch hẹn
                </h3>
                <p className="text-gray-600">
                  {
                    {
                      all: "Bạn chưa có lịch hẹn nào.",
                      scheduled: "Bạn chưa có lịch hẹn đang chờ xác nhận.",
                      confirmed: "Bạn chưa có lịch hẹn sắp tới nào.",
                      completed: "Bạn chưa có lịch hẹn nào đã hoàn tất.",
                      cancelled: "Không có lịch hẹn nào bị hủy.",
                      rejected: "Không có lịch hẹn nào bị từ chối.",
                    }[status]
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8 mb-12">
              {appointments.map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 overflow-hidden">
                    <AppointmentCard appointment={appointment} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isFetching && totalPages > 1 && (
          <div className="flex justify-center animate-fade-in">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20">
              <div className="flex items-center gap-3">
                <button
                  className="px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 shadow-md"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <span className="flex items-center gap-2">
                    <span>←</span>
                    <span>Trước</span>
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (page <= 3) pageNum = i + 1;
                    else if (page >= totalPages - 2)
                      pageNum = totalPages - 4 + i;
                    else pageNum = page - 2 + i;

                    return (
                      <button
                        key={pageNum}
                        className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 transform hover:scale-110 ${
                          page === pageNum
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md"
                        }`}
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  className="px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 shadow-md"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <span className="flex items-center gap-2">
                    <span>Sau</span>
                    <span>→</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorAppointment;
