import { OrderService } from "@/core/services/order.service";
import { useQuery } from "@tanstack/react-query";

export const useOrders = () => {
  const { isLoading, isError, error, data, refetch, isFetching } = useQuery({
    queryKey: ["orders"],
    queryFn: () => OrderService.getAllOrders(),
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    isError,
    error,
    orders: data?.data || [],
    refetch,
    isFetching,
  };
};
