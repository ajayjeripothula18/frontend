import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsService } from '@/services/leads.service';
import { LeadActivityType } from '@/types/leads';

export function useLeadActivities(leadId: string) {
  const queryClient = useQueryClient();

  const activitiesQuery = useQuery({
    queryKey: ['lead-activities', leadId],
    queryFn: () => leadsService.getLeadActivities(leadId),
    enabled: !!leadId
  });

  const logActivityMutation = useMutation({
    mutationFn: (data: { type: LeadActivityType; note: string }) =>
      leadsService.logActivity(leadId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead-activities', leadId] });
    }
  });

  return {
    activities: activitiesQuery.data?.activities || [],
    isLoading: activitiesQuery.isLoading,
    error: activitiesQuery.error,
    logActivity: logActivityMutation.mutate
  };
} 