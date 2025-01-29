import { api } from '@/lib/axios';

export interface TokenConfig {
  accessToken: {
    storage: 'memory';
    expiresIn: number; // 15 minutes in seconds
  };
  refreshToken: {
    storage: 'secure-cookie';
    expiresIn: number; // 7 days in seconds
  };
}

export const tokenConfig: TokenConfig = {
  accessToken: {
    storage: 'memory',
    expiresIn: 15 * 60 // 15 minutes
  },
  refreshToken: {
    storage: 'secure-cookie',
    expiresIn: 7 * 24 * 60 * 60 // 7 days
  }
} as const;

let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setTokens = (access: string | null, refresh: string | null) => {
  accessToken = access;
  refreshToken = refresh;
};

export const getAccessToken = () => accessToken;
export const getRefreshToken = () => refreshToken;

export const clearTokens = async () => {
  try {
    if (accessToken && refreshToken) {
      await api.post('/auth/logout', null, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'x-refresh-token': refreshToken
        }
      });
    }
  } catch (error) {
    console.error('Failed to logout:', error);
  } finally {
    setTokens(null, null);
  }
}; 