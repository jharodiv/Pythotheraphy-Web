import type { CategoryModel, CategoryCount } from "@model/dashboard/categories.model";
import type { PlantModel } from "@model/dashboard/plants.model";

export interface UseCategoriesReturn {
    categories: CategoryModel[]
    loading: boolean;
    error: string | null;
    categoriesCount: CategoryCount[];
    getCategoryPlantCountsById: PlantModel[];
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setCategories: (categories: CategoryModel[]) => void;
    setCategoriesCount: (categoriesCount: CategoryCount[]) => void;
    setCategoryPlantCountsById: (getCategoryPlantCountsById: PlantModel[]) => void;
    fetchCategories: () => Promise<void>;
    fetchCategoriesCount: () => Promise<void>;
    fetchPlantsByCategory: (category: string) => Promise<void>;
}