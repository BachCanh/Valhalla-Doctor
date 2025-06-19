import { useMutation } from "@tanstack/react-query";
import { doctorUpdateAppointment } from "../services/appointment.service";
import { toast } from "react-toastify";
import reactQuery from "../config/reactQuery";

export const useDoctorUpdateStatus = () => {
  const {
    mutate: updateStatus,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (data) => {
      return doctorUpdateAppointment(data);
    },
    onSuccess: (data) => {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      reactQuery.invalidateQueries({
        queryKey: ["doctorAppointments"],
      });
    },
    onError: (error) => {
      toast.error(`Error adjust appointment: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  return { updateStatus, isLoading, error }; // Don't forget to return!
};
