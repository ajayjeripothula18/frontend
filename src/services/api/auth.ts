import { API_ROUTES } from '@/config/routes'

export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface AuthResponse {
  accessToken: string
  expires_at: string
  token_type: 'Bearer'
  refreshToken: string
}

export interface UserProfile {
  userId: number
  email: string
  roleId: number
  name: string
  isActive: boolean
  lastLoginAt: string
  createdAt: string
  updatedAt: string
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(API_ROUTES.AUTH.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to login')
    }

    return response.json()
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await fetch(API_ROUTES.AUTH.REFRESH_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    return response.json()
  },

  async getProfile(accessToken: string): Promise<UserProfile> {
    const response = await fetch(API_ROUTES.AUTH.PROFILE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user profile')
    }

    return response.json()
  },

  async forgotPassword(email: string): Promise<void> {
    const response = await fetch(API_ROUTES.AUTH.FORGOT_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to send reset password email')
    }
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await fetch(API_ROUTES.AUTH.RESET_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to reset password')
    }
  },
} 