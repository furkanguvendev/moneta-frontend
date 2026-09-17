import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token; 
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            useAuthStore.getState().logout();
            window.location.href = '/login?error=session_expired';
        }

        const backendMessage = error.response?.data?.message;
        if (backendMessage && typeof backendMessage === 'string') {
            error.message = backendMessage;
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;