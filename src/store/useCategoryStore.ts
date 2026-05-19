import { create } from "zustand";
import axios from "axios";
import { categoryService } from "../services/categoryService";
import type { CategoryRequest } from "../services/categoryService";

interface Category {
    id: number;
    name: string;
    icon?: string;
    color?: string;
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

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    mandatoryCategories: [],
    isLoading: false,
    error: null,

    fetchCategories: async () => {
        set({ isLoading: true });
        try {
            const data = await categoryService.getAllCategories();
            set({ categories: data, isLoading: false });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                set({ error: err.response?.data?.message || "Kategoriler yüklenemedi", isLoading: false });
            }
        }
    },

    fetchMandatoryCategories: async () => {
        try {
            const data = await categoryService.getMandatoryCategories();
            set({ mandatoryCategories: data });
        } catch (err) {
            console.error(err);
        }
    },

    createCategory: async (request) => {
        try {
            await categoryService.createCategory(request);
            useCategoryStore.getState().fetchCategories();
        } catch (err) {
            console.error(err);
        }
    }
}));