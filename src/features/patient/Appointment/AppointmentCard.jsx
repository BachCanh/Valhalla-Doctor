import {
  FaUserMd,
  FaRegClock,
  FaStickyNote,
  FaCalendarAlt,
} from "react-icons/fa";

function AppointmentCard({ appointment }) {
  const { appoint_taken_date, appointment_time, status, note } = appointment;

  const getStatusConfig = () => {
    if (status === "cancelled" || status === "rejected") {
      return {
        label: status === "cancelled" ? "Đã hủy" : "Bị từ chối",
        gradient: "bg-gradient-to-r from-red-500 to-pink-500",
        bg: "bg-red-50",
        border: "border-red-200",
        icon: "❌",
      };
    }

    if (status === "scheduled") {
      return {
        label: "Đang chờ xác nhận",
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

    return {
      label: "Đã qua",
      gradient: "bg-gradient-to-r from-gray-400 to-gray-500",
      bg: "bg-gray-50",
      border: "border-gray-200",
      icon: "⚪",
    };
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="group relative">
      <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/80 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaUserMd className="text-white text-xl" />
            </div>

            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                {`Bác sĩ: ${appointment.Doctor.User.fullname}`}
              </h3>
              <p className="text-sm mt-2 text-indigo-600 font-medium tracking-wide">
                {`Bác sĩ chuyên khoa ${appointment?.Doctor?.Department?.name}`}
              </p>
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

export default AppointmentCard;
