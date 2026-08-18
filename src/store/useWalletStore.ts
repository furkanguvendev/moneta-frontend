import { create } from 'zustand';
import { walletService } from '../services/walletService';
import type { Wallet } from '../types/wallet';
import { useAuthStore } from './useAuthStore';

interface WalletState {
  wallets: Wallet[];
  currentWallet: Wallet | null;
  isLoading: boolean;
  error: string | null;
  fetchWallets: () => Promise<void>;
  fetchWalletDetail: (walletId: number) => Promise<void>;
  addWallet: (walletData: { name: string; currency: string }) => Promise<void>;
  deleteWallet: (walletId: number) => Promise<void>;
}

export const useWalletStore = create<WalletState>((set) => ({
  wallets: [],
  currentWallet: null,
  isLoading: false,
  error: null,

  fetchWallets: async () => {
    const authState = useAuthStore.getState() as ReturnType<typeof useAuthStore.getState>;
    const rawUserId = authState.user?.id; 

    if (!rawUserId) {
      set({ error: "Oturum açmış kullanıcı bulunamadı." });
      return;
    }

    const userId = Number(rawUserId);

    if (isNaN(userId)) {
      set({ error: "Geçersiz kullanıcı ID formatı." });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const data = await walletService.getUserWallets(userId);
      set({ wallets: data, isLoading: false });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Cüzdanlar yüklenemedi.';
      set({ error: errorMessage, isLoading: false });
    }
  },

  fetchWalletDetail: async (walletId: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = await walletService.getWalletById(walletId);
      set({ currentWallet: data, isLoading: false });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Cüzdan detayı alınamadı.';
      set({ error: errorMessage, isLoading: false });
    }
  },

  addWallet: async (walletData: { name: string; currency: string }) => {
    const authState = useAuthStore.getState() as ReturnType<typeof useAuthStore.getState>;
    const rawUserId = authState.user?.id; 

    if (!rawUserId) return;
    
    const userId = Number(rawUserId);
    if (isNaN(userId)) return;

    try {
      const fullWalletData = { ...walletData, balance: 0 };
      const newWallet = await walletService.createWallet(userId, fullWalletData);
      
      set((state) => ({ 
        wallets: [...state.wallets, newWallet]
      }));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Cüzdan oluşturulamadı.';
      set({ error: errorMessage });
    }
  },

  deleteWallet: async (walletId: number) => {
    try {
      await walletService.deleteWallet(walletId);
      set((state) => ({
        wallets: state.wallets.filter((w) => w.id !== walletId)
      }));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Cüzdan silinemedi.';
      set({ error: errorMessage });
    }
  }
}));