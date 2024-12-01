export interface CreateSupplierDto {
  nameContact: string;
  email: string;
  phone: string;
  companyName: string;
  ruc: string;
}

export interface UpdateSupplierDto {
  nameContact?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  ruc?: string;
}
