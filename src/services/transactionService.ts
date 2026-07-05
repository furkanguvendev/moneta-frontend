import axiosInstance from '../api/axiosInstance';

export interface TransactionRequest {
    walletId: number;
    categoryId: number;
    amount: number;
    description: string;
    transactionType: 'INCOME' | 'EXPENSE';
}

export interface TransactionResponse {
    id: number;
    amount: number;
    description: string;
    transactionType: 'INCOME' | 'EXPENSE';
    categoryName: string;
    transactionDate: string;
}

export interface TransactionStatisticsResponse {
    categoryName: string;
    totalAmount: number;
    percentage?: number;
}

export const transactionService = {
    getTransactionById: async (id: number): Promise<TransactionResponse> => {
        const response = await axiosInstance.get(`/transactions/${id}`);
        return response.data;
    },

    getTransactionsByWallet: async (walletId: number): Promise<TransactionResponse[]> => {
        const response = await axiosInstance.get(`/transactions/wallet/${walletId}`);
        return response.data;
    },

    getWalletStatistics: async (walletId: number): Promise<TransactionStatisticsResponse[]> => {
        const response = await axiosInstance.get(`/transactions/statistics/${walletId}`);
        return response.data;
    },

    addTransaction: async (request: TransactionRequest): Promise<TransactionResponse> => {
        const response = await axiosInstance.post('/transactions', request);
        return response.data;
    },

    deleteTransaction: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/transactions/${id}`);
    }
};