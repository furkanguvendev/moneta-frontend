export type InvestmentType = 'FAIZ' | 'DOLAR' | 'ALTIN' | 'BORSA';

export type MaturityType = 'GUNLUK' | 'AYLIK' | 'YILLIK';

export type SimulationStatus = 'ACTIVE' | 'CANCELLED' | 'COMPLETED';

export interface InvestmentSimulation {
  id: number;
  userId: number;
  walletId: number;
  amount: number;
  investmentType: InvestmentType;
  maturityType?: MaturityType;
  entryValue: number;
  startDate: string;
  endDate: string;
  status: SimulationStatus;
}

export interface SimulationRequest {
  walletId: number;
  amount: number;
  investmentType: InvestmentType;
  maturityType?: MaturityType;
  entryValue: number;
}

export interface SimulationCloseRequest {
  currentEvValue?: number;
}