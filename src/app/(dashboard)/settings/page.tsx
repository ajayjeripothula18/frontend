import { SettingsForm } from '@/components/settings/SettingsForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings | CRM Portal',
  description: 'Manage your account settings',
};

export default function SettingsPage() {
  return <SettingsForm />;
} 