import type { Metadata } from 'next';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password | HyperMiles CRM',
  description: 'Reset your password for HyperMiles CRM',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
} 