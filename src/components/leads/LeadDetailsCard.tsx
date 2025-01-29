import { Card } from '@/components/ui/Card';
import { LeadStatusBadge } from './LeadStatusBadge';
import { LeadStatusSelect } from './LeadStatusSelect';
import { Lead, LeadStatus } from '@/types/leads';
import { formatDate, formatCurrency } from '@/lib/utils';

interface LeadDetailsCardProps {
  lead: Lead;
  onStatusChange: (status: LeadStatus) => void;
  isUpdating: boolean;
}

export function LeadDetailsCard({ lead, onStatusChange, isUpdating }: LeadDetailsCardProps) {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{lead.name}</h2>
          <LeadStatusBadge status={lead.status} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="mt-1">{lead.email}</p>
          </div>
          {lead.phone && (
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="mt-1">{lead.phone}</p>
            </div>
          )}
          {lead.company && (
            <div>
              <p className="text-sm font-medium text-gray-500">Company</p>
              <p className="mt-1">{lead.company}</p>
            </div>
          )}
          {lead.value && (
            <div>
              <p className="text-sm font-medium text-gray-500">Potential Value</p>
              <p className="mt-1">{formatCurrency(lead.value)}</p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-gray-500 mb-2">Status</p>
          <LeadStatusSelect
            value={lead.status}
            onChange={onStatusChange}
            disabled={isUpdating}
          />
        </div>

        {lead.notes && (
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500 mb-2">Notes</p>
            <p className="text-gray-700 whitespace-pre-wrap">{lead.notes}</p>
          </div>
        )}
      </div>
    </Card>
  );
} 