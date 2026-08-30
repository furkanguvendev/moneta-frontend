import axiosInstance from '../api/axiosInstance';
import type { DebtRequest, DebtPaymentRequest, DebtResponse } from '../types/debt';

export const debtService = {
  getUsersDebts: async (userId: number): Promise<DebtResponse[]> => {
    const response = await axiosInstance.get<DebtResponse[]>(`/debts/user/${userId}`);
    return response.data;
  },

  getDebtById: async (debtId: number): Promise<DebtResponse> => {
    const response = await axiosInstance.get<DebtResponse>(`/debts/${debtId}`);
    return response.data;
  },

  createDebt: async (userId: number, request: DebtRequest): Promise<DebtResponse> => {
    const response = await axiosInstance.post<DebtResponse>(`/debts/user/${userId}`, request);
    return response.data;
  },

  makePayment: async (debtId: number, request: DebtPaymentRequest): Promise<DebtResponse> => {
    const response = await axiosInstance.post<DebtResponse>(`/debts/${debtId}/pay`, request);
    return response.data;
  },

  syncInstallments: async (walletId: number, year: number, month: number): Promise<void> => {
    await axiosInstance.post(`/debts/wallet/${walletId}/sync`, null, {
      params: { year, month }
    });
  },

  deleteDebt: async (debtId: number): Promise<void> => {
    await axiosInstance.delete(`/debts/${debtId}`);
  }
};