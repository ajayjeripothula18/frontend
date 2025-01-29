import { useCallback, useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getDeviceInfo } from '@/lib/utils/device-info';
import { toast } from 'sonner';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthError {
  code: string;
  message: string;
  details?: {
    remainingAttempts?: number;
    lockoutDuration?: number;
    rateLimitReset?: number;
  };
}

interface CustomUser {
  userId: number;
  email: string;
  roleId: number;
  name: string;
  isActive: boolean;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
  refreshToken: string;
  expires_at: string;
  error?: string;
}

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<AuthError | null>(null);

  // Clear error when status changes
  useEffect(() => {
    if (status === 'authenticated') {
      setAuthError(null);
    }
  }, [status]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsSubmitting(true);
      setAuthError(null);

      const deviceInfo = await getDeviceInfo();
      
      const result = await signIn('credentials', {
        ...credentials,
        deviceInfo: JSON.stringify(deviceInfo),
        redirect: false,
      });

      if (result?.error) {
        // Try to parse the error message
        try {
          const errorData = JSON.parse(result.error);
          setAuthError(errorData);
          
          // Handle specific error cases
          switch (errorData.code) {
            case 'RATE_LIMIT_EXCEEDED':
              toast.error(`Too many attempts. Please try again in ${Math.ceil(errorData.details.rateLimitReset / 60)} minutes.`);
              break;
            case 'ACCOUNT_LOCKED':
              toast.error(`Account is locked. Please try again in ${errorData.details.lockoutDuration} minutes.`);
              break;
            default:
              toast.error(errorData.message);
          }
        } catch {
          // If error isn't JSON, use it directly
          setAuthError({
            code: 'UNKNOWN_ERROR',
            message: result.error
          });
          toast.error(result.error);
        }
        return false;
      }

      toast.success('Successfully logged in!');
      router.push('/dashboard');
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setAuthError({
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred during login.'
      });
      toast.error('An unexpected error occurred. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      setIsSubmitting(true);
      await signOut({ callbackUrl: '/auth/login' });
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Error during logout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const checkAuth = useCallback(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/login');
      return;
    }

    // Check if session has error (e.g., from failed token refresh)
    const user = session.user as CustomUser;
    if (user?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/auth/login' });
    }
  }, [session, status, router]);

  // Provide session status utilities
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const user = session?.user as CustomUser;

  return {
    login,
    logout,
    checkAuth,
    isAuthenticated,
    isLoading,
    isSubmitting,
    user,
    error: authError,
    status
  };
} 
