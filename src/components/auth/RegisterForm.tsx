'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User, Building } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PasswordStrengthIndicatorProps {
  password: string;
}

function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const checks = [
    { regex: /.{8,}/, label: 'At least 8 characters' },
    { regex: /[A-Z]/, label: 'Uppercase letter' },
    { regex: /[a-z]/, label: 'Lowercase letter' },
    { regex: /[0-9]/, label: 'Number' },
    { regex: /[^A-Za-z0-9]/, label: 'Special character' },
  ];

  const strength = checks.reduce((score, check) => 
    score + (check.regex.test(password) ? 1 : 0), 0);

  const getStrengthColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-2">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getStrengthColor()} transition-all duration-300`}
          style={{ width: `${(strength / checks.length) * 100}%` }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {checks.map((check, index) => (
          <div
            key={index}
            className={`flex items-center gap-1 ${
              check.regex.test(password) ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${
              check.regex.test(password) ? 'bg-green-600' : 'bg-gray-300'
            }`} />
            {check.label}
          </div>
        ))}
      </div>
    </div>
  );
}

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .refine(
      (password) => {
        // Check for common patterns and dictionary words
        const commonPatterns = [
          /password/i,
          /12345/,
          /qwerty/i,
          /admin/i,
        ];
        return !commonPatterns.some(pattern => pattern.test(password));
      },
      'Password contains common patterns that are easily guessable'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');

  async function onSubmit(data: RegisterData) {
    setIsLoading(true);
    try {
      // TODO: Implement actual registration
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      
      setIsRegistered(true);
      toast.success('Registration successful!', {
        description: 'Please check your email to verify your account.',
      });
      
      // Redirect to email verification page
      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed', {
        description: 'Please try again later',
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
      className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-sm"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Join Hypermiles CRM to streamline your business operations
        </p>
      </motion.div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                label="First Name"
                {...register('firstName')}
                type="text"
                autoComplete="given-name"
                leftIcon={<User className="text-gray-400" />}
                error={errors.firstName?.message}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Input
                label="Last Name"
                {...register('lastName')}
                type="text"
                autoComplete="family-name"
                leftIcon={<User className="text-gray-400" />}
                error={errors.lastName?.message}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Input
              label="Email"
              {...register('email')}
              type="email"
              autoComplete="email"
              leftIcon={<Mail className="text-gray-400" />}
              error={errors.email?.message}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Input
              label="Company Name"
              {...register('companyName')}
              type="text"
              autoComplete="organization"
              leftIcon={<Building className="text-gray-400" />}
              error={errors.companyName?.message}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Input
              label="Password"
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              leftIcon={<Lock className="text-gray-400" />}
              error={errors.password?.message}
              rightIcon={
                showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(false)}
                    className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(true)}
                    className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                  />
                )
              }
            />
            {password && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2"
              >
                <PasswordStrengthIndicator password={password} />
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Input
              label="Confirm Password"
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              leftIcon={<Lock className="text-gray-400" />}
              error={errors.confirmPassword?.message}
              rightIcon={
                showConfirmPassword ? (
                  <EyeOff
                    onClick={() => setShowConfirmPassword(false)}
                    className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowConfirmPassword(true)}
                    className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                  />
                )
              }
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-4"
        >
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            variant="primary"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                Creating account...
              </div>
            ) : (
              'Create account'
            )}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary-600 hover:text-primary-800 transition-colors font-medium"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
} 