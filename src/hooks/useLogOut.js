import { useMutation } from "@tanstack/react-query";
import { logOut } from "../services/auth.service";

const useLogOut = (options) => {
  return useMutation({
    mutationFn: logOut,
    ...options,
  });
};

export default useLogOut;