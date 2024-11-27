import { api } from "../lib/api";
import { CreateOrderDto } from "../models/order/dto";
import { OrderListResponse, OrderResponse } from "../models/order/model";

export const OrderService = {
  getAllOrders: async (): Promise<OrderListResponse> => {
    const { data } = await api.get<OrderListResponse>("/api/order");
    return data;
  },

  getOrderById: async (id: number): Promise<OrderResponse> => {
    const { data } = await api.get<OrderResponse>("/api/order/" + id);
    return data;
  },

  createOrder: async (dto: CreateOrderDto): Promise<OrderResponse> => {
    const { data } = await api.post<OrderResponse>("/api/order", dto);
    return data;
  },

  deleteOrder: async (id: number): Promise<OrderResponse> => {
    const { data } = await api.delete<OrderResponse>("/api/order/" + id);
    return data;
  },
};
