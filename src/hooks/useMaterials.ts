import { MaterialService } from "@/core/services/material.service";
import { useQuery } from "@tanstack/react-query";

export const useMaterials = () => {
  const { isLoading, isError, error, data, refetch, isFetching } = useQuery({
    queryKey: ["materials"],
    queryFn: () => MaterialService.getAllMaterials(),
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    isError,
    error,
    materials: data?.data || [],
    refetch,
    isFetching,
  };
};
