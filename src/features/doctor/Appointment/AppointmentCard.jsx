import React, { useState } from "react";
import {
  FaUser,
  FaRegClock,
  FaStickyNote,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";
import { useDoctorUpdateStatus } from "../../../hooks/useDoctorUpdateStatus";
function DoctorAppointmentCard({ appointment, onStatusChange }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [loading, setLoading] = useState(false);

  const { appoint_taken_date, appointment_time, status, note, Patient, id } =
    appointment;
  const { updateStatus, isLoading, error } = useDoctorUpdateStatus();
  const patientName = Patient?.User?.fullname || "Không rõ";
  const patientPhone = Patient?.User?.phone_number || "Không có số";
  const patientGender = Patient?.gender === "male" ? "Nam" : "Nữ";
  const patientDob = new Date(Patient?.dob).toLocaleDateString("vi-VN");

  const getStatusConfig = () => {
    if (status === "cancelled" || status === "rejected") {
      return {
        label: status === "cancelled" ? "Bệnh nhân đã hủy" : "Đã từ chối",
        gradient: "bg-gradient-to-r from-red-500 to-pink-500",
        bg: "bg-red-50",
        border: "border-red-200",
        icon: "❌",
      };
    }

    if (status === "scheduled") {
      return {
        label: "Chờ xác nhận",
        gradient: "bg-gradient-to-r from-yellow-400 to-yellow-500",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        icon: "⏳",
      };
    }

    if (status === "confirmed") {
      return {
        label: "Đã xác nhận",
        gradient: "bg-gradient-to-r from-emerald-500 to-green-500",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        icon: "✅",
      };
    }

    if (status === "completed") {
      return {
        label: "Đã hoàn thành",
        gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: "✔️",
      };
    }

    return {
      label: "Đã qua",
      gradient: "bg-gradient-to-r from-gray-400 to-gray-500",
      bg: "bg-gray-50",
      border: "border-gray-200",
      icon: "⚪",
    };
  };

  const statusConfig = getStatusConfig();

  // Overlay action buttons logic
  let actions = [];
  if (status === "scheduled") {
    actions = [
      {
        label: "Xác nhận",
        value: "confirmed",
        color: "bg-emerald-500 hover:bg-emerald-600",
      },
      {
        label: "Từ chối",
        value: "rejected",
        color: "bg-red-500 hover:bg-red-600",
      },
    ];
  } else if (status === "confirmed") {
    actions = [
      {
        label: "Hoàn thành",
        value: "completed",
        color: "bg-blue-600 hover:bg-blue-700",
      },
      {
        label: "Hủy",
        value: "cancelled",
        color: "bg-red-500 hover:bg-red-600",
      },
    ];
  }

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    updateStatus({ appointmentId: id, status: newStatus });
    setLoading(false);
    setShowOverlay(false);
  };

  return (
    <div className="group relative">
      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[320px] max-w-[90vw] relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setShowOverlay(false)}
              aria-label="Đóng"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Cập nhật trạng thái lịch hẹn
            </h2>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-gray-700">
                  Trạng thái hiện tại:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${statusConfig.gradient}`}
                >
                  {statusConfig.label}
                </span>
              </div>
              <div className="text-gray-500 text-sm">
                {status === "scheduled" &&
                  "Bạn có thể xác nhận hoặc từ chối lịch hẹn này."}
                {status === "confirmed" &&
                  "Bạn có thể hoàn thành hoặc hủy lịch hẹn này."}
                {(status === "cancelled" ||
                  status === "rejected" ||
                  status === "completed") &&
                  "Không thể thay đổi trạng thái này."}
              </div>
            </div>
            <div className="flex gap-4">
              {actions.map((action) => (
                <button
                  key={action.value}
                  className={`flex-1 py-2 px-4 rounded-lg text-white font-bold text-base transition ${action.color} disabled:opacity-60`}
                  onClick={() => handleStatusChange(action.value)}
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : action.label}
                </button>
              ))}
              {actions.length === 0 && (
                <button
                  className="flex-1 py-2 px-4 rounded-lg bg-gray-300 text-gray-600 font-bold text-base cursor-not-allowed"
                  disabled
                >
                  Không có hành động
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/80 overflow-hidden cursor-pointer"
        onClick={() => setShowOverlay(true)}
        tabIndex={0}
        role="button"
        aria-label="Chỉnh sửa trạng thái lịch hẹn"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaUser className="text-white text-xl" />
            </div>

            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                {`Bệnh nhân: ${patientName}`}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {`Giới tính: ${patientGender} | Ngày sinh: ${patientDob}`}
              </p>
              <p className="text-sm text-gray-500">{`SĐT: ${patientPhone}`}</p>
            </div>
          </div>

          <div
            className={`px-4 py-2 rounded-full ${statusConfig.gradient} text-white shadow-md text-sm font-semibold flex items-center gap-2`}
          >
            <span className="text-xs">{statusConfig.icon}</span>
            {statusConfig.label}
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 mb-4 border border-blue-100/50">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="text-blue-600 text-sm" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Ngày hẹn
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {new Date(appoint_taken_date).toLocaleDateString("vi-VN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <FaRegClock className="text-indigo-600 text-sm" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Thời gian
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {appointment_time}
                </p>
              </div>
            </div>
          </div>
        </div>

        {note && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200/50">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0">
                <FaStickyNote className="text-amber-600 text-sm" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-amber-700 font-medium uppercase tracking-wide mb-1">
                  Ghi chú của bệnh nhân
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{note}</p>
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
}

export default DoctorAppointmentCard;
