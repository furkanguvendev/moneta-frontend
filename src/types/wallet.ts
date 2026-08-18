export interface Wallet {
  id: number;
  name: string;
  balance: number;
  currency: string;
  ownerName?: string;
  createdAt?: string;
}

export interface WalletRequest {
  name: string;
  balance: number;
  currency: string;
}