'use client';

import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { dashboardService } from '@/services/dashboard.service';
import { formatCurrency } from '@/lib/utils';

export function Overview() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: () => dashboardService.getMetrics(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
            <p className="mt-2 text-3xl font-semibold">{metrics?.totalLeads}</p>
          </div>
        </Card>
        
        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Open Opportunities</h3>
            <p className="mt-2 text-3xl font-semibold">{metrics?.openOpportunities}</p>
          </div>
        </Card>
        
        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Pipeline Value</h3>
            <p className="mt-2 text-3xl font-semibold">
              {formatCurrency(metrics?.pipelineValue || 0)}
            </p>
          </div>
        </Card>
        
        <Card>
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
            <p className="mt-2 text-3xl font-semibold">
              {metrics?.conversionRate}%
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
} 