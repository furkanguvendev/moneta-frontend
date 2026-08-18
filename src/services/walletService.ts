import axiosInstance from '../api/axiosInstance';
import type { Wallet, WalletRequest } from '../types/wallet';

export const walletService = {
  getUserWallets: async (userId: number): Promise<Wallet[]> => {
    const response = await axiosInstance.get(`/wallets/user/${userId}`);
    return response.data; 
  },

  getWalletById: async (walletId: number): Promise<Wallet> => {
    const response = await axiosInstance.get(`/wallets/detail/${walletId}`);
    return response.data;
  },

  createWallet: async (userId: number, walletData: WalletRequest): Promise<Wallet> => {
    const response = await axiosInstance.post(`/wallets/user/${userId}`, walletData);
    return response.data;
  },

  deleteWallet: async (walletId: number): Promise<void> => {
    await axiosInstance.delete(`/wallets/${walletId}`);
  }
};