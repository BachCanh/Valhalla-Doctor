import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import symptomService from "../services/symptom.service";
export default function useFetchAllSymptoms() {
  const { data, isLoading, isError, isSuccess, error, refetch } = useQuery({
    queryKey: ["symptoms"],
    queryFn: () => symptomService.getAllSymptoms(),
    onError: (error) => {
      toast.error(`Lấy danh sách triệu chứng thất bại: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  return {
    symptoms: data,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  };
}
