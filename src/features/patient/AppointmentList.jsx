import { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import useMyAppointments from "../../hooks/useGetUserAppointments";
import { useAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router";
// function filterAppointments(data, status) {
//   const now = new Date();
//   if (status === "upcoming") {
//     return data.filter((a) => new Date(a.appoint_taken_date) > now);
//   }
//   if (status === "past") {
//     return data.filter((a) => new Date(a.appoint_taken_date) <= now);
//   }
//   return data;
// }

function MyAppointments() {
  const [status, setStatus] = useState("upcoming"); // "upcoming" | "past" | "all"
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading, isError, error } = useMyAppointments({
    status,
    page,
    limit,
  });

  if (isLoading) return <div>Đang tải...</div>;
  if (isError) return <div>Lỗi: {error.message}</div>;

  const appointments = data?.appointments || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Lịch hẹn của tôi</h2>
      {/* Filter */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            status === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => {
            setStatus("all");
            setPage(1);
          }}
        >
          Tất cả
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            status === "upcoming"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => {
            setStatus("upcoming");
            setPage(1);
          }}
        >
          Sắp tới
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            status === "past"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => {
            setStatus("past");
            setPage(1);
          }}
        >
          Đã qua
        </button>
      </div>
      {/* Appointments */}
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        {appointments.length === 0 ? (
          <div className="text-center text-gray-500 col-span-full text-xl">
            Không có lịch hẹn.
          </div>
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        )}
      </div>
      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center gap-4 mt-2 mb-6">
          <button
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Trước
          </button>
          <span className="text-lg font-medium">
            Trang {page} / {totalPages}
          </span>
          <button
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
