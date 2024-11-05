import { RefundService } from "@/core/services/refund.service";
import { useQuery } from "@tanstack/react-query";

export const useRefunds = () => {
  const { isLoading, isError, error, data, refetch, isFetching } = useQuery({
    queryKey: ["refunds"],
    queryFn: () => RefundService.getAllRefunds(),
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    isError,
    error,
    refunds: data?.data || [],
    refetch,
    isFetching,
  };
};
