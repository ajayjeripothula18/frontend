import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { authService } from '@/services/authService';

interface ApiErrorResponse {
  message: string;
  statusCode?: number;
}

export const handleApiError = (error: AxiosError<ApiErrorResponse>) => {
  const message = error.response?.data?.message || 'An error occurred';
  toast.error(message);
  
  if (error.response?.status === 401) {
    // Handle unauthorized access
    authService.logout();
  }
  
  return Promise.reject(error);
}; 