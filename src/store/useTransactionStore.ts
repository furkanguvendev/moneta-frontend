import { create } from "zustand";
import axios from "axios";
import { transactionService } from "../services/transactionService";
import type { TransactionRequest } from "../services/transactionService";

interface Transaction {
    id: number;
    amount: number;
    description: string;
    type: string;
    categoryName: string;
    createdAt: string;
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

export const useTransactionStore = create<TransactionStore>((set) => ({
    transactions: [],
    statistics: [],
    isLoading: false,
    error: null,

    fetchTransactions: async (walletId) => {
        set({ isLoading: true, error: null });
        try {
            const data = await transactionService.getTransactionsByWallet(walletId);
            set({ transactions: data, isLoading: false });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                set({ error: err.response?.data?.message || "İşlemler yüklenemedi", isLoading: false });
            } else {
                set({ error: "Beklenmeyen bir hata oluştu", isLoading: false });
            }
        }
    },

    fetchStatistics: async (walletId) => {
        try {
            const data = await transactionService.getWalletStatistics(walletId);
            set({ statistics: data });
        } catch (err) {
            console.error("İstatistikler çekilemedi", err);
        }
    },

    addTransaction: async (request) => {
        set({ isLoading: true, error: null });
        try {
            await transactionService.addTransaction(request);
            await useTransactionStore.getState().fetchTransactions(request.walletId);
            await useTransactionStore.getState().fetchStatistics(request.walletId);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                set({ error: err.response?.data?.message || "İşlem eklenemedi", isLoading: false });
            }
        }
    },

    deleteTransaction: async (id, walletId) => {
        try {
            await transactionService.deleteTransaction(id);
            await useTransactionStore.getState().fetchTransactions(walletId);
            await useTransactionStore.getState().fetchStatistics(walletId);
        } catch (err) {
            console.error("İşlem silinemedi", err);
        }
    }
}));