import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { changePassword } from "../services/auth.service";

export default function useChangePassword() {
  const {
    mutate,
    isPending: isChanging,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (passwordData) => changePassword(passwordData),
    onSuccess: () => {
      toast.success("Thay đổi mật khẩu thành công", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onError: (error) => {
      toast.error(`Thay đổi mật khẩu thất bại: ${error.message}`, {
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
    changePassword: mutate,
    isChanging,
    isSuccess,
    error,
  };
}
