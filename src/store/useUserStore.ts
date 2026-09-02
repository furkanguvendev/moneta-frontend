import { create } from 'zustand';
import { userService, type UserResponse, type UserUpdateRequest } from '../services/userService';

interface UserState {
  userProfile: UserResponse | null;
  isLoading: boolean;
  error: string | null;
  fetchUserProfile: (userId: number) => Promise<void>;
  updateUserProfile: (userId: number, request: UserUpdateRequest) => Promise<boolean>;
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

  updateUserProfile: async (userId: number, request: UserUpdateRequest) => {
    set({ isLoading: true, error: null });
    try {
      const data = await userService.updateUserProfile(userId, request);
      set({ userProfile: data, isLoading: false });
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Profil güncellenemedi.';
      set({ error: errorMessage, isLoading: false });
      return false;
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