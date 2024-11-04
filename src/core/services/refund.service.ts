import { api } from "../lib/api";
import { CreateRefundDto } from "../models/refunds/dto";
import { RefundListResponse, RefundResponse } from "../models/refunds/model";

export const RefundService = {
  getAllRefunds: async (): Promise<RefundListResponse> => {
    const { data } = await api.get<RefundListResponse>("/api/refund");
    return data;
  },

  getRefundById: async (id: number): Promise<RefundResponse> => {
    const { data } = await api.get<RefundResponse>(`/api/refund/${id}`);
    return data;
  },

  createRefund: async (dto: CreateRefundDto): Promise<RefundResponse> => {
    const { data } = await api.post<RefundResponse>("/api/refund", dto);
    return data;
  },

  deleteRefund: async (id: number): Promise<RefundResponse> => {
    const { data } = await api.delete<RefundResponse>(`/api/refund/${id}`);
    return data;
  },
};
