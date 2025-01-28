'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsService } from '@/services/leads.service';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { toast } from 'sonner';
import { LEAD_STATUSES, LEAD_SOURCES } from '@/lib/constants';
import type { CreateLeadDTO, LeadStatus, LeadSource } from '@/types/leads';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST']),
  source: z.enum(['EMAIL', 'WEBSITE', 'REFERRAL', 'SOCIAL_MEDIA', 'PHONE', 'OTHER']),
  notes: z.string().optional(),
  value: z.number().min(0, 'Value must be positive'),
});

interface LeadFormProps {
  isEditing?: boolean;
  initialData?: Partial<CreateLeadDTO>;
}

export function LeadForm({ isEditing, initialData }: LeadFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<CreateLeadDTO>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    company: initialData?.company || '',
    status: initialData?.status || 'NEW',
    source: initialData?.source || 'WEBSITE',
    notes: initialData?.notes || '',
    value: initialData?.value || 0,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateLeadDTO) => 
      isEditing && initialData?.id
        ? leadsService.updateLead(initialData.id, data)
        : leadsService.createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success(isEditing ? 'Lead updated successfully' : 'Lead created successfully');
      router.push('/leads');
    },
    onError: (error) => {
      toast.error('Failed to save lead');
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const validateForm = () => {
    try {
      leadSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutate(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />
      <Input
        label="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <Input
        label="Company"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
      />
      <Select
        label="Status"
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
        error={errors.status}
      >
        {Object.entries(LEAD_STATUSES).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      <Select
        label="Source"
        value={formData.source}
        onChange={(e) => setFormData({ ...formData, source: e.target.value as LeadSource })}
        error={errors.source}
      >
        {Object.entries(LEAD_SOURCES).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      <Input
        label="Value"
        type="number"
        value={formData.value}
        onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
        error={errors.value}
      />
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : isEditing ? 'Update Lead' : 'Create Lead'}
        </Button>
      </div>
    </form>
  );
}