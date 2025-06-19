import React from 'react';

function AppointmentModal({ isOpen, onClose, appointment, onCancel }) {
    if (!isOpen || !appointment) return null;

    const handleCancel = () => {
        onCancel(appointment.id);
        onClose();
    };
    const { appoint_taken_date, appointment_time, status, note } = appointment;

    const canCancel = appointment.status === 'scheduled' || appointment.status === 'confirmed';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Chi tiết lịch hẹn</h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <span className="text-2xl">×</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Doctor Info */}
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">👨‍⚕️</span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">
                                {appointment.Doctor.User.fullname || 'Bác sĩ'}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {appointment?.Doctor?.Department?.name || 'Chuyên khoa'}
                            </p>
                        </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Ngày:</span>
                            <span className="font-medium">
                                {new Date(appoint_taken_date).toLocaleDateString('vi-VN')}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Giờ:</span>
                            <span className="font-medium">{appointment_time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Trạng thái:</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${{
                                scheduled: 'bg-yellow-100 text-yellow-800',
                                confirmed: 'bg-blue-100 text-blue-800',
                                completed: 'bg-green-100 text-green-800',
                                cancelled: 'bg-red-100 text-red-800',
                                rejected: 'bg-pink-100 text-pink-800'
                            }[appointment.status] || 'bg-gray-100 text-gray-800'
                                }`}>
                                {
                                    {
                                        scheduled: 'Đang chờ',
                                        confirmed: 'Đã xác nhận',
                                        completed: 'Hoàn tất',
                                        cancelled: 'Đã hủy',
                                        rejected: 'Bị từ chối'
                                    }[appointment.status] || appointment.status
                                }
                            </span>
                        </div>
                        {appointment.reason && (
                            <div>
                                <span className="text-gray-600 block mb-2">Lý do khám:</span>
                                <p className="bg-gray-50 p-3 rounded-lg text-sm">
                                    {appointment.reason}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                        Đóng
                    </button>
                    {canCancel && (
                        <button
                            onClick={handleCancel}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105"
                        >
                            Hủy lịch hẹn
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AppointmentModal;