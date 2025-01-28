'use client';

import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/Card';
import { leadsService } from '@/services/leads.service';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { BRAND_COLORS } from '@/lib/constants';

export function LeadMetrics() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['lead-metrics'],
    queryFn: () => leadsService.getMetrics(),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const { data: conversionData } = useQuery({
    queryKey: ['lead-conversion-rates'],
    queryFn: () => leadsService.getConversionRates(),
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) {
    return <div>Loading metrics...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium">Lead Status Distribution</h3>
        </Card.Header>
        <Card.Body>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics?.statusDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill={BRAND_COLORS.primary[500]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium">Conversion Funnel</h3>
        </Card.Header>
        <Card.Body>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={conversionData}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" />
                <Tooltip />
                <Bar
                  dataKey="percentage"
                  fill={BRAND_COLORS.secondary[500]}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
} 