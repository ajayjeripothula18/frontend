'use client';

import { LeadStatus } from '@/types/leads';
import { cn } from '@/lib/utils';

const STATUS_STYLES: Record<LeadStatus, { bg: string; text: string }> = {
  NEW: { bg: 'bg-blue-100', text: 'text-blue-800' },
  CONTACTED: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  QUALIFIED: { bg: 'bg-green-100', text: 'text-green-800' },
  PROPOSAL: { bg: 'bg-purple-100', text: 'text-purple-800' },
  NEGOTIATION: { bg: 'bg-orange-100', text: 'text-orange-800' },
  WON: { bg: 'bg-green-100', text: 'text-green-800' },
  LOST: { bg: 'bg-red-100', text: 'text-red-800' },
  ARCHIVED: { bg: 'bg-gray-100', text: 'text-gray-800' },
};

interface LeadStatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

export function LeadStatusBadge({ status, className }: LeadStatusBadgeProps) {
  const styles = STATUS_STYLES[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        styles.bg,
        styles.text,
        className
      )}
    >
      {status}
    </span>
  );
} 