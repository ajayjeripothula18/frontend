import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from '@/lib/axios';
import { setTokens } from '@/utils/token-manager';
import { LoginResponse } from '@/types/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        deviceInfo: { type: 'text', label: 'Device Info' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          const response = await api.post<LoginResponse>('/auth/login', {
            email: credentials.email,
            password: credentials.password,
            deviceInfo: credentials.deviceInfo ? JSON.parse(credentials.deviceInfo) : undefined
          });

          const { accessToken, refreshToken, user } = response.data;
          
          // Store tokens
          setTokens(accessToken, refreshToken);

          return {
            ...user,
            accessToken,
            refreshToken
          };
        } catch (error: any) {
          console.error('Auth error:', error);
          if (error.response?.data) {
            throw new Error(JSON.stringify(error.response.data));
          }
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60 // 7 days
  },
  debug: process.env.NODE_ENV === 'development'
};