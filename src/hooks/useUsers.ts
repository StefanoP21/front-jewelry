import { UserService } from "@/core/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const { isLoading, isError, error, data, refetch, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.getAllUsers(),
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    isError,
    error,
    users: data?.data || [],
    refetch,
    isFetching,
  };
};
