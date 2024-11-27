import { api } from "../lib/api";
import { SupplierListResponse } from "../models/supplier/model";

export const SupplierService = {
  getAllSuppliers: async (): Promise<SupplierListResponse> => {
    const { data } = await api.get<SupplierListResponse>("/api/supplier");
    return data;
  },
};
