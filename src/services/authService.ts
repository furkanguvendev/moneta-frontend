import axiosInstance from '../api/axiosInstance';

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    userName: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    email: string;
    token: string;
    message: string;
}

export const authService = {
    login: async (credentials: LoginData): Promise<LoginResponse> => {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    },

    register: async (userData: RegisterData) => {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    }
};