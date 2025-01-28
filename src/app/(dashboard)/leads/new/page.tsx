import { LeadForm } from '@/components/leads/LeadForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Lead | CRM Portal',
  description: 'Create a new lead',
};

export default function NewLeadPage() {
  return (
    <div className="max-w-3xl mx-auto py-6">
      <LeadForm />
    </div>
  );
} 