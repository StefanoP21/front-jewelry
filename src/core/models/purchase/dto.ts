export interface PurchaseDetailDto {
  productId: number;
  quantity: number;
  unitPrice: number;
  profit: number;
}

export interface CreatePurchaseDto {
  supplierId: number;
  total: number;
  bill: string;
  userDNI: string;
  purchaseDetail: PurchaseDetailDto[];
}
