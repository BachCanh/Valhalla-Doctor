import { useQuery } from "@tanstack/react-query";
import { getMyAppointments } from "../services/appointment.service";

export default function useMyAppointments({ status = "all", page = 1, limit = 10 }) {
    return useQuery({
        queryKey: ["myAppointments", status, page, limit],
        queryFn: () => getMyAppointments({ status, page, limit }),
        keepPreviousData: true, // Giữ dữ liệu cũ khi chuyển trang
        select: (data) => ({
            appointments: data.appointments, // Danh sách lịch hẹn
            total: data.total,               // Tổng số lịch hẹn
            page: data.page,                 // Trang hiện tại
            totalPages: data.totalPages,     // Tổng số trang
        }),
    });
}