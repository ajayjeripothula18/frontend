import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | HyperMiles CRM',
  description: 'View your CRM dashboard metrics and activities',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 