import axiosInstance from '../api/axiosInstance';

export interface TransactionRequest {
    walletId: number;
    categoryId: number;
    amount: number;
    description: string;
    type: 'INCOME' | 'EXPENSE';
}

export const transactionService = {

    getTransactionById: async (id: number) => {
        const response = await axiosInstance.get(`/transactions/${id}`);
        return response.data;
    },

    getTransactionsByWallet: async (walletId: number) => {
        const response = await axiosInstance.get(`/transactions/wallet/${walletId}`);
        return response.data;
    },

    getWalletStatistics: async (walletId: number) => {
        const response = await axiosInstance.get(`/transactions/statistics/${walletId}`);
        return response.data;
    },

    addTransaction: async (request: TransactionRequest) => {
        const response = await axiosInstance.post('/transactions', request);
        return response.data;
    },

    deleteTransaction: async (id: number) => {
        await axiosInstance.delete(`/transactions/${id}`);
    }
};