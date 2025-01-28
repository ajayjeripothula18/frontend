import api from '../lib/api';
import { Lead, LeadsResponse } from '../types/leads';

export const leadService = {
  getLeads: async (params: { page: number; limit: number; searchTerm?: string }) => {
    const response = await api.get<LeadsResponse>('/leads', { params });
    return response.data;
  },

  getLead: async (id: string) => {
    const response = await api.get<Lead>(`/leads/${id}`);
    return response.data;
  },

  createLead: async (data: Partial<Lead>) => {
    const response = await api.post<Lead>('/leads', data);
    return response.data;
  },

  updateLead: async (id: string, data: Partial<Lead>) => {
    const response = await api.put<Lead>(`/leads/${id}`, data);
    return response.data;
  },

  deleteLead: async (id: string) => {
    await api.delete(`/leads/${id}`);
  },
};