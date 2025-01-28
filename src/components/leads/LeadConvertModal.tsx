import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsService } from '@/services/leads.service';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface LeadConvertModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  leadName: string;
  leadEmail: string;
}

interface ConvertLeadParams {
  companyName: string;
}

export function LeadConvertModal({
  isOpen,
  onClose,
  leadId,
  leadName,
  leadEmail
}: LeadConvertModalProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [companyName, setCompanyName] = useState('');

  const { mutate: convertLead, isPending } = useMutation({
    mutationFn: (params: ConvertLeadParams) => leadsService.convertToCustomer(leadId, params.companyName),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['lead', leadId] });
      toast.success('Lead converted to customer successfully');
      router.push(`/dashboard/customers/${data.customerId}`);
      onClose();
    },
    onError: () => {
      toast.error('Failed to convert lead');
    }
  });

  const handleConvert = () => {
    if (companyName.trim()) {
      convertLead({ companyName });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Convert Lead to Customer">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1"
            placeholder="Enter company name"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleConvert}
            disabled={isPending || !companyName.trim()}
          >
            {isPending ? 'Converting...' : 'Convert to Customer'}
          </Button>
        </div>
      </div>
    </Modal>
  );
} 