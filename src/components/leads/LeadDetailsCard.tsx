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
      <Card.Header>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{lead.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{lead.email}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <LeadStatusSelect
              value={lead.status}
              onChange={onStatusChange}
              disabled={isUpdating}
            />
            <div className="text-sm text-gray-500">
              Created {formatDate(lead.createdAt)}
            </div>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Contact Details</h3>
            <dl className="mt-2 space-y-3">
              {lead.phone && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{lead.phone}</dd>
                </div>
              )}
              {lead.company && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Company</dt>
                  <dd className="mt-1 text-sm text-gray-900">{lead.company}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Source</dt>
                <dd className="mt-1 text-sm text-gray-900">{lead.source}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Deal Information</h3>
            <dl className="mt-2 space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Value</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatCurrency(lead.value)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1">
                  <LeadStatusBadge status={lead.status} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {lead.notes && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500">Notes</h3>
            <div className="mt-2 text-sm text-gray-900 whitespace-pre-wrap">
              {lead.notes}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
} 