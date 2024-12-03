import { SupplierService } from "@/core/services/supplier.service";
import { useQuery } from "@tanstack/react-query";

export const useSuppliers = () => {
  const { isLoading, isError, error, data, refetch, isFetching } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => SupplierService.getAllSuppliers(),
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    isError,
    error,
    suppliers: data?.data || [],
    refetch,
    isFetching,
  };
};
