'use client';

import { useState } from 'react';
import { QuickActions } from './QuickActions';
import { StatsCards } from './StatsCards';
import { Charts } from './Charts';
import { RecentActivities } from './RecentActivities';

export function DashboardContent() {
  const [timeRange, setTimeRange] = useState('7');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your key metrics and performance indicators
          </p>
        </div>
        <select 
          className="form-select rounded-md border-gray-300 text-sm shadow-sm"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <QuickActions />
      <StatsCards timeRange={timeRange} />
      <Charts timeRange={timeRange} />
      <RecentActivities />
    </div>
  );
}