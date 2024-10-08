import { api } from "../lib/api";
import { LoginDto, RegisterDto, UserResponse } from "../models";

export const AuthService = {
  login: async ({ dni, password }: LoginDto): Promise<UserResponse> => {
    const response = await api.post("/api/auth/login", { dni, password });

    return response.data;
  },

  register: async ({ name, lastname, dni, password, role }: RegisterDto): Promise<UserResponse> => {
    const response = await api.post("/api/auth/register", { name, lastname, dni, password, role });

    return response.data;
  },
};
