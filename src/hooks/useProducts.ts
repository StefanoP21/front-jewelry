import { ProductService } from "@/core/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const { isLoading, isError, error, data, refetch, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.getAllProducts(),
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    isError,
    error,
    products: data?.data || [],
    refetch,
    isFetching,
  };
};
