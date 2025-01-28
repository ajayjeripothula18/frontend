import { LeadForm } from '@/components/leads/LeadForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Lead | CRM Portal',
  description: 'Edit lead details',
};

export default function EditLeadPage() {
  return (
    <div className="max-w-3xl mx-auto py-6">
      <LeadForm isEditing />
    </div>
  );
} 