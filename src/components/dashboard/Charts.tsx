'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { BRAND_COLORS } from '@/constants/colors';

interface ChartsProps {
  timeRange: string;
}

export function Charts({ timeRange }: ChartsProps) {
  // Sample data - replace with actual data from API
  const barChartData = [
    { name: 'Mon', resolved: 4, open: 3 },
    { name: 'Tue', resolved: 3, open: 2 },
    { name: 'Wed', resolved: 5, open: 4 },
    { name: 'Thu', resolved: 6, open: 3 },
    { name: 'Fri', resolved: 4, open: 2 },
    { name: 'Sat', resolved: 3, open: 1 },
    { name: 'Sun', resolved: 2, open: 2 },
  ];

  const pieChartData = [
    { name: 'Open', value: 60, color: BRAND_COLORS.error },
    { name: 'Resolved', value: 30, color: BRAND_COLORS.success },
    { name: 'Escalated', value: 10, color: BRAND_COLORS.secondary },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Ticket Status Distribution
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => 
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Weekly Ticket Overview
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="resolved"
                name="Resolved Tickets"
                fill={BRAND_COLORS.success}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="open"
                name="Open Tickets"
                fill={BRAND_COLORS.error}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}