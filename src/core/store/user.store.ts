import { Data } from "@/core/models";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserService } from "../services/user.service";

export interface UserState {
  users: Data[];

  setAllUsers: () => Promise<void>;
}

const storeApi: StateCreator<UserState> = (set) => ({
  users: [],

  setAllUsers: async () => {
    try {
      const { data } = await UserService.getAllUsers();
      set({ users: data });
    } catch (error) {
      set({ users: [] });
      throw error;
    }
  },
});

export const useUserStore = create<UserState>()(devtools(persist(storeApi, { name: "user-store" })));
