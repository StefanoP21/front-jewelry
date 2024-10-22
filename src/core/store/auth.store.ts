import { User } from "@/core/models";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthService } from "../services/auth.service";

type AuthStatus = "authenticated" | "unauthenticated" | "loading";

export interface AuthState {
  user?: User;
  token?: string;
  status: AuthStatus;

  loginUser: (dni: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "loading",
  token: undefined,
  user: undefined,

  loginUser: async (dni, password) => {
    try {
      const { data } = await AuthService.login({ dni, password });
      set({ user: data.user, token: data.token, status: "authenticated" });
    } catch (error) {
      set({ user: undefined, token: undefined, status: "unauthenticated" });
      throw error;
    }
  },

  checkAuthStatus: async () => {
    try {
      const { data } = await AuthService.renew();
      set({ user: data.user, token: data.token, status: "authenticated" });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ user: undefined, token: undefined, status: "unauthenticated" });
    }
  },

  logoutUser: () => {
    localStorage.removeItem("token");
    set({ user: undefined, token: undefined, status: "unauthenticated" });
  },
});

export const useAuthStore = create<AuthState>()(devtools(persist(storeApi, { name: "auth-store" })));
