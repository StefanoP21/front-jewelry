import { ProductPurchaseDetail, Supplier } from "../purchase/model";

export interface PurchaseDetails {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: string;
  product: ProductPurchaseDetail;
}

export interface RefundDetails {
  id: number;
  refundId: number;
  purchaseDetailId: string;
  purchaseDetail: PurchaseDetails;
  quantity: number;
}

export type CreateRefundDetail = Omit<RefundDetails, "id" | "refundId">;

export interface PurchaseRefund {
  bill: string;
  supplier: Supplier;
}

export interface Refund {
  id: number;
  purchaseId: number;
  purchase: PurchaseRefund;
  date: string;
  comment: string;
  userDNI: string;
  refundDetail: RefundDetails[];
}

export interface RefundResponse {
  data: Refund;
}

export interface RefundListResponse {
  data: Refund[];
}
