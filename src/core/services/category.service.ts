import { api } from "../lib/api";
import { CategoryDto } from "../models";
import { CategoryListResponse, CategoryResponse } from "../models/category/model";

export const CategoryService = {
  getAllCategories: async (): Promise<CategoryListResponse> => {
    const { data } = await api.get<CategoryListResponse>("/api/category");
    return data;
  },

  getCategoryById: async (id: number): Promise<CategoryResponse> => {
    const { data } = await api.get<CategoryResponse>("/api/category/" + id);
    return data;
  },

  createCategory: async (dto: CategoryDto): Promise<CategoryResponse> => {
    const { data } = await api.post<CategoryResponse>("/api/category", dto);
    return data;
  },

  updateCategoryById: async (id: number, dto: CategoryDto): Promise<CategoryResponse> => {
    const { data } = await api.put<CategoryResponse>("/api/category/" + id, dto);
    return data;
  },

  deleteCategoryById: async (id: number): Promise<CategoryResponse> => {
    const { data } = await api.delete<CategoryResponse>("/api/category/" + id);
    return data;
  },
};
