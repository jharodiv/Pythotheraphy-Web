import type { CategoryModel } from "@model/dashboard/categories.model";

export interface UseCategoriesReturn {
    categories: CategoryModel[]
    loading: boolean;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setCategories: (categories: CategoryModel[]) => void;
    fetchCategories: () => Promise<void>;
}