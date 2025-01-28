'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit2, ArrowLeft, Archive } from 'lucide-react';
import { leadsService } from '@/services/leads.service';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LeadStatusBadge } from './LeadStatusBadge';
import { LeadActivityTimeline } from './LeadActivityTimeline';
import { LeadStatusSelect } from './LeadStatusSelect';
import { toast } from 'sonner';
import { LeadStatus, VALID_STATUS_TRANSITIONS } from '@/types/leads';
import { formatDate, formatCurrency } from '@/lib/utils';

export function LeadDetails() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const leadId = params.id as string;

  const { data: lead, isLoading, error } = useQuery({
    queryKey: ['lead', leadId],
    queryFn: () => leadsService.getLead(leadId),
    retry: 1,
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['lead-activities', leadId],
    queryFn: () => leadsService.getLeadActivities(leadId),
    enabled: !!leadId,
    retry: 1,
  });

  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationFn: async (status: LeadStatus) => {
      const validNextStatuses = VALID_STATUS_TRANSITIONS[lead?.status || 'NEW'];
      if (!validNextStatuses.includes(status)) {
        throw new Error(`Cannot transition from ${lead?.status} to ${status}`);
      }
      return leadsService.updateLeadStatus(leadId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead', leadId] });
      queryClient.invalidateQueries({ queryKey: ['lead-activities', leadId] });
      toast.success('Lead status updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update status');
    }
  });

  const { mutate: archiveLead, isPending: isArchiving } = useMutation({
    mutationFn: () => leadsService.archiveLead(leadId),
    onSuccess: () => {
      toast.success('Lead archived successfully');
      router.push('/leads');
    },
    onError: () => {
      toast.error('Failed to archive lead');
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Lead not found</h3>
        <p className="mt-2 text-sm text-gray-500">
          The lead you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <Button onClick={() => router.push('/leads')} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Leads
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => router.push(`/leads/${leadId}/edit`)}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            onClick={() => archiveLead()} 
            disabled={isArchiving || lead.status === 'ARCHIVED'}
          >
            <Archive className="w-4 h-4 mr-2" />
            {isArchiving ? 'Archiving...' : 'Archive'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <LeadDetailsCard 
            lead={lead} 
            onStatusChange={updateStatus} 
            isUpdating={isUpdating} 
          />
          <LeadActivityTimeline 
            activities={activities || []} 
            isLoading={activitiesLoading} 
          />
        </div>
        <div className="space-y-6">
          <LeadSidebarInfo lead={lead} />
        </div>
      </div>
    </div>
  );
} 