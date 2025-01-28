import { LeadDetails } from '@/components/leads/LeadDetails';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lead Details | CRM Portal',
  description: 'View and manage lead details',
};

export default function LeadDetailsPage() {
  return <LeadDetails />;
} 