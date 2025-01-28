import { User } from './common';
import { UserRole } from './next-auth';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface Session {
  user: AuthUser;
  accessToken: string;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

export interface NavbarProps {
  user: Pick<AuthUser, 'id' | 'email' | 'name' | 'role'>;
}
