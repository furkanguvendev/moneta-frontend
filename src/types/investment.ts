export type InvestmentType = 'FAIZ' | 'DOLAR' | 'ALTIN' | 'BORSA';

export type SimulationStatus = 'ACTIVE' | 'CANCELLED' | 'COMPLETED';

export interface InvestmentSimulation {
  id: number;
  userId: number;
  walletId: number;
  amount: number;
  investmentType: InvestmentType;
  entryValue: number;
  startDate: string;
  endDate: string;
  status: SimulationStatus;
}

export interface SimulationRequest {
  walletId: number;
  amount: number;
  investmentType: InvestmentType;
  entryValue: number;
}

export interface SimulationCloseRequest {
  currentEvValue?: number;
}