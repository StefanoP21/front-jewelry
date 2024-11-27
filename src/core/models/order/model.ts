import { PaymentMethod } from "@/core/constants";
import { Product } from "../product/model";

export interface OrderDetail {
  id: number;
  orderId: number;
  productId: string;
  product: Partial<Product>;
  quantity: number;
  unitPrice: number;
}

export interface Customer {
  id: number;
  name: string;
  lastName: string;
  email: string;
  dni: string;
  phone: string;
}

export interface Order {
  id: number;
  customerId: number;
  // customer: Partial<Customer>;
  customer: Customer;
  userId: number;
  date: string;
  paymentMethod: PaymentMethod;
  totalDesc: string;
  total: string;
  orderDetail: OrderDetail[];
}

export type CreateOrderDetail = Omit<OrderDetail, "id" | "orderId">;

export interface OrderResponse {
  data: Order;
}

export interface OrderListResponse {
  data: Order[];
}
