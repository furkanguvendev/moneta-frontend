import axiosInstance from '../api/axiosInstance';

export interface TransactionRequest {
  walletId: number;
  categoryId: number;
  amount: number;
  description: string;
  transactionType: 'INCOME' | 'EXPENSE';
  transactionDate?: string;
}

export interface TransactionUpdateRequest {
  amount: number;
  description: string;
  categoryId: number;
  transactionType: 'INCOME' | 'EXPENSE';
  transactionDate?: string;
}

export interface TransactionResponse {
  id: number;
  amount: number;
  description: string;
  categoryId?: number;
  categoryName: string;
  isMandatory: boolean;
  walletName: string;
  walletId?: number;
  transactionType: 'INCOME' | 'EXPENSE';
  transactionDate: string; 
}

export interface TransactionStatisticsResponse {
  categoryId: number;
  categoryName: string;
  totalAmount: number;
  percentage: number;
}

export interface TransactionFilterParams {
  startDate?: string;
  endDate?: string;
  type?: 'INCOME' | 'EXPENSE';
}

export const transactionService = {
  getTransactionById: async (id: number): Promise<TransactionResponse> => {
    const response = await axiosInstance.get(`/transactions/${id}`);
    return response.data;
  },

  getTransactionsByWallet: async (
    walletId: number, 
    params?: TransactionFilterParams
  ): Promise<TransactionResponse[]> => {
    const response = await axiosInstance.get(`/transactions/wallet/${walletId}`, { params });
    return response.data;
  },

  getWalletStatistics: async (
    walletId: number, 
    params?: TransactionFilterParams
  ): Promise<TransactionStatisticsResponse[]> => {
    const response = await axiosInstance.get(`/transactions/statistics/${walletId}`, { params });
    return response.data;
  },

  addTransaction: async (request: TransactionRequest): Promise<TransactionResponse> => {
    const response = await axiosInstance.post('/transactions', request);
    return response.data;
  },

  updateTransaction: async (id: number, request: TransactionUpdateRequest): Promise<TransactionResponse> => {
    const response = await axiosInstance.put(`/transactions/${id}`, request);
    return response.data;
  },

  deleteTransaction: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/transactions/${id}`);
  },

  deleteTransactionsByMonth: async (walletId: number, year: number, month: number): Promise<void> => {
    await axiosInstance.delete(`/transactions/wallet/${walletId}/month/${year}/${month}`);
  },
};