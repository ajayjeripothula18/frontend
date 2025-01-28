import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsService } from '@/services/leads.service';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

interface LeadAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  currentAgentId?: number;
}

interface AssignLeadParams {
  assignedAgentId: number | undefined;
}

export function LeadAssignModal({
  isOpen,
  onClose,
  leadId,
  currentAgentId
}: LeadAssignModalProps) {
  const [selectedAgentId, setSelectedAgentId] = useState<number | undefined>(currentAgentId);
  const queryClient = useQueryClient();

  const { mutate: assignLead, isPending } = useMutation({
    mutationFn: (params: AssignLeadParams) => 
      leadsService.assignLead(leadId, params.assignedAgentId || undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead', leadId] });
      toast.success('Lead assigned successfully');
      onClose();
    },
    onError: () => {
      toast.error('Failed to assign lead');
    }
  });

  const handleAssign = () => {
    if (selectedAgentId) {
      assignLead({ assignedAgentId: selectedAgentId });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign Lead">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Agent
          </label>
          <Select
            value={selectedAgentId?.toString()}
            onValueChange={(value) => setSelectedAgentId(value ? Number(value) : undefined)}
            className="mt-1"
          >
            <Select.Option value="">Select an agent</Select.Option>
            {/* Add agent options here - you'll need to fetch these from your backend */}
          </Select>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={isPending || !selectedAgentId}
          >
            {isPending ? 'Assigning...' : 'Assign'}
          </Button>
        </div>
      </div>
    </Modal>
  );
} 