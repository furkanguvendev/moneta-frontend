export type DebtType = 'BIREYSEL_KREDI' | 'KONUT_KREDISI' | 'TASIT_KREDISI' | 'KREDI_KARTI_TAKSIDI' | 'DIGER';

export interface DebtRequest {
  title: string;
  totalAmount: number;
  debtType: DebtType;
  totalInstallments: number;
  dueDate?: string;
  walletId: number;
  categoryId: number;
  startDate?: string;
}

export interface DebtPaymentRequest {
  walletId: number;
  amount: number;
}

export interface DebtResponse {
  id: number;
  title: string;
  totalAmount: number;
  remainingAmount: number;
  totalInstallments?: number;
  paidInstallments?: number;
  monthlyInstallment?: number;
  debtType: DebtType;
  dueDate?: string;
  isCompleted: boolean;
}