interface Supplier {
  id: number;
  nameContact: string;
  email: string;
  phone: string;
  companyName: string;
  ruc: string;
}

export interface SupplierListResponse {
  data: Supplier[];
}

export interface SupplierResponse {
  data: Supplier;
}
