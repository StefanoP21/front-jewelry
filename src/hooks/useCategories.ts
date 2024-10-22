import { CategoryService } from "@/core/services/category.service";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getAllCategories(),
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    isError,
    error,
    categories: data?.data || [],
    isFetching,
  };
};
