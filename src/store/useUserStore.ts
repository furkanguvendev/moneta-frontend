import { create } from 'zustand';
import { userService } from '../services/userService';

export interface UserResponse {
    id: number;
    userName: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

interface UserState {
    userProfile: UserResponse | null;
    isLoading: boolean;
    error: string | null;
    fetchUserProfile: (userId: number) => Promise<void>;
    removeUser: (userId: number, logoutCallback: () => void) => Promise<void>;
    clearUserError: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    userProfile: null,
    isLoading: false,
    error: null,

    fetchUserProfile: async (userId: number) => {
        set({ isLoading: true, error: null });
        try {
            const data = await userService.getUserProfile(userId);
            set({ userProfile: data, isLoading: false });
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Kullanıcı bilgileri yüklenemedi.';
            set({ error: errorMessage, isLoading: false });
        }
    },

    removeUser: async (userId: number, logoutCallback: () => void) => {
        set({ isLoading: true, error: null });
        try {
            await userService.deleteUser(userId);
            set({ userProfile: null, isLoading: false });
            logoutCallback();
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Kullanıcı silinirken bir hata oluştu.';
            set({ error: errorMessage, isLoading: false });
        }
    },

    clearUserError: () => set({ error: null })
}));