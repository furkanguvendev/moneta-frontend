import axiosInstance from '../api/axiosInstance';
import type {
    InvestmentSimulation,
    SimulationRequest,
    SimulationCloseRequest,
} from '../types/investment';

export const investmentService = {

  getActiveSimulations: async (userId: number): Promise<InvestmentSimulation[]> => {
    const response = await axiosInstance.get<InvestmentSimulation[]>(`/simulations/user/${userId}`);
    return response.data;
  },

  createSimulation: async (
    userId: number,
    request: SimulationRequest
  ): Promise<InvestmentSimulation> => {
    const response = await axiosInstance.post<InvestmentSimulation>(
      `/simulations/user/${userId}`,
      request
    );
    return response.data;
  },

  closeSimulation: async (
    id: number,
    userId: number,
    request: SimulationCloseRequest
  ): Promise<InvestmentSimulation> => {
    const response = await axiosInstance.put<InvestmentSimulation>(
      `/simulations/${id}/close/user/${userId}`,
      request
    );
    return response.data;
  },
};