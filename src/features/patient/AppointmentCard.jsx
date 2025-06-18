function AppointmentCard({ appointment }) {
    const { appoint_taken_date, duration, doctor, status, note } = appointment;

    return (
        <div className="bg-white shadow rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-blue-600">
                        {doctor?.name || `Bác sĩ ID: ${appointment.doctor_id}`}
                    </h3>
                    <p className="text-sm text-gray-500">
                        Ngày: {new Date(appoint_taken_date).toLocaleDateString()} - Thời gian: {duration}
                    </p>
                </div>
                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${status === "scheduled" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {status === "scheduled" ? "Sắp tới" : "Đã qua"}
                </span>
            </div>
            {note && (
                <p className="mt-2 text-sm text-gray-700">
                    <strong>Ghi chú:</strong> {note}
                </p>
            )}
        </div>
    );
}

export default AppointmentCard;