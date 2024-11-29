import { api } from "../lib/api";
import { SupplierDto } from "../models";
import { SupplierListResponse, SupplierResponse } from "../models/supplier/model";

export const SupplierService = {
  getAllSuppliers: async (): Promise<SupplierListResponse> => {
    const { data } = await api.get<SupplierListResponse>("/api/supplier");
    return data;
  },

  getSupplierById: async (id: number): Promise<SupplierResponse> => {
    const { data } = await api.get<SupplierResponse>("/api/supplier/" + id);
    return data;
  },

  createSupplier: async (dto: SupplierDto): Promise<SupplierResponse> => {
    const { data } = await api.post<SupplierResponse>("/api/supplier", dto);
    return data;
  },

  UpdateSupplierById: async (id: number, dto: SupplierDto): Promise<SupplierResponse> => {
    const { data } = await api.put<SupplierResponse>("/api/supplier/" + id, dto);
    return data;
  },

  deleteSupplierById: async (id: number): Promise<SupplierResponse> => {
    const { data } = await api.delete<SupplierResponse>("/api/supplier/" + id);
    return data;
  },
};
