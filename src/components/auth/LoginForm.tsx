'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ROUTES } from '@/config/constants';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!result) {
        toast.error('An unexpected error occurred');
        return;
      }

      if (result.error) {
        try {
          const parsedError = JSON.parse(result.error);
          toast.error(parsedError.message || 'Invalid credentials', {
            icon: <AlertCircle className="h-5 w-5 text-red-500" />,
            className: 'bg-red-50 border-red-100 text-red-800',
            duration: 4000,
          });
        } catch {
          toast.error(result.error || 'Invalid credentials', {
            icon: <AlertCircle className="h-5 w-5 text-red-500" />,
            className: 'bg-red-50 border-red-100 text-red-800',
            duration: 4000,
          });
        }
        return;
      }

      if (result.ok) {
        toast.success('Welcome back!', {
          icon: <CheckCircle2 className="h-5 w-5 text-[#0a5486]" />,
          className: 'bg-[#0a5486]/10 border-[#0a5486]/20 text-[#0a5486]',
          duration: 4000,
        });
        router.push(ROUTES.dashboard.home);
        router.refresh();
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred. Please try again.', {
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        className: 'bg-red-50 border-red-100 text-red-800',
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access your dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-5">
          <div>
            <div className="relative group">
              <Input
                {...register('email')}
                type="email"
                placeholder="Email address"
                className="h-12 pl-12 w-full bg-white border-gray-200 group-hover:border-[#0a5486] focus:border-[#0a5486] focus:ring-[#0a5486] transition-all rounded-lg"
                disabled={isLoading}
                autoComplete="email"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-[#0a5486] transition-colors" />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="h-4 w-4" />
                {errors.email.message}
              </motion.p>
            )}
          </div>

          <div>
            <div className="relative group">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="h-12 pl-12 pr-12 w-full bg-white border-gray-200 group-hover:border-[#0a5486] focus:border-[#0a5486] focus:ring-[#0a5486] transition-all rounded-lg"
                disabled={isLoading}
                autoComplete="current-password"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-[#0a5486] transition-colors" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a5486] focus:outline-none transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="h-4 w-4" />
                {errors.password.message}
              </motion.p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-[#0a5486] hover:text-[#065892] transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-[#0a5486] to-[#065892] hover:from-[#065892] hover:to-[#0a5486] text-white font-medium rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign in'
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <a
              href="mailto:support@hypermiles.com"
              className="font-medium text-[#0a5486] hover:text-[#065892] transition-colors"
            >
              Contact support
            </a>
          </p>
        </div>
      </form>
    </motion.div>
  );
}