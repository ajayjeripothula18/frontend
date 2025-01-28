'use client';

import { Plus, Ticket, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BRAND_COLORS } from '@/constants/colors';

export function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      icon: Plus,
      label: 'Add Lead',
      onClick: () => router.push('/dashboard/leads/new'),
      color: BRAND_COLORS.primary,
    },
    {
      icon: Ticket,
      label: 'Create Ticket',
      onClick: () => router.push('/dashboard/tickets/new'),
      color: BRAND_COLORS.secondary,
    },
    {
      icon: Users,
      label: 'Assign Ticket',
      onClick: () => router.push('/dashboard/tickets/assign'),
      color: BRAND_COLORS.primary,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex flex-wrap gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: action.color }}
            >
              <Icon className="h-4 w-4 mr-2" />
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}