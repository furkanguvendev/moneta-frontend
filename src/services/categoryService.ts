import axiosInstance from '../api/axiosInstance';

export interface CategoryRequest {
    name: string;
    isMandatory: boolean;
}

export interface CategoryResponse {
    id: number;
    name: string;
    isMandatory: boolean;
    isDefault: boolean;
}

export const categoryService = {
    getAllCategories: async (userId: number): Promise<CategoryResponse[]> => {
        const response = await axiosInstance.get(`/categories/user/${userId}`);
        return response.data;
    },

    getMandatoryCategories: async (): Promise<CategoryResponse[]> => {
        const response = await axiosInstance.get('/categories/mandatory');
        return response.data;
    },

    createCategory: async (userId: number, request: CategoryRequest): Promise<CategoryResponse> => {
        const response = await axiosInstance.post(`/categories/user/${userId}`, request);
        return response.data;
    },

    deleteCategory: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/categories/${id}`);
    }
};