import { BarChart3, Users, Ticket, ArrowUpCircle } from 'lucide-react';
import { BRAND_COLORS } from '@/constants/colors';

interface StatsCardsProps {
  timeRange: string;
}

export function StatsCards({ timeRange }: StatsCardsProps) {
  const stats = [
    {
      label: 'New Leads',
      value: '50',
      trend: '+12%',
      trendUp: true,
      icon: Users,
      color: BRAND_COLORS.primary,
    },
    {
      label: 'Open Tickets',
      value: '28',
      trend: '-5%',
      trendUp: false,
      icon: Ticket,
      color: BRAND_COLORS.secondary,
    },
    {
      label: 'Escalated Tickets',
      value: '8',
      trend: '+2%',
      trendUp: true,
      icon: ArrowUpCircle,
      color: BRAND_COLORS.error,
    },
    {
      label: 'Avg. Resolution Time',
      value: '4.2h',
      trend: '-8%',
      trendUp: false,
      icon: BarChart3,
      color: BRAND_COLORS.success,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <Icon
                  className="h-6 w-6"
                  style={{ color: stat.color }}
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <span
                  className={`ml-2 text-sm font-medium ${
                    stat.trendUp ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}