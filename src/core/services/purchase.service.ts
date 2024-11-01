import { api } from "../lib/api";
import { CreatePurchaseDto } from "../models/purchase/dto";
import { PurchaseListResponse, PurchaseResponse } from "../models/purchase/model";

export const PurchaseService = {
  getAllPurchases: async (): Promise<PurchaseListResponse> => {
    const { data } = await api.get<PurchaseListResponse>("/api/purchase");
    return data;
  },

  createPurchase: async (dto: CreatePurchaseDto): Promise<PurchaseResponse> => {
    const { data } = await api.post<PurchaseResponse>("/api/purchase", dto);
    return data;
  },

  getPurchaseById: async (id: number): Promise<PurchaseResponse> => {
    const { data } = await api.get<PurchaseResponse>(`/api/purchase/${id}`);
    return data;
  },

  deletePurchase: async (id: number): Promise<PurchaseResponse> => {
    const { data } = await api.delete<PurchaseResponse>(`/api/purchase/${id}`);
    return data;
  },
};
