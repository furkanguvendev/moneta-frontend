import { create } from 'zustand'

interface WalletState {
    balance: number;
    currency: string;
    setBalance: (amount: number) => void;
}

export const useWalletState = create<WalletState>((set) => ({
    balance: 0,
    currency: 'TRY',
    setBalance: (amount) => set({ balance: amount }),
}))
