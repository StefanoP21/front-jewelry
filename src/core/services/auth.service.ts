import { api } from "../lib/api";
import { LoginDto, RegisterDto, UserResponse } from "../models";

export const AuthService = {
  login: async (dto: LoginDto): Promise<UserResponse> => {
    const { data } = await api.post<UserResponse>("/api/auth/login", dto);
    localStorage.setItem("token", data.data.token);
    return data;
  },

  register: async (dto: RegisterDto): Promise<UserResponse> => {
    const { data } = await api.post<UserResponse>("/api/auth/register", dto);
    return data;
  },

  renew: async (): Promise<UserResponse> => {
    const { data } = await api.get<UserResponse>("/api/auth/renew");
    return data;
  },
};
