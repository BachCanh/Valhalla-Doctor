import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import { logIn, logOut } from "../services/auth.service";
import { toast } from "react-toastify";

export default function useAuth() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: logIn,
    onMutate: () => {
      dispatch({ type: "LOGIN_REQUEST" });
    },
    onSuccess: () => {
      dispatch({ type: "LOGIN_SUCCESS" });
      toast.success("Đăng nhập thành công");
      navigate("/");
    },
    onError: (error) => {
      const msg = error?.message || "Login failed";
      dispatch({ type: "LOGIN_FAILURE", payload: msg });
      toast.error(msg);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.clear();
      dispatch({ type: "LOGOUT" });
      toast.info("Đăng xuất thành công");
      navigate("/");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      toast.error("Đăng xuất không thành công, thử lại sau");
    },
  });

  const login = (credentials) => {
    loginMutation.mutate(credentials);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  return {
    loading: loginMutation.isPending || logoutMutation.isPending,
    login,
    logout,
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
  };
}
