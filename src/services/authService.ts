import axiosInstance from '../api/axiosInstance';

interface LoginData {
    email: string;
    password?: string;
}

interface RegisterData {
    userName: string;
    email: string;
    password?: string;
}

export const authService = {

    login: async (credentials: LoginData) => {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data; // LoginResponse (token, email, name)
    },


    register: async (userData: RegisterData) => {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data; // AuthResponse
    }
};