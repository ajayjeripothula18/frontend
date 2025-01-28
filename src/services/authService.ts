import axios from 'axios';
import { signOut } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export const authService = {
  async logout() {
    await signOut({ callbackUrl: '/login' });
  },

  async forgotPassword(email: string) {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async resetPassword(token: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async refreshToken(refreshToken: string) {
    try {
      const response = await axios.post(`${API_URL}/auth/refresh`, {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}; 