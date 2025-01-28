'use client';

import { formatDate, formatRelativeTime } from '@/lib/utils';
import { Clock, Mail, Phone, Users } from 'lucide-react';
import { BRAND_COLORS } from '@/constants/colors';

const activities = [
  {
    id: 1,
    type: 'CALL',
    title: 'Call with John Doe',
    description: 'Discussed project requirements',
    timestamp: new Date('2024-02-25T16:00:00Z'),
    icon: Phone,
    iconColor: 'text-green-600',
  },
  {
    id: 2,
    type: 'EMAIL',
    title: 'Email to Sarah Smith',
    description: 'Sent proposal documents',
    timestamp: new Date('2024-02-25T14:45:00Z'),
    icon: Mail,
    iconColor: 'text-blue-600',
  },
  {
    id: 3,
    type: 'MEETING',
    title: 'Team Meeting',
    description: 'Weekly progress review',
    timestamp: new Date('2024-02-25T13:00:00Z'),
    icon: Users,
    iconColor: 'text-purple-600',
  },
];

export function RecentActivities() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-6">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg bg-gray-50 ${activity.iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t border-gray-100 px-6 py-3">
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all activities
        </button>
      </div>
    </div>
  );
} 