import { FaUserMd, FaRegClock, FaStickyNote } from "react-icons/fa";

function AppointmentCard({ appointment }) {
  const { appoint_taken_date, duration, doctor, status, note } = appointment;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white shadow-2xl rounded-2xl p-8 mb-8 border border-blue-100 transition-transform hover:scale-105 hover:shadow-blue-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaUserMd className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-blue-700 tracking-tight">
              {doctor?.name || `Bác sĩ ID: ${appointment.doctor_id}`}
            </h3>
            <p className="text-md text-gray-500 flex items-center gap-2 mt-1">
              <FaRegClock className="text-blue-400" />
              Ngày:{" "}
              <span className="font-medium text-gray-700">
                {new Date(appoint_taken_date).toLocaleDateString()}
              </span>
              <span className="mx-2">|</span>
              Thời gian:{" "}
              <span className="font-medium text-gray-700">{duration}</span>
            </p>
          </div>
        </div>
        <span
          className={`px-5 py-2 rounded-full text-md font-semibold shadow-sm border transition-all
                        ${
                          status === "scheduled"
                            ? "bg-gradient-to-r from-green-400 to-green-200 text-white border-green-300"
                            : "bg-gradient-to-r from-gray-300 to-gray-100 text-gray-700 border-gray-300"
                        }`}
        >
          {status === "scheduled" ? "Sắp tới" : "Đã qua"}
        </span>
      </div>
      {note && (
        <div className="flex items-start gap-2 mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
          <FaStickyNote className="text-blue-400 text-xl mt-1" />
          <p className="text-md text-gray-700">
            <span className="font-semibold text-blue-700">Ghi chú:</span> {note}
          </p>
        </div>
      )}
    </div>
  );
}

export default AppointmentCard;
