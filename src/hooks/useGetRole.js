import { useQuery } from "@tanstack/react-query";
import { getRole } from "../services/auth.service";

export const useGetRole = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getRole,
    queryKey: ["getRole"],
    refetchInterval: 15 * 60 * 1000, // 15 minutes in milliseconds
  });

  return {
    data,
    isLoading,
    error,
  };
};
