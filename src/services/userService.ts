import axiosInstance from '../api/axiosInstance';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  roles?: string[];
  createdAt?: string;
  firstName?: string;
  lastName?: string;
}

export const userService = {
  getUserProfile: async (userId: number): Promise<UserResponse> => {
    const response = await axiosInstance.get<UserResponse>(`/users/${userId}`);
    return response.data;
  },

  deleteUser: async (userId: number): Promise<void> => {
    await axiosInstance.delete(`/users/${userId}`);
  }
};