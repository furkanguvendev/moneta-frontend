import axiosInstance from '../api/axiosInstance';

export interface WalletRequest {
    name: string;
    balance: number;
    currency: string;
}

export interface WalletResponse {
    id: number;
    name: string;
    balance: number;
    currency: string;
    ownerName: string;
}

export const walletService = {
    getUserWallets: async (userId: number): Promise<WalletResponse[]> => {
        const response = await axiosInstance.get(`/wallets/user/${userId}`);
        return response.data; 
    },

    getWalletById: async (walletId: number): Promise<WalletResponse> => {
        const response = await axiosInstance.get(`/wallets/detail/${walletId}`);
        return response.data;
    },

    createWallet: async (userId: number, walletData: WalletRequest): Promise<WalletResponse> => {
        const response = await axiosInstance.post(`/wallets/user/${userId}`, walletData);
        return response.data;
    },

    deleteWallet: async (walletId: number): Promise<void> => {
        await axiosInstance.delete(`/wallets/${walletId}`);
    }
};