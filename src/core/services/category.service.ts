import { api } from "../lib/api";
import { CategoryListResponse } from "../models/category/model";

export const CategoryService = {
  getAllCategories: async (): Promise<CategoryListResponse> => {
    const { data } = await api.get<CategoryListResponse>("/api/category");
    return data;
  },
};
