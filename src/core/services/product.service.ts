import { api } from "../lib/api";
import { ProductListResponse } from "../models/product/model";

export const ProductService = {
  getAllProducts: async (): Promise<ProductListResponse> => {
    const { data } = await api.get<ProductListResponse>("/api/product");
    return data;
  },
};
