import axiosInstance from '../api/axiosInstance';

export const walletService = {
    
    getUserWallets: async (userId: number) => {
        const response = await axiosInstance.get(`/wallets/${userId}`);
        return response.data; 
    },

    getWalletById: async (walletId: number) => {
        const response = await axiosInstance.get(`/wallets/${walletId}`);
        return response.data;
    },

    createWallet: async (userId: number, walletData: { name: string; currency: string }) => {
        const response = await axiosInstance.post(`/wallets/user/${userId}`, walletData);
        return response.data;
    }
};