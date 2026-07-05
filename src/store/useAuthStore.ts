import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService, type LoginData, type RegisterData } from "../services/authService";

interface User {
    id: number;
    userName: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    loginUser: (credentials: LoginData) => Promise<void>;
    registerUser: (userData: RegisterData, successCallback: () => void) => Promise<void>;
    logout: () => void;
    clearAuthError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
                                                                                                        
            loginUser: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const data = await authService.login(credentials);
                    set({
                        token: data.token,
                        isAuthenticated: true,
                        isLoading: false,
                        user: {
                            id: data.id, 
                            userName: data.username,
                            email: data.email
                        }
                    });
                } catch (err: unknown) {
                    const errorMessage = err instanceof Error ? err.message : "Giriş yapılamadı. Bilgilerinizi kontrol edin.";
                    set({ error: errorMessage, isLoading: false });
                }
            },

            registerUser: async (userData, successCallback) => {
                set({ isLoading: true, error: null });
                try {
                    await authService.register(userData);
                    set({ isLoading: false });
                    successCallback(); 
                } catch (err: unknown) {
                    const errorMessage = err instanceof Error ? err.message : "Kayıt işlemi başarısız oldu.";
                    set({ error: errorMessage, isLoading: false });
                }
            },

            logout: () => set({ 
                user: null, 
                token: null, 
                isAuthenticated: false,
                error: null 
            }),

            clearAuthError: () => set({ error: null })
        }),
        {
            name: "moneta-auth-storage",
            partialize: (state) => ({ 
                user: state.user, 
                token: state.token, 
                isAuthenticated: state.isAuthenticated 
            }),
        }
    )
);