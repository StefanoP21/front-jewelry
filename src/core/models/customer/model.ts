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

export interface CustomerAPIDNI {
  success: boolean;
  data: {
    numero: string;
    nombre_completo: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    codigo_verificacion: string;
  };
}
