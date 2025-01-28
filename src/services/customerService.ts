import api from '../lib/api';
import { Customer, CustomersResponse } from '../types/customers';

export const customerService = {
  getCustomers: async (params: { page: number; limit: number; searchTerm?: string }) => {
    const response = await api.get<CustomersResponse>('/customers', { params });
    return response.data;
  },

  getCustomer: async (id: string) => {
    const response = await api.get<Customer>(`/customers/${id}`);
    return response.data;
  },

  createCustomer: async (data: Partial<Customer>) => {
    const response = await api.post<Customer>('/customers', data);
    return response.data;
  },

  updateCustomer: async (id: string, data: Partial<Customer>) => {
    const response = await api.put<Customer>(`/customers/${id}`, data);
    return response.data;
  },

  deleteCustomer: async (id: string) => {
    await api.delete(`/customers/${id}`);
  },

  addActivity: async (customerId: string, data: { type: string; details: string }) => {
    const response = await api.post(`/customers/${customerId}/activities`, data);
    return response.data;
  },
};