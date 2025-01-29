import axios from 'axios';
import { API_ENDPOINTS } from '@/config/constants';
import type {
  AuthResponse,
  LoginCredentials,
  ForgotPasswordData,
  ResetPasswordData,
  VerifyEmailData,
} from '@/types/auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await authService.refreshToken(refreshToken as string);
        
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        
        originalRequest.headers.Authorization = `Bearer ${response.token}`;
        return api(originalRequest);
      } catch (error) {
        // If refresh token fails, logout the user
        authService.logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.auth.login, credentials);
    return response.data;
  },

  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    await api.post(API_ENDPOINTS.auth.forgotPassword, data);
  },

  async resetPassword(data: ResetPasswordData): Promise<void> {
    await api.post(API_ENDPOINTS.auth.resetPassword, data);
  },

  async verifyEmail(data: VerifyEmailData): Promise<void> {
    await api.post(API_ENDPOINTS.auth.verifyEmail, data);
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/refresh', { refreshToken });
    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  },
}; 