import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import doctorService from "../services/doctor.service";

export default function useGetDoctorBusyDates(doctorId) {
  const { data, isLoading, isError, isSuccess, error, refetch } = useQuery({
    queryKey: ["doctorBusyDates", doctorId],
    queryFn: () => doctorService.getDoctorBusyDates(doctorId),
    enabled: !!doctorId, // Only run query if doctorId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    onError: (error) => {
      toast.error(`Lấy lịch bận của bác sĩ thất bại: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  // Helper function to check if a specific date has any busy slots
  const isDateBusy = (date) => {
    if (!data?.busyDates) return false;

    // Convert date to YYYY-MM-DD format if it's a Date object
    const dateString =
      date instanceof Date ? date.toISOString().split("T")[0] : date;

    return !!data.busyDates[dateString];
  };

  // Helper function to get busy time slots for a specific date
  const getBusyTimeSlotsForDate = (date) => {
    if (!data?.busyDates) return [];

    // Convert date to YYYY-MM-DD format if it's a Date object
    const dateString =
      date instanceof Date ? date.toISOString().split("T")[0] : date;

    return data.busyDates[dateString] || [];
  };

  // Helper function to check if a specific time slot is busy on a date
  const isTimeSlotBusy = (date, timeSlot) => {
    const busySlots = getBusyTimeSlotsForDate(date);
    return busySlots.includes(timeSlot);
  };

  return {
    busyDates: data?.busyDates || {},
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
    // Helper functions
    isDateBusy,
    getBusyTimeSlotsForDate,
    isTimeSlotBusy,
  };
}
