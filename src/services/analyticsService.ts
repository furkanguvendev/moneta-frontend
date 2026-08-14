import axiosInstance from '../api/axiosInstance';

export interface MonthlySummaryResponse {
  totalIncome: number;
  totalExpense: number;
}

export interface MonthlyBreakdownResponse {
  year: number;
  month: number;
  totalIncome: number;
  totalExpense: number;
}

export const analyticsService = {
  getMonthlySummary: async (userId: number): Promise<MonthlySummaryResponse> => {
    const response = await axiosInstance.get(`/analytics/user/${userId}/monthly-summary`);
    return response.data;
  },

  getWalletMonthlySummary: async (walletId: number): Promise<MonthlySummaryResponse> => {
    const response = await axiosInstance.get<MonthlySummaryResponse>(`/analytics/wallet/${walletId}/monthly-summary`);
    return response.data;
  },

  getWalletMonthlyBreakdown: async (walletId: number): Promise<MonthlyBreakdownResponse[]> => {
    const response = await axiosInstance.get<MonthlyBreakdownResponse[]>(`/analytics/wallet/${walletId}/monthly-breakdown`);
    return response.data;
  },
};