import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { cancelAppointment as cancelAppointmentService } from "../services/appointment.service";
import queryClient from "../config/reactQuery"
export default function useCancelAppointment() {
    const {
        mutate: cancelAppointment,
        isLoading: isCancelling,
        isError,
        isSuccess,
        error,
        data,
    } = useMutation({
        mutationFn: (appointmentId) => cancelAppointmentService(appointmentId),
        onSuccess: (data) => {
            toast.success(data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            queryClient.invalidateQueries({ queryKey: ["myAppointments"] });
        },
        onError: (error) => {
            toast.error(`Error cancelling appointment: ${error.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        },
    });

    return { cancelAppointment, isCancelling, isError, isSuccess, error, data };
}