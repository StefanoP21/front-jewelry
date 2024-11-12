import { CustomerService } from "@/core/services/customer.service";
import { useQuery } from "@tanstack/react-query";

export const useCustomers = () => {
  const { isLoading, isError, error, data, refetch, isFetching } = useQuery({
    queryKey: ["customers"],
    queryFn: () => CustomerService.getAllCustomers(),
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    isError,
    error,
    customers: data?.data || [],
    refetch,
    isFetching,
  };
};
