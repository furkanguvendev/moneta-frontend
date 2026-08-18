import { create } from 'zustand';
import { debtService } from '../services/debtService';
import type { DebtResponse, DebtRequest, DebtPaymentRequest } from '../types/debt';
import { useAuthStore } from './useAuthStore';

interface DebtState {
  debts: DebtResponse[];
  isLoading: boolean;
  error: string | null;
  fetchWalletDebts: (walletId: number) => Promise<void>;
  fetchUserDebts: () => Promise<void>;
  createDebt: (request: DebtRequest) => Promise<boolean>;
  makePayment: (debtId: number, request: DebtPaymentRequest) => Promise<boolean>;
  deleteDebt: (debtId: number) => Promise<void>;
}

export const useDebtStore = create<DebtState>((set, get) => ({
  debts: [],
  isLoading: false,
  error: null,

  fetchWalletDebts: async (walletId: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = await debtService.getWalletsDebts(walletId);
      set({ debts: data, isLoading: false });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Borçlar yüklenemedi.';
      set({ error: errorMessage, isLoading: false });
    }
  },

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
    set({ isLoading: true, error: null });
    try {
      await debtService.createDebt(request);
      await get().fetchWalletDebts(request.walletId);
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Borç kaydı oluşturulamadı.';
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  makePayment: async (debtId: number, request: DebtPaymentRequest) => {
    set({ isLoading: true, error: null });
    try {
      const updatedDebt = await debtService.makePayment(debtId, request);
      set((state) => ({
        debts: state.debts.map((d) => (d.id === debtId ? updatedDebt : d)),
        isLoading: false,
      }));
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ödeme işlemi başarısız.';
      set({ error: errorMessage, isLoading: false });
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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Borç kaydı silinemedi.';
      set({ error: errorMessage, isLoading: false });
    }
  },
}));