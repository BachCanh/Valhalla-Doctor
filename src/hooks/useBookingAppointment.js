import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { bookAppointment as bookAppointmentService } from "../services/appointment.service"
export default function useBookingAppointment() {
    const {
        mutate: bookAppointment,
        isLoading: isBooking,
        isError,
        isSuccess,
        error,
        data,
    } = useMutation({
        mutationFn: (appointmentData) => bookAppointmentService(appointmentData),
        onSuccess: (data) => {
            toast.success(data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        },
        onError: (error) => {
            toast.error(`Error booking appointment: ${error.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        },
    });

    return { bookAppointment, isBooking, isError, isSuccess, error, data };
}