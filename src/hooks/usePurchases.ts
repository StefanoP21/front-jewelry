import { PurchaseService } from "@/core/services/purchase.service";
import { useQuery } from "@tanstack/react-query";

export const usePurchases = () => {
  const { isLoading, isError, error, data, refetch, isFetching } = useQuery({
    queryKey: ["purchases"],
    queryFn: () => PurchaseService.getAllPurchases(),
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    isError,
    error,
    purchases: data?.data || [],
    refetch,
    isFetching,
  };
};
