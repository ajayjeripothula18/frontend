import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | CRM Portal',
  description: 'View your CRM dashboard metrics and activities',
};

export default function DashboardPage() {
  return <DashboardContent />;
} 