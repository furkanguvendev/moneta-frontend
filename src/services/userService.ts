import axiosInstance from '../api/axiosInstance';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  roles?: string[];
  createdAt?: string;
  firstName?: string;
  lastName?: string;
  budgetStartDay?: number;
  walletCount?: number;
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  budgetStartDay?: number;
}

export const userService = {
  getUserProfile: async (userId: number): Promise<UserResponse> => {
    const response = await axiosInstance.get<UserResponse>(`/users/${userId}`);
    return response.data;
  },

  updateUserProfile: async (userId: number, request: UserUpdateRequest): Promise<UserResponse> => {
    const response = await axiosInstance.put<UserResponse>(`/users/${userId}`, request);
    return response.data;
  },

  deleteUser: async (userId: number): Promise<void> => {
    await axiosInstance.delete(`/users/${userId}`);
  }
};