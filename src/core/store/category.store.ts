import { Category } from "@/core/models";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CategoryService } from "../services/category.service";

export interface CategoryState {
  categories: Category[];

  setAllCategories: () => Promise<void>;
}

const storeApi: StateCreator<CategoryState> = (set) => ({
  categories: [],

  setAllCategories: async () => {
    try {
      const { data } = await CategoryService.getAllCategories();
      set({ categories: data });
    } catch (error) {
      set({ categories: [] });
      throw error;
    }
  },
});

export const useCategoryStore = create<CategoryState>()(devtools(persist(storeApi, { name: "category-store" })));
