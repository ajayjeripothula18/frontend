import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/auth.config';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Navbar } from '@/components/dashboard/Navbar';

export default async function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <DashboardLayout>
      <Navbar user={session.user} />
      {children}
    </DashboardLayout>
  );
}