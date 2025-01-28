import { api } from '@/lib/api';

interface UpdateProfileDTO {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

class UserService {
  async updateProfile(data: UpdateProfileDTO) {
    const response = await api.patch('/users/profile', data);
    return response.data;
  }
}

export const userService = new UserService(); 