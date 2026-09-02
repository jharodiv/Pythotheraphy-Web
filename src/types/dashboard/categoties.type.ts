import type { CategoryModel, CategoryCount } from "@model/dashboard/categories.model";
import type { PlantModel } from "@model/dashboard/plants.model";

export interface UseCategoriesReturn {
    categories: CategoryModel[]
    filteredCategories: CategoryModel[];
    loading: boolean;
    isCreating: boolean;
    error: string | null;
    search: string;
    categoriesCount: CategoryCount[];
    getCategoryPlantCountsById: PlantModel[];
    isSelectedCategory: string | null;
    isNewCategoryModalOpen: boolean;
    isCategoryPlantsModalOpen: boolean;
    selectedCategoryPlants: PlantModel[];
    setSelectedCategory: (selectedCategory: string | null) => void;
    setSearch: (search: string) => void;
    setLoading: (loading: boolean) => void;
    setIsCreating: (isCreating: boolean) => void;
    setError: (error: string | null) => void;
    setCategories: (categories: CategoryModel[]) => void;
    setCategoriesCount: (categoriesCount: CategoryCount[]) => void;
    setCategoryPlantCountsById: (getCategoryPlantCountsById: PlantModel[]) => void;
    setSelectedCategoryPlants: (selectedCategoryPlants: PlantModel[]) => void;
    fetchCategories: () => Promise<void>;
    fetchCategoriesCount: () => Promise<void>;
    fetchPlantsByCategory: (category: string) => Promise<void>;
    openPlantModal: (category: string, categoryPlants: PlantModel[]) => void;
    openNewCategoryModal: () => void;
    closeNewCategoryModal: () => void;
    closePlantModal: () => void;
    setIsNewCategoryModalOpen: (isNewCategoryModalOpen: boolean) => void;
    setIsCategoryPlantsModalOpen: (isCategoryPlantsModalOpen: boolean) => void;
    createNewCategory: (label: string) => Promise<void>;
}

export interface CategoryPlantsModalProps {
    isOpen: boolean;
    categoryName: string;
    plants: PlantModel[];
    onClose: () => void;
}

export interface CreateCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (label: string) => Promise<void>;
    isCreating: boolean;
}