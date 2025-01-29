'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  email?: string;
  token?: string;
}

export function EmailVerification({ email, token }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  async function verifyEmail() {
    setIsLoading(true);
    try {
      // TODO: Implement actual email verification
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      
      setIsVerified(true);
      toast.success('Email verified!', {
        description: 'Your email has been successfully verified.',
      });
      
    } catch (error) {
      console.error('Email verification error:', error);
      setError('Failed to verify email. The link may be expired or invalid.');
      toast.error('Verification failed', {
        description: 'Please try again or request a new verification link.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function resendVerification() {
    setIsLoading(true);
    try {
      // TODO: Implement actual resend verification
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      
      toast.success('Verification email sent!', {
        description: 'Please check your email for the verification link.',
      });
      
    } catch (error) {
      console.error('Resend verification error:', error);
      toast.error('Failed to send verification email', {
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-sm text-center"
      >
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
          <RefreshCw className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Verifying your email</h2>
        <p className="text-gray-600">
          Please wait while we verify your email address...
        </p>
      </motion.div>
    );
  }

  if (isVerified) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-sm text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Email Verified!</h2>
        <p className="text-gray-600">
          Thank you for verifying your email address. You can now access all features of your account.
        </p>
        <div className="pt-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
          >
            Continue to Login
          </Link>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-sm text-center"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Verification Failed</h2>
        <p className="text-gray-600">{error}</p>
        <div className="pt-4 space-y-4">
          <Button
            onClick={resendVerification}
            disabled={isLoading}
            variant="primary"
            className="w-full"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                Sending...
              </div>
            ) : (
              'Resend Verification Email'
            )}
          </Button>
          <Link
            href="/login"
            className="block text-primary-600 hover:text-primary-800 transition-colors font-medium"
          >
            Back to Login
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-sm text-center"
    >
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
        <Mail className="w-8 h-8 text-primary-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>
      <p className="text-gray-600">
        We've sent a verification link to{' '}
        <span className="font-medium text-gray-900">{email}</span>.
        Please check your email and click the link to verify your account.
      </p>
      <div className="pt-4 space-y-4">
        <Button
          onClick={resendVerification}
          disabled={isLoading}
          variant="primary"
          className="w-full"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
              Sending...
            </div>
          ) : (
            'Resend Verification Email'
          )}
        </Button>
        <Link
          href="/login"
          className="block text-primary-600 hover:text-primary-800 transition-colors font-medium"
        >
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
} 