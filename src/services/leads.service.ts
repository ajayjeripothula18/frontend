import { api } from '@/lib/api';
import { API_ROUTES } from '@/config/api.routes';
import { 
  Lead, 
  LeadStatus, 
  LeadActivityType,
  CreateLeadDTO,
  UpdateLeadDTO,
  LeadsResponse 
} from '@/types/leads';

interface LeadFilters {
  status?: LeadStatus;
  source?: string;
  assignedTo?: string;
  searchTerm?: string;
  isArchived?: boolean;
}

interface LeadAttachment {
  id: number;
  leadId: number;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: number;
  uploadedAt: string;
  url: string;
}

export const leadsService = {
  getLeads: async ({ page = 1, limit = 10 }) => {
    const { data } = await api.get<{
      leads: Lead[];
      totalPages: number;
      currentPage: number;
    }>('/leads', {
      params: { page, limit },
    });
    return data;
  },

  getLead: async (id: string) => {
    const { data } = await api.get<Lead>(`/leads/${id}`);
    return data;
  },

  createLead: async (lead: CreateLeadDTO) => {
    const { data } = await api.post<Lead>('/leads', lead);
    return data;
  },

  updateLead: async (id: string, lead: UpdateLeadDTO) => {
    const { data } = await api.patch<Lead>(`/leads/${id}`, lead);
    return data;
  },

  updateLeadStatus: async (id: string, status: LeadStatus, note?: string) => {
    const { data } = await api.put(`/leads/${id}/status`, { status, note });
    return data;
  },

  archiveLead: async (id: string) => {
    const response = await api.post<void>(API_ROUTES.LEADS.ARCHIVE(id));
    return response.data;
  },

  assignLead: async (id: string, assignedAgentId: number | null) => {
    const response = await api.post<Lead>(API_ROUTES.LEADS.ASSIGN(id), {
      assignedAgentId: assignedAgentId || null
    });
    return response.data;
  },

  convertToCustomer: async (id: string, companyName?: string) => {
    const response = await api.post(API_ROUTES.LEADS.CONVERT(id), { companyName });
    return response.data;
  },

  logActivity: async (id: string, activityData: any) => {
    const { data } = await api.post(`/leads/${id}/activities`, activityData);
    return data;
  },

  getLeadActivities: async (id: string) => {
    const { data } = await api.get(`/leads/${id}/activities`);
    return data;
  },

  getCustomFields: async () => {
    const response = await api.get(API_ROUTES.LEADS.CUSTOM_FIELDS.BASE);
    return response.data;
  },

  getCustomFieldValues: async (leadId: string) => {
    const response = await api.get(API_ROUTES.LEADS.CUSTOM_FIELDS.VALUES(leadId));
    return response.data;
  },

  updateCustomFieldValue: async (
    leadId: string,
    fieldId: string,
    value: string
  ) => {
    const response = await api.put(
      `${API_ROUTES.LEADS.CUSTOM_FIELDS.VALUES(leadId)}/${fieldId}`,
      { value }
    );
    return response.data;
  },

  deleteLead: async (id: string) => {
    await api.delete(`/leads/${id}`);
  },

  getMetrics: async () => {
    const { data } = await api.get('/leads/metrics');
    return data;
  },

  getConversionRates: async () => {
    const { data } = await api.get('/leads/conversion-rates');
    return data;
  },

  getLeadAttachments: async (leadId: string) => {
    const { data } = await api.get<LeadAttachment[]>(`/api/v1/leads/${leadId}/attachments`);
    return data;
  },

  uploadAttachment: async (leadId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const { data } = await api.post<LeadAttachment>(
      `/api/v1/leads/${leadId}/attachments`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  },

  deleteAttachment: async (leadId: string, attachmentId: number) => {
    await api.delete(`/api/v1/leads/${leadId}/attachments/${attachmentId}`);
  },
}; 