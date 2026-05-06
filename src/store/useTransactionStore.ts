import { create } from 'zustand';

interface Transaction {
    id: string;
    amount: number;
    receiver: string;
    date: string;
    type: 'SEND' | 'RECEIVE';
}

interface TransactionState {
    transactions: Transaction[];
    setTransactions: (data: Transaction[]) => void;
    addTransaction: (newTx: Transaction) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
    transactions: [],
    setTransactions: (data) => set({ transactions: data }),
    addTransaction: (newTx) => set((state) => ({ 
        transactions: [newTx, ...state.transactions]
    })),
}));