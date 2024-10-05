import { api } from '../lib/api';
import { LoginDto, UserResponse } from '../models';

export const AuthService = {
  login: async ({ dni, password }: LoginDto): Promise<UserResponse> => {
    const response = await api.post('/api/auth/login', { dni, password });

    return response.data;
  },
};
