import { CustomersTable } from '@/components/customers/CustomersTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers | CRM Portal',
  description: 'Manage your customer relationships',
};

export default function CustomersPage() {
  return <CustomersTable />;
} 