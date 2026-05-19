import axiosInstance from '../api/axiosInstance';

export const userService = {
    
    getUserProfile: async (userId: number) => {
        const response = await axiosInstance.get(`/users/${userId}`);
        return response.data; // UserResponse
    },

    deleteUser: async (userId: number) => {
        await axiosInstance.delete(`/users/${userId}`);
    }
};