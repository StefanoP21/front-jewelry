import { api, apiDNI } from "../lib/api";
import { CreateCustomerDto, UpdateCustomerDto, CustomerAPIDNIDto } from "../models";
import { CustomerAPIDNI, CustomerListResponse, CustomerResponse } from "../models/customer/model";

export const CustomerService = {
  getAllCustomers: async (): Promise<CustomerListResponse> => {
    const { data } = await api.get<CustomerListResponse>("/api/customer");
    return data;
  },

  getCustomerById: async (id: number): Promise<CustomerResponse> => {
    const { data } = await api.get<CustomerResponse>("/api/customer/" + id);
    return data;
  },

  getCustomerByDNI: async (dni: CustomerAPIDNIDto): Promise<CustomerAPIDNI> => {
    const { data } = await apiDNI.post<CustomerAPIDNI>("/api/dni", dni);
    return data;
  },

  createCustomer: async (dto: CreateCustomerDto): Promise<CustomerResponse> => {
    const { data } = await api.post<CustomerResponse>("/api/customer", dto);
    return data;
  },

  updateCustomerById: async (id: number, dto: UpdateCustomerDto): Promise<CustomerResponse> => {
    const { data } = await api.put<CustomerResponse>("/api/customer/" + id, dto);
    return data;
  },

  deleteCustomerById: async (id: number): Promise<CustomerResponse> => {
    const { data } = await api.delete<CustomerResponse>("/api/customer/" + id);
    return data;
  },
};
