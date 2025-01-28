import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsService } from '@/services/leads.service';
import { LeadStatus, Lead, UpdateLeadDto } from '@/types/leads';

export function useLeads(page = 1, filters?: Record<string, any>) {
  const queryClient = useQueryClient();

  const leadsQuery = useQuery({
    queryKey: ['leads', page, filters],
    queryFn: () => leadsService.getLeads(page, filters),
    placeholderData: (previousData) => previousData
  });

  const updateLeadMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLeadDto }) =>
      leadsService.updateLead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, note }: { id: string; status: LeadStatus; note?: string }) =>
      leadsService.updateLeadStatus(id, status, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });

  return {
    leads: leadsQuery.data?.leads || [],
    totalPages: leadsQuery.data?.totalPages || 0,
    isLoading: leadsQuery.isLoading,
    error: leadsQuery.error,
    updateLead: updateLeadMutation.mutate,
    updateStatus: updateStatusMutation.mutate
  };
} 