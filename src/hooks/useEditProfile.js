import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import patientService from "../services/patient.service";

export default function useEditProfile() {
  const queryClient = useQueryClient();

  // Mutation để cập nhật thông tin profile
  const updateProfileMutation = useMutation({
    mutationFn: patientService.updateUserProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Cập nhật thông tin cá nhân thành công", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onError: (error) => {
      toast.error(`Cập nhật thông tin cá nhân thất bại: ${error.message}`, {
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
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    updateProfileError: updateProfileMutation.error,
  };
}
