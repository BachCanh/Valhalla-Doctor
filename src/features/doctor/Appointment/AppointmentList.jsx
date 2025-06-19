import { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import useGetDoctorAppointments from "../../../hooks/useGetDoctorAppointment";
import { useAuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router";
import FlexibleSpinner from "../../../components/FlexibleSpinner";

const DUMMY_API_RESPONSE = {
    appointments: [
        {
            id: 201,
            appoint_taken_date: "2025-07-01T09:00:00Z",
            appointment_time: "09:00 - 09:30",
            status: "scheduled",
            note: "Mang theo kết quả xét nghiệm",
            Patient: {
                User: {
                    fullname: "Nguyễn Văn A",
                },
            },
        },
        {
            id: 202,
            appoint_taken_date: "2025-07-02T14:00:00Z",
            appointment_time: "14:00 - 14:30",
            status: "confirmed",
            note: "Bệnh nhân cần nhịn ăn trước khi xét nghiệm",
            Patient: {
                User: {
                    fullname: "Trần Thị B",
                },
            },
        },
        {
            id: 203,
            appoint_taken_date: "2025-06-28T10:00:00Z",
            appointment_time: "10:00 - 10:30",
            status: "completed",
            note: "Tái khám sau 1 tháng",
            Patient: {
                User: {
                    fullname: "Lê Văn C",
                },
            },
        },
        {
            id: 204,
            appoint_taken_date: "2025-07-05T16:00:00Z",
            appointment_time: "16:00 - 16:30",
            status: "cancelled",
            note: "Bệnh nhân báo bận, xin hủy lịch",
            Patient: {
                User: {
                    fullname: "Phạm Thị D",
                },
            },
        },
        {
            id: 205,
            appoint_taken_date: "2025-07-06T08:00:00Z",
            appointment_time: "08:00 - 08:30",
            status: "rejected",
            note: "Lịch hẹn bị từ chối do trùng lịch",
            Patient: {
                User: {
                    fullname: "Đỗ Văn E",
                },
            },
        },
        {
            id: 206,
            appoint_taken_date: "2025-07-07T11:00:00Z",
            appointment_time: "11:00 - 11:30",
            status: "scheduled",
            note: "",
            Patient: {
                User: {
                    fullname: "Ngô Thị F",
                },
            },
        },
        {
            id: 207,
            appoint_taken_date: "2025-07-08T15:00:00Z",
            appointment_time: "15:00 - 15:30",
            status: "confirmed",
            note: "Bệnh nhân yêu cầu tư vấn thêm về thuốc",
            Patient: {
                User: {
                    fullname: "Vũ Văn G",
                },
            },
        },
        {
            id: 208,
            appoint_taken_date: "2025-07-09T13:00:00Z",
            appointment_time: "13:00 - 13:30",
            status: "completed",
            note: "",
            Patient: {
                User: {
                    fullname: "Phan Thị H",
                },
            },
        },
    ],
    total: 20,
    page: 1,
    totalPages: 3,
};


function DoctorAppointment() {
    const [status, setStatus] = useState("all");
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 2;
    const { isAuthenticated, loading } = useAuthContext();

    // const {
    //     data,
    //     isFetching, // 👈 Add this line
    //     isError,
    //     error,
    // } = useGetDoctorAppointments({ status, page, limit });

    const data = DUMMY_API_RESPONSE;
    const isFetching = false;
    const isError = false;
    const error = null;

    // if (!isAuthenticated && !loading) {
    //     return <Navigate to="/" replace />;
    // }

    const appointments = data?.appointments || [];
    // const total = data?.total || 0;
    // const totalPages = Math.ceil(total / limit);

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

    const filteredAppointments =
        status === "all"
            ? appointments
            : appointments.filter((a) => a.status === status);

    // Pagination cho từng filter
    const totalFiltered = filteredAppointments.length;
    const totalPages = Math.max(1, Math.ceil(totalFiltered / limit));
    const paginatedAppointments = filteredAppointments.slice((page - 1) * limit, page * limit);

    // Khi click vào card
    const handleCardClick = (appointment) => {
        setSelectedAppointment(appointment);
        setShowOverlay(true);
    };

    // Đóng overlay
    const handleCloseOverlay = () => {
        setShowOverlay(false);
        setSelectedAppointment(null);
    };

    // Xử lý accept/reject (dummy)
    const handleAccept = () => {
        alert("Đã accept!");
        handleCloseOverlay();
    };
    const handleReject = () => {
        alert("Đã reject!");
        handleCloseOverlay();
    };

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
                                        className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${isActive
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
                    ) : paginatedAppointments.length === 0 ? (
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
                            {paginatedAppointments.map((appointment, index) => (
                                <div
                                    key={appointment.id}
                                    className="transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        animationFillMode: "both",
                                    }}
                                    onClick={() => handleCardClick(appointment)}
                                >
                                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 overflow-hidden cursor-pointer">
                                        <AppointmentCard appointment={appointment} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Overlay Form */}
                    {showOverlay && selectedAppointment && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in">
                                <button
                                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                                    onClick={handleCloseOverlay}
                                >
                                    ×
                                </button>
                                <h2 className="text-2xl font-bold mb-4 text-blue-700">Xử lý lịch hẹn</h2>
                                <div className="mb-4">
                                    <div className="font-medium mb-1">Bệnh nhân:</div>
                                    <div className="mb-2">{selectedAppointment.Patient?.User?.fullname}</div>
                                    <div className="font-medium mb-1">Ngày giờ:</div>
                                    <div className="mb-2">
                                        {new Date(selectedAppointment.appoint_taken_date).toLocaleString("vi-VN")}<br />
                                        {selectedAppointment.appointment_time}
                                    </div>
                                    <div className="font-medium mb-1">Ghi chú:</div>
                                    <div className="mb-2">{selectedAppointment.note || "Không có"}</div>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <button
                                        className="flex-1 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
                                        onClick={handleAccept}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="flex-1 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                                        onClick={handleReject}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
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
                                                className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 transform hover:scale-110 ${page === pageNum
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
