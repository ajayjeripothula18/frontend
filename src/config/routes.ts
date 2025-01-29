const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
    PROFILE: `${API_BASE_URL}/auth/profile`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  },
  USERS: {
    LIST: `${API_BASE_URL}/users`,
    CREATE: `${API_BASE_URL}/users`,
    UPDATE_STATUS: (userId: number) => `${API_BASE_URL}/users/${userId}/status`,
  },
  LEADS: {
    LIST: `${API_BASE_URL}/leads`,
    CREATE: `${API_BASE_URL}/leads`,
    GET: (id: number) => `${API_BASE_URL}/leads/${id}`,
    UPDATE_STATUS: (id: number) => `${API_BASE_URL}/leads/${id}/status`,
    ACTIVITIES: (id: number) => `${API_BASE_URL}/leads/${id}/activities`,
    CONVERT: (id: number) => `${API_BASE_URL}/leads/${id}/convert`,
    SCORE: (id: number) => `${API_BASE_URL}/leads/${id}/score`,
    QUALIFY: (id: number) => `${API_BASE_URL}/leads/${id}/qualify`,
  },
  ROLES: {
    LIST: `${API_BASE_URL}/roles`,
    CREATE: `${API_BASE_URL}/roles`,
    GET: (id: number) => `${API_BASE_URL}/roles/${id}`,
    UPDATE: (id: number) => `${API_BASE_URL}/roles/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/roles/${id}`,
    PERMISSIONS: {
      ASSIGN: (roleId: number) => `${API_BASE_URL}/roles/${roleId}/permissions`,
      AVAILABLE: `${API_BASE_URL}/roles/permissions/available`,
    },
  },
} 