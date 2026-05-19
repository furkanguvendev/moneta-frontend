import { create } from "zustand";
import { walletService } from "../services/walletService";
import axios from "axios";

interface Wallet {
    id: number;
    name: string;
    balance: number;
    currency: string;
}

interface WalletState {
    wallets: Wallet[];
    activeWallet: Wallet | null;
    isLoading: boolean;
    error: string | null;
    fetchWallets: () => Promise<void>;
    selectWallet: (walletId: number) => Promise<void>;
}

export const useWalletState = create<WalletState>((set) => ({
    wallets: [],
    activeWallet: null,
    isLoading: false,
    error: null,

    fetchWallets: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await walletService.getUserWallets();
            set({ wallets: data, isLoading: false });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                set({ 
                    error: err.response?.data?.message || "Cüzdanlar yüklenirken bir hata oluştu", 
                    isLoading: false 
                });
            } else {
                set({ error: "Beklenmeyen bir hata oluştu", isLoading: false });
            }
        }
    },

    selectWallet: async (walletId: number) => {
        set({ isLoading: true, error: null });
        try {
            const data = await walletService.getWalletById(walletId);
            set({ activeWallet: data, isLoading: false });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                set({ 
                    error: err.response?.data?.message || "Cüzdan detayları alınamadı", 
                    isLoading: false 
                });
            } else {
                set({ error: "Beklenmeyen bir hata oluştu", isLoading: false });
            }
        }
    }
}));