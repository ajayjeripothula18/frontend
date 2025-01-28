import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from '@/lib/api';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'AGENT' | 'MANAGER';
    createdAt: string;
    updatedAt: string;
    accessToken: string;
  }

  interface JWT {
    role?: 'ADMIN' | 'AGENT' | 'MANAGER';
    accessToken?: string;
  }
}

// Add this type declaration
type CustomUser = {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'AGENT' | 'MANAGER';
  createdAt: string;
  updatedAt: string;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await api.post('/auth/login', credentials);
          const { user, accessToken } = response.data;
          return { ...user, accessToken };
        } catch (error) {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  }
};