import { api } from "../lib/api";
import { CreateProductDto, UpdateProductDto } from "../models";
import { ProductListResponse, ProductResponse } from "../models/product/model";

export const ProductService = {
  getAllProducts: async (): Promise<ProductListResponse> => {
    const { data } = await api.get<ProductListResponse>("/api/product");
    return data;
  },

  getProductById: async (id: number): Promise<ProductResponse> => {
    const { data } = await api.get<ProductResponse>("/api/product/" + id);
    return data;
  },

  createProduct: async (dto: CreateProductDto): Promise<ProductResponse> => {
    const { data } = await api.post<ProductResponse>("/api/product", dto);
    return data;
  },

  updateProductById: async (id: number, dto: UpdateProductDto): Promise<ProductResponse> => {
    const { data } = await api.put<ProductResponse>("/api/product/" + id, dto);
    return data;
  },

  deleteProductById: async (id: number): Promise<ProductResponse> => {
    const { data } = await api.delete<ProductResponse>("/api/product/" + id);
    return data;
  },
};
