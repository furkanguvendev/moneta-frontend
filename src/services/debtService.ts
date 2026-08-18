import axiosInstance from '../api/axiosInstance';
import type { DebtRequest, DebtPaymentRequest, DebtResponse } from '../types/debt';

export const debtService = {
  getWalletsDebts: async (walletId: number): Promise<DebtResponse[]> => {
    const response = await axiosInstance.get<DebtResponse[]>(`/debts/wallet/${walletId}`);
    return response.data;
  },

  getUsersDebts: async (userId: number): Promise<DebtResponse[]> => {
    const response = await axiosInstance.get<DebtResponse[]>(`/debts/user/${userId}`);
    return response.data;
  },

  createDebt: async (request: DebtRequest): Promise<DebtResponse> => {
    const response = await axiosInstance.post<DebtResponse>('/debts', request);
    return response.data;
  },

  makePayment: async (debtId: number, request: DebtPaymentRequest): Promise<DebtResponse> => {
    const response = await axiosInstance.post<DebtResponse>(`/debts/${debtId}/pay`, request);
    return response.data;
  },

  deleteDebt: async (debtId: number): Promise<void> => {
    await axiosInstance.delete(`/debts/${debtId}`);
  }
};