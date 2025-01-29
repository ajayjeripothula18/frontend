import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';

// Queue for handling concurrent token refresh requests
let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(undefined);
    }
  });
  failedQueue = [];
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  
  if (session?.user.accessToken) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }
  
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request if a refresh is already in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const session = await getSession();
        
        if (session?.error === 'RefreshAccessTokenError') {
          // Token refresh failed, redirect to login
          processQueue(new Error('Refresh token expired'));
          await signOut({ callbackUrl: '/login' });
          return Promise.reject(error);
        }

        if (session?.user.accessToken) {
          // Process any queued requests
          processQueue();
          originalRequest.headers.Authorization = `Bearer ${session.user.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other errors
    if (error.response?.data?.message) {
      toast.error(Array.isArray(error.response.data.message) 
        ? error.response.data.message[0] 
        : error.response.data.message
      );
    }

    return Promise.reject(error);
  }
);

export default api;