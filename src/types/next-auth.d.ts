import 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';
import { User as BaseUser } from 'next-auth';
import { JWT as BaseJWT } from 'next-auth/jwt';
import type { User as CustomUser } from './auth';

declare module 'next-auth' {
  interface Session {
    user: {
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
    } & DefaultSession['user'];
    error?: 'RefreshAccessTokenError';
  }

  interface User extends DefaultUser {
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
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
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
  }
}

declare module 'next-auth' {
  interface User extends CustomUser {
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends BaseJWT {
    accessToken: string;
    refreshToken: string;
    user: User;
  }
} 