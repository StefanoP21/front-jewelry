import { api } from "../lib/api";
import { CreateCustomerDto, UpdateCustomerDto } from "../models";
import { CustomerListResponse, CustomerResponse } from "../models/customer/model";

export const CustomerService = {
  getAllCustomers: async (): Promise<CustomerListResponse> => {
    const { data } = await api.get<CustomerListResponse>("/api/customer");
    return data;
  },

  getCustomerById: async (id: number): Promise<CustomerResponse> => {
    const { data } = await api.get<CustomerResponse>("/api/customer/" + id);
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
