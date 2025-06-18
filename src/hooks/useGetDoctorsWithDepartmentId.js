import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import doctorService from "../services/doctor.service";

export default function useGetDoctorsWithDepartmentId(departmentId) {
  const { data, isLoading, isError, isSuccess, error, refetch } = useQuery({
    queryKey: ["doctors", "department", departmentId],
    queryFn: () => doctorService.getDoctorsByDepartment(departmentId),
    enabled: !!departmentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    onSuccess: (data) => {
      toast.success("Lấy danh sách bác sĩ thành công", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onError: (error) => {
      toast.error(`Lấy danh sách bác sĩ thất bại: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  // Return the query functions and states
  return {
    doctors: data,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  };
}
