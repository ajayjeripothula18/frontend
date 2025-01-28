import { api } from '@/lib/api';

export interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface GetCustomersResponse {
  data: {
    customers: Customer[];
  };
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

class CustomersService {
  async getCustomers({ page = 1, limit = 10 } = {}): Promise<GetCustomersResponse> {
    const response = await api.get(`/customers?page=${page}&limit=${limit}`);
    return response.data;
  }

  async getCustomer(id: string): Promise<Customer> {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  }

  async createCustomer(data: Partial<Customer>): Promise<Customer> {
    const response = await api.post('/customers', data);
    return response.data;
  }

  async updateCustomer(id: string, data: Partial<Customer>): Promise<Customer> {
    const response = await api.patch(`/customers/${id}`, data);
    return response.data;
  }
}

export const customersService = new CustomersService(); 