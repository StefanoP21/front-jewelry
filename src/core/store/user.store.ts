import { Data } from "@/core/models";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserService } from "../services/user.service";

export interface UserState {
  users: Data[];
  selectedUser?: Data;

  getAllUsers: () => Promise<void>;
  getUserById: (id: number) => Promise<void>;
}

const storeApi: StateCreator<UserState> = (set) => ({
  users: [],
  selectedUser: undefined,

  getAllUsers: async () => {
    try {
      const { data } = await UserService.getAllUsers();
      set({ users: data });
    } catch (error) {
      set({ users: [] });
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const { data } = await UserService.getUserById(id);
      set({ selectedUser: data });
    } catch (error) {
      set({ selectedUser: undefined });
      throw error;
    }
  },
});

export const useUserStore = create<UserState>()(devtools(persist(storeApi, { name: "user-store" })));
