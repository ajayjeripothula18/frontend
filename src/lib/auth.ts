import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/auth.config';

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return session;
}

export async function requireGuest() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }
}