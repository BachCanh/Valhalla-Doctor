import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import patientService from "../services/patient.service";

export default function useGetProfile() {
  // Query để lấy thông tin profile
  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError: isProfileError,
    error: profileError,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: patientService.getUserProfile,
    onError: (error) => {
      toast.error(`Không thể tải thông tin cá nhân: ${error.message}`, {
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
    profile,
    isLoadingProfile,
    isProfileError,
    profileError,
    refetchProfile,
  };
}
