import axios, { AxiosError } from 'axios';
import { getAccessToken } from '@/utils/token-manager';
import { ApiErrorResponse } from '@/types/auth';
import { createAuthError } from '@/utils/auth-errors';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000, // 10 seconds timeout
  timeoutErrorMessage: 'Request timed out. Please try again.'
});

// Add request interceptor to attach the access token
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.data) {
      const { statusCode, message, error: errorType } = error.response.data;
      return Promise.reject(
        createAuthError(
          errorType as any,
          message,
          statusCode,
          error.response.headers['retry-after']
            ? parseInt(error.response.headers['retry-after'])
            : undefined
        )
      );
    }
    return Promise.reject(error);
  }
);

export default api;