import axiosInstance from '../api/axiosInstance';

export interface CategoryRequest {
    name: string;
    icon?: string;
    color?: string;
}

export const categoryService = {

    getAllCategories: async () => {
        const response = await axiosInstance.get('/categories');
        return response.data;
    },

    getMandatoryCategories: async () => {
        const response = await axiosInstance.get('/categories/mandatory');
        return response.data;
    },

    createCategory: async (request: CategoryRequest) => {
        const response = await axiosInstance.post('/categories', request);
        return response.data;
    },

    deleteCategory: async (id: number) => {
        await axiosInstance.delete(`/categories/${id}`);
    }
};