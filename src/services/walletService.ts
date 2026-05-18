import axiosInstance from '../api/axiosInstance';

export const walletService = {

    getUserWallets: async () => {
        const response = await axiosInstance.get('/wallets');
        return response.data; 
    },

    getWalletById: async (walletId: number) => {
        const response = await axiosInstance.get(`/wallets/${walletId}`);
        return response.data;
    },

    createWallet: async (walletData: { name: string; currency: string }) => {
        const response = await axiosInstance.post('/wallets', walletData);
        return response.data;
    }
};