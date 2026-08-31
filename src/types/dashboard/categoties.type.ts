import type { CategoryModel, CategoryCount } from "@model/dashboard/categories.model";
import type { PlantModel } from "@model/dashboard/plants.model";

export interface UseCategoriesReturn {
    categories: CategoryModel[]
    loading: boolean;
    error: string | null;
    categoriesCount: CategoryCount[];
    getCategoryPlantCountsById: PlantModel[];
    selectedCategory: string | null;
    setSelectedCategory: (selectedCategory: string | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setCategories: (categories: CategoryModel[]) => void;
    setCategoriesCount: (categoriesCount: CategoryCount[]) => void;
    setCategoryPlantCountsById: (getCategoryPlantCountsById: PlantModel[]) => void;
    fetchCategories: () => Promise<void>;
    fetchCategoriesCount: () => Promise<void>;
    fetchPlantsByCategory: (category: string) => Promise<void>;
    openPlantModal: (category: string) => void;
    closePlantModal: () => void;
    isCategoryPlantsModalOpen: boolean;
    setCategoryPlantsModalOpen: (isCategoryPlantsModalOpen: boolean) => void;
}

export interface CategoryPlantsModalProps {
    isOpen: boolean;
    categoryName: string;
    plants: PlantModel[];
    onClose: () => void;
}