export interface Customer {
  id: number;
  name: string;
  lastName: string;
  email: string;
  dni: string;
  phone: string;
}

export interface CustomerListResponse {
  data: Customer[];
}

export interface CustomerResponse {
  data: Customer;
}
