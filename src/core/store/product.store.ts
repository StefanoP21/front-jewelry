import { Product } from "@/core/models";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ProductService } from "../services/product.service";

export interface ProductState {
  products: Product[];

  setAllProducts: () => Promise<void>;
}

const storeApi: StateCreator<ProductState> = (set) => ({
  products: [],
  selectedProduct: undefined,

  setAllProducts: async () => {
    try {
      const { data } = await ProductService.getAllProducts();
      set({ products: data });
    } catch (error) {
      set({ products: [] });
      throw error;
    }
  },
});

export const useProductStore = create<ProductState>()(devtools(persist(storeApi, { name: "product-store" })));
