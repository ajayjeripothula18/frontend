export const BRAND = {
  colors: {
    primary: '#0a5486',
    primaryHover: '#065892',
    secondary: '#fd9f0d',
    secondaryHover: '#f59300',
  },
  gradients: {
    primary: 'from-[#0a5486] to-[#065892]',
    primaryHover: 'from-[#065892] to-[#0a5486]',
  },
} as const;

export const ROUTES = {
  auth: {
    login: '/auth/login',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
  },
  dashboard: {
    home: '/dashboard',
    leads: '/leads',
    customers: '/customers',
    calendar: '/calendar',
    settings: '/settings',
  },
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
    verifyEmail: '/api/auth/verify-email',
  },
} as const; 