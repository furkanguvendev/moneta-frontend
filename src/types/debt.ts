export type DebtType = 'CREDIT_CARD' | 'LOAN' | 'PERSONAL_DEBT';

export interface DebtRequest {
  walletId: number;
  title: string;
  totalAmount: number;
  debtType: DebtType;
  dueDate: string; // YYYY-MM-DD
}

export interface DebtPaymentRequest {
  paymentAmount: number;
}

export interface DebtResponse {
  id: number;
  walletId: number;
  walletName: string;
  title: string;
  totalAmount: number;
  remainingAmount: number;
  debtType: DebtType;
  dueDate: string;
  isPaid: boolean;
  createdAt: string;
}