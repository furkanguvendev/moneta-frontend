import { create } from 'zustand';
import { analyticsService } from '../services/analyticsService';
import type { MonthlySummaryResponse } from '../services/analyticsService';
import { useAuthStore } from './useAuthStore';

interface AnalyticsState {
    monthlySummary: MonthlySummaryResponse | null;
    isLoading: boolean;
    error: string | null;
    fetchMonthlySummary: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
    monthlySummary: null,
    isLoading: false,
    error: null,

    fetchMonthlySummary: async () => {
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
            const data = await analyticsService.getMonthlySummary(userId);
            set({ monthlySummary: data, isLoading: false });
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Aylık özet bilgisi alınamadı.';
            set({ error: errorMessage, isLoading: false });
        }
    }
}));