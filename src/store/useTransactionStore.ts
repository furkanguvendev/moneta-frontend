import { create } from "zustand";
import { transactionService } from "../services/transactionService";
import type { TransactionRequest } from "../services/transactionService";

interface Transaction {
    id: number;
    amount: number;
    description: string;
    transactionType: 'INCOME' | 'EXPENSE' | string;
    categoryName: string;
    transactionDate: string;
}

interface TransactionStatistics {
    categoryName: string;
    totalAmount: number;
    percentage?: number;
}

interface TransactionStore {
    transactions: Transaction[];
    statistics: TransactionStatistics[];
    isLoading: boolean;
    error: string | null;
    fetchTransactions: (walletId: number) => Promise<void>;
    fetchStatistics: (walletId: number) => Promise<void>;
    addTransaction: (request: TransactionRequest) => Promise<void>;
    deleteTransaction: (id: number, walletId: number) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
    transactions: [],
    statistics: [],
    isLoading: false,
    error: null,

    fetchTransactions: async (walletId) => {
        set({ isLoading: true, error: null });
        try {
            const data = await transactionService.getTransactionsByWallet(walletId);
            set({ transactions: data, isLoading: false });
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "İşlemler yüklenemedi";
            set({ error: errorMessage, isLoading: false });
        }
    },

    fetchStatistics: async (walletId) => {
        try {
            const data = await transactionService.getWalletStatistics(walletId);
            set({ statistics: data });
        } catch (err: unknown) {
            console.error("İstatistikler çekilemedi", err);
        }
    },

    addTransaction: async (request) => {
        set({ isLoading: true, error: null });
        try {
            await transactionService.addTransaction(request);
            await get().fetchTransactions(request.walletId);
            await get().fetchStatistics(request.walletId);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "İşlem eklenemedi";
            set({ error: errorMessage, isLoading: false });
        }
    },

    deleteTransaction: async (id, walletId) => {
        try {
            await transactionService.deleteTransaction(id);
            await get().fetchTransactions(walletId);
            await get().fetchStatistics(walletId);
        } catch (err: unknown) {
            console.error("İşlem silinemedi", err);
        }
    }
}));