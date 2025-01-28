import { api } from '@/lib/api';

interface DashboardMetrics {
  totalLeads: number;
  openOpportunities: number;
  pipelineValue: number;
  conversionRate: number;
}

class DashboardService {
  async getMetrics(): Promise<DashboardMetrics> {
    const response = await api.get('/dashboard/metrics');
    return response.data;
  }
}

export const dashboardService = new DashboardService(); 