import { api } from "../lib/api";
import { UserResponse, UserListResponse } from "../models/user/model";

export const UserService = {
  getAllUsers: async (): Promise<UserListResponse> => {
    const { data } = await api.get<UserListResponse>("/api/auth");
    return data;
  },

  getUserById: async (id: number): Promise<UserResponse> => {
    const { data } = await api.get<UserResponse>("/api/auth/" + id);
    return data;
  },

  deleteUserById: async (id: number): Promise<UserResponse> => {
    const { data } = await api.delete<UserResponse>("/api/auth/" + id);
    return data;
  },

  /*getAllProducts: async (): Promise<ProductListResponse> => {
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
  },*/
};
