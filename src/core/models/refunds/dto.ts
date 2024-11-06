export interface RefundDetailDto {
  purchaseDetailId: number;
  quantity: number;
}

export interface CreateRefundDto {
  purchaseId: number;
  comment: string;
  userDNI: string;
  refundDetail: RefundDetailDto[];
}
