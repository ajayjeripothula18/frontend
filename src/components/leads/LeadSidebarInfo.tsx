import { Card } from '@/components/ui/Card';
import { Lead } from '@/types/leads';
import { formatDate } from '@/lib/utils';

interface LeadSidebarInfoProps {
  lead: Lead;
}

export function LeadSidebarInfo({ lead }: LeadSidebarInfoProps) {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Lead Information</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Source</p>
            <p className="mt-1 text-gray-900">{lead.source}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Created</p>
            <p className="mt-1 text-gray-900">{formatDate(lead.createdAt, true)}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Last Updated</p>
            <p className="mt-1 text-gray-900">{formatDate(lead.updatedAt, true)}</p>
          </div>

          {lead.assignedTo && (
            <div>
              <p className="text-sm font-medium text-gray-500">Assigned To</p>
              <p className="mt-1 text-gray-900">Agent #{lead.assignedTo}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
} 