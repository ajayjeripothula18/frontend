import { User } from './common';

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  AGENT = 'AGENT',
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expires_at: string;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export interface VerifyEmailData {
  token: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken: string;
}

export interface AuthError {
  message: string;
  code?: string;
  status?: number;
}

export interface NavbarProps {
  user: Pick<AuthUser, 'id' | 'email' | 'name' | 'role'>;
}

export interface User {
  userId: number;
  email: string;
  name: string;
  roleId: number;
  isActive: boolean;
  lastLoginAt: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expires_at: string;
  token_type: 'Bearer';
  user: User;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
}

export type ProfileResponseDto = User;
