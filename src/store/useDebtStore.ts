import { create } from 'zustand';
import { debtService } from '../services/debtService';
import type { DebtResponse, DebtRequest, DebtPaymentRequest } from '../types/debt';
import { useAuthStore } from './useAuthStore';
import { useTransactionStore } from './useTransactionStore';

interface DebtState {
  debts: DebtResponse[];
  isLoading: boolean;
  error: string | null;
  fetchUserDebts: () => Promise<void>;
  createDebt: (request: DebtRequest) => Promise<boolean>;
  makePayment: (debtId: number, request: DebtPaymentRequest, walletId?: number) => Promise<boolean>;
  syncInstallments: (walletId: number, year: number, month: number) => Promise<boolean>;
  deleteDebt: (debtId: number) => Promise<boolean>;
  clearError: () => void;
}

export const useDebtStore = create<DebtState>((set, get) => ({
  debts: [],
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchUserDebts: async () => {
    const authState = useAuthStore.getState();
    const userId = authState.user?.id;

    if (!userId) {
      set({ error: 'Oturum açmış kullanıcı bulunamadı.' });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const data = await debtService.getUsersDebts(userId);
      set({ debts: data, isLoading: false });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Kullanıcı borçları yüklenemedi.';
      set({ error: errorMessage, isLoading: false });
    }
  },

  createDebt: async (request: DebtRequest) => {
    const authState = useAuthStore.getState();
    const userId = authState.user?.id;

    if (!userId) {
      set({ error: 'Kullanıcı kimliği bulunamadı.' });
      return false;
    }

    set({ isLoading: true, error: null });
    try {
      await debtService.createDebt(userId, request);
      await get().fetchUserDebts();
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Borç kaydı oluşturulamadı.';
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  makePayment: async (debtId: number, request: DebtPaymentRequest, walletId?: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedDebt = await debtService.makePayment(debtId, request);

      set((state) => ({
        debts: state.debts.map((d) => (d.id === debtId ? updatedDebt : d)),
        isLoading: false,
      }));

      if (walletId) {
        const transactionStore = useTransactionStore.getState();
        await Promise.all([
          transactionStore.fetchTransactions(walletId),
          transactionStore.fetchStatistics(walletId)
        ]);
      }

      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ödeme işlemi başarısız.';
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  syncInstallments: async (walletId: number, year: number, month: number) => {
    try {
      await debtService.syncInstallments(walletId, year, month);
      await get().fetchUserDebts();
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Taksit senkronizasyonu başarısız.';
      set({ error: errorMessage });
      return false;
    }
  },

  deleteDebt: async (debtId: number) => {
    set({ isLoading: true, error: null });
    try {
      await debtService.deleteDebt(debtId);
      set((state) => ({
        debts: state.debts.filter((d) => d.id !== debtId),
        isLoading: false,
      }));
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Borç kaydı silinemedi.';
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },
}));