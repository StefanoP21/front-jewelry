import { User } from '@/core/models';
import { create } from 'zustand';

interface AuthState {
  user?: User;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: undefined, isAuthenticated: false }),
}));
