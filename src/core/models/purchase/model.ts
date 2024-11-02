export interface Supplier {
  id: number;
  nameContact: string;
  companyName: string;
  email: string;
  phone: string;
  ruc: string;
}

export interface ProductPurchaseDetail {
  name: string;
  description: string;
  image: string;
}

export interface Purchase {
  id: number;
  supplierId: number;
  supplier: Supplier;
  date: string;
  total: string;
  bill: string;
  userDNI: string;
  purchaseDetail: PurchaseDetail[];
}

export interface PurchaseDetail {
  id: string;
  purchaseId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  profit: number;
  product: ProductPurchaseDetail;
}

// Omitir campos
export type CreatePurchaseDetail = Omit<PurchaseDetail, "id" | "purchaseId">;

export interface PurchaseListResponse {
  data: Purchase[];
}

export interface PurchaseResponse {
  data: Purchase;
}
