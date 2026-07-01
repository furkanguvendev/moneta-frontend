import { create } from "zustand";
import { categoryService } from "../services/categoryService";
import type { CategoryRequest } from "../services/categoryService";
import { useAuthStore } from "./useAuthStore";

interface Category {
    id: number;
    name: string;
    isMandatory: boolean;
    isDefault: boolean;
}

interface CategoryStore {
    categories: Category[];
    mandatoryCategories: Category[];
    isLoading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    fetchMandatoryCategories: () => Promise<void>;
    createCategory: (request: CategoryRequest) => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
    categories: [],
    mandatoryCategories: [],
    isLoading: false,
    error: null,

    fetchCategories: async () => {
        const authState = useAuthStore.getState() as ReturnType<typeof useAuthStore.getState>;
        const rawUserId = authState.user?.id;

        if (!rawUserId) {
            set({ error: "Oturum açmış kullanıcı bulunamadı." });
            return;
        }

        const userId = Number(rawUserId);
        if (isNaN(userId)) return;

        set({ isLoading: true, error: null });
        try {
            const data = await categoryService.getAllCategories(userId);
            set({ categories: data, isLoading: false });
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Kategoriler yüklenemedi";
            set({ error: errorMessage, isLoading: false });
        }
    },

    fetchMandatoryCategories: async () => {
        try {
            const data = await categoryService.getMandatoryCategories();
            set({ mandatoryCategories: data });
        } catch (err: unknown) {
            console.error("Zorunlu kategoriler yüklenemedi", err);
        }
    },

    createCategory: async (request) => {
        const authState = useAuthStore.getState() as ReturnType<typeof useAuthStore.getState>;
        const rawUserId = authState.user?.id;

        if (!rawUserId) return;

        const userId = Number(rawUserId);
        if (isNaN(userId)) return;

        set({ isLoading: true, error: null });
        try {
            await categoryService.createCategory(userId, request);
            await get().fetchCategories();
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Kategori oluşturulamadı";
            set({ error: errorMessage, isLoading: false });
        }
    }
}));