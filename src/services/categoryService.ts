import axiosInstance from '../api/axiosInstance';

export interface CategoryRequest {
    name: string;
    isMandatory: boolean;
}

export const categoryService = {
    getAllCategories: async (userId: number) => {
        const response = await axiosInstance.get(`/categories/user/${userId}`);
        return response.data;
    },

    getMandatoryCategories: async () => {
        const response = await axiosInstance.get('/categories/mandatory');
        return response.data;
    },

    createCategory: async (userId: number, request: CategoryRequest) => {
        const response = await axiosInstance.post(`/categories/user/${userId}`, request);
        return response.data;
    },

    deleteCategory: async (id: number) => {
        const response = await axiosInstance.delete(`/categories/${id}`);
        return response.data;
    }
};