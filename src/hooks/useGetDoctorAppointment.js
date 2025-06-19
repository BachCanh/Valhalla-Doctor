import { useQuery } from '@tanstack/react-query';
import { getDoctorAppointments } from '../services/appointment.service';

export default function useGetDoctorAppointments({ status = 'all', page = 1, limit = 10 }) {
    return useQuery({
        queryKey: ['doctorAppointments', status, page, limit],
        queryFn: () => getDoctorAppointments({ status, page, limit }),
        keepPreviousData: true,
        select: (data) => ({
            appointments: data.appointments,
            total: data.total,
            page: data.page,
            totalPages: data.totalPages,
        }),
    });
}