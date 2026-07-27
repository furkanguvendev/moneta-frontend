import { create } from 'zustand';
import { AxiosError } from 'axios';
import type { InvestmentSimulation, SimulationRequest, SimulationCloseRequest } from '../types/investment';
import { investmentService } from '../services/investmentService';

interface InvestmentState {
  simulations: InvestmentSimulation[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchSimulations: (userId: number) => Promise<void>;
  createSimulation: (userId: number, request: SimulationRequest) => Promise<boolean>;
  closeSimulation: (id: number, userId: number, request: SimulationCloseRequest) => Promise<boolean>;
}

export const useInvestmentStore = create<InvestmentState>((set) => ({
  simulations: [],
  isLoading: false,
  error: null,

  fetchSimulations: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = await investmentService.getActiveSimulations(userId);
      set({ simulations: data, isLoading: false });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({ 
        error: error.response?.data?.message || 'Simülasyonlar yüklenirken bir hata oluştu.', 
        isLoading: false 
      });
    }
  },

  createSimulation: async (userId: number, request: SimulationRequest) => {
    set({ isLoading: true, error: null });
    try {
      const newSimulation = await investmentService.createSimulation(userId, request);
      set((state) => ({
        simulations: [...state.simulations, newSimulation],
        isLoading: false,
      }));
      return true;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({ 
        error: error.response?.data?.message || 'Simülasyon oluşturulurken bir hata oluştu.', 
        isLoading: false 
      });
      return false;
    }
  },

  closeSimulation: async (id: number, userId: number, request: SimulationCloseRequest) => {
    set({ isLoading: true, error: null });
    try {
      await investmentService.closeSimulation(id, userId, request);
      set((state) => ({
        simulations: state.simulations.filter((sim) => sim.id !== id),
        isLoading: false,
      }));
      return true;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({ 
        error: error.response?.data?.message || 'Simülasyon kapatılırken bir hata oluştu.', 
        isLoading: false 
      });
      return false;
    }
  },
}));