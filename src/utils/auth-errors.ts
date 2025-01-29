export enum AuthErrorCode {
  // Authentication errors
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_SESSION = 'INVALID_SESSION',
  CONCURRENT_LOGIN = 'CONCURRENT_LOGIN',
  DEVICE_NOT_RECOGNIZED = 'DEVICE_NOT_RECOGNIZED',
  LOCATION_NOT_RECOGNIZED = 'LOCATION_NOT_RECOGNIZED',
  PASSWORD_EXPIRED = 'PASSWORD_EXPIRED',
  REQUIRES_2FA = 'REQUIRES_2FA',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY'
}

export const retryConfig = {
  // Retry these status codes
  retryableStatuses: [408, 429, 500, 502, 503, 504] as number[],
  
  // Don't retry these error codes
  noRetryErrors: [
    AuthErrorCode.INVALID_CREDENTIALS,
    AuthErrorCode.ACCOUNT_LOCKED,
    AuthErrorCode.PASSWORD_EXPIRED
  ] as AuthErrorCode[],
  
  // Retry configuration
  maxRetries: 3,
  backoffFactor: 2,
  initialDelay: 1000
} as const;

export interface AuthError extends Error {
  code: AuthErrorCode;
  status?: number;
  retryAfter?: number;
}

export const createAuthError = (code: AuthErrorCode, message: string, status?: number, retryAfter?: number): AuthError => {
  const error = new Error(message) as AuthError;
  error.code = code;
  error.status = status;
  error.retryAfter = retryAfter;
  return error;
};

export const isRetryableError = (error: AuthError): boolean => {
  if (retryConfig.noRetryErrors.includes(error.code)) {
    return false;
  }
  
  return error.status ? retryConfig.retryableStatuses.includes(error.status) : false;
}; 