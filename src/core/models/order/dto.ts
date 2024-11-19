import { PaymentMethod } from "@/core/constants";

export interface OrderDetailDto {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderDto {
  customerId: number;
  userId: number;
  paymentMethod: PaymentMethod;
  totalDesc: number;
  total: number;
  orderDetail: OrderDetailDto[];
}
