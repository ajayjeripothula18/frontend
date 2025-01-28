import { Card } from '@/components/ui/Card';
import { Lead } from '@/types/leads';
import { formatDate } from '@/lib/utils';

interface LeadSidebarInfoProps {
  lead: Lead;
}

export function LeadSidebarInfo({ lead }: LeadSidebarInfoProps) {
  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-medium">Lead Information</h3>
      </Card.Header>
      <Card.Body>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Created</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDate(lead.createdAt)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDate(lead.updatedAt)}
            </dd>
          </div>
          {lead.assignedTo && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {lead.assignedTo.name}
              </dd>
            </div>
          )}
          <div>
            <dt className="text-sm font-medium text-gray-500">Lead Score</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {lead.score || 'Not calculated'}
            </dd>
          </div>
          {lead.lastContactedAt && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Contacted</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(lead.lastContactedAt)}
              </dd>
            </div>
          )}
        </dl>
      </Card.Body>
    </Card>
  );
} 