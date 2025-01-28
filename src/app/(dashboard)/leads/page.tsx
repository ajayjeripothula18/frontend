import { LeadsTable } from '@/components/leads/LeadsTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leads | CRM Portal',
  description: 'Manage and track your leads',
};

export default function LeadsPage() {
  return <LeadsTable />;
} 