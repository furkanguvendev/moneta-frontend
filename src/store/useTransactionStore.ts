import { create } from "zustand";
import { transactionService } from "../services/transactionService";
import type { 
  TransactionRequest, 
  TransactionUpdateRequest, 
  TransactionResponse, 
  TransactionStatisticsResponse,
  TransactionFilterParams 
} from "../services/transactionService";

interface TransactionStore {
  transactions: TransactionResponse[];
  statistics: TransactionStatisticsResponse[];
  isLoading: boolean;
  error: string | null;
  fetchTransactions: (walletId: number, params?: TransactionFilterParams) => Promise<void>;
  fetchStatistics: (walletId: number, params?: TransactionFilterParams) => Promise<void>;
  addTransaction: (request: TransactionRequest) => Promise<boolean>;
  updateTransaction: (id: number, walletId: number, request: TransactionUpdateRequest) => Promise<boolean>;
  deleteTransaction: (id: number, walletId: number) => Promise<boolean>;
  clearError: () => void;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  statistics: [],
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchTransactions: async (walletId, params) => {
    set({ isLoading: true, error: null });
    try {
      const data = await transactionService.getTransactionsByWallet(walletId, params);
      set({ transactions: data, isLoading: false });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "İşlemler yüklenemedi";
      set({ error: errorMessage, isLoading: false });
    }
  },

  fetchStatistics: async (walletId, params) => {
    try {
      const data = await transactionService.getWalletStatistics(walletId, params);
      set({ statistics: data });
    } catch (err: unknown) {
      console.error("İstatistikler çekilemedi", err);
    }
  },

  addTransaction: async (request) => {
    set({ isLoading: true, error: null });
    try {
      await transactionService.addTransaction(request);
      await Promise.all([
        get().fetchTransactions(request.walletId),
        get().fetchStatistics(request.walletId)
      ]);
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "İşlem eklenemedi";
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  updateTransaction: async (id, walletId, request) => {
    set({ isLoading: true, error: null });
    try {
      await transactionService.updateTransaction(id, request);
      await Promise.all([
        get().fetchTransactions(walletId),
        get().fetchStatistics(walletId)
      ]);
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "İşlem güncellenemedi";
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  deleteTransaction: async (id, walletId) => {
    set({ isLoading: true, error: null });
    try {
      await transactionService.deleteTransaction(id);
      await Promise.all([
        get().fetchTransactions(walletId),
        get().fetchStatistics(walletId)
      ]);
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "İşlem silinemedi";
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  }
}));