'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{email?: string, password?: string}>({});

  function validateForm(email: string, password: string) {
    const errors: {email?: string, password?: string} = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    return errors;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setFormErrors({});

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const validationErrors = validateForm(email, password);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        const errorMessage = result.error.toLowerCase();
        if (errorMessage.includes('locked')) {
          toast.error('Account Locked', {
            description: 'Your account has been temporarily locked. Please try again later or reset your password.',
          });
        } else if (errorMessage.includes('invalid')) {
          toast.error('Invalid Credentials', {
            description: 'Please check your email and password',
          });
        } else {
          toast.error('Authentication Failed', {
            description: result.error,
          });
        }
        setIsLoading(false);
        return;
      }

      router.push('/dashboard');
      toast.success('Welcome back!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong', {
        description: 'Please try again later',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-sm">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access your dashboard
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        <div className="space-y-4">
          <div>
            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              leftIcon={<Mail className="text-gray-400" />}
              error={formErrors.email}
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.email}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              leftIcon={<Lock className="text-gray-400" />}
              error={formErrors.password}
              rightIcon={
                showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(false)}
                    className="cursor-pointer text-gray-400 hover:text-gray-600"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(true)}
                    className="cursor-pointer text-gray-400 hover:text-gray-600"
                  />
                )
              }
            />
            {formErrors.password && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.password}
              </p>
            )}
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            variant="primary"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </div>

        <div className="text-center">
          <a
            href="/forgot-password"
            className="text-sm text-primary-600 hover:text-primary-800 transition-colors"
          >
            Forgot your password?
          </a>
        </div>
      </form>
    </div>
  );
}