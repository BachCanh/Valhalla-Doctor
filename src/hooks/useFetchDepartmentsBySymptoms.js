// hooks/useFetchDepartmentsBySymptoms.js
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import departmentService from "../services/department.service";

export default function useFetchDepartmentsBySymptoms() {
  const mutation = useMutation({
    mutationKey: ["fetchDepartmentsBySymptoms"],
    mutationFn: (symptomIds) =>
      departmentService.getDepartmentsBySymptoms(symptomIds),
    onError: (error) => {
      toast.error(`Lọc khoa thất bại: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onSuccess: (data) => {
      // **CẬP NHẬT**: Kiểm tra nếu response có message cảnh báo
      if (data.message && data.message.includes("quá nhiều triệu chứng")) {
        toast.warning(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (Array.isArray(data)) {
        // Trường hợp bình thường: data là array của departments
        toast.success(`Tìm thấy ${data.length} khoa phù hợp!`, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    },
  });

  return {
    filterDepartments: mutation.mutate,
    isLoading: mutation.isPending,
    data: mutation.data,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
    isSuccess: mutation.isSuccess,
  };
}
