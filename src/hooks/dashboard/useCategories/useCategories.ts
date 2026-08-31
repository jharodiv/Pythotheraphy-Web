import type { CategoryModel, CategoryCount } from "@model/dashboard/categories.model";
import type { PlantModel } from "@model/dashboard/plants.model";
import { getCategories, getCategoryPlantCounts, getCategoriesPlantsById } from "@service/dashboard/categorySection/category.service";
import type { UseCategoriesReturn } from "@type/dashboard/categoties.type";
import { useCallback, useEffect, useState } from "react";

export function useCategories(): UseCategoriesReturn {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isCategoryPlantsModalOpen, setIsCategoryPlantsModalOpen] = useState(false);
    const [isSelectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [categoriesCount, setCategoriesCount] = useState<CategoryCount[]>([]);
    const [getCategoryPlantCountsById, setCategoryPlantCountsById] = useState<PlantModel[]>([]);

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getCategories();

            setCategories(data);
        } catch (error) {
            console.error(
                "Failed to fetch categories:",
                error
            );
            setError(error instanceof Error ? error.message : "Unable to load categories");
        } finally {
            setLoading(false);
        }

    }, [])


    const fetchCategoriesCount = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getCategoryPlantCounts();
            setCategoriesCount(data);
        } catch (error) {
            console.error(
                "Failed to fetch the categories count"
            );

            setError(error instanceof Error ? error.message : "Unable to load the categories count");
        } finally {
            setLoading(false);
        }
    }, [])


    const fetchPlantsByCategory = useCallback(async (category: string) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getCategoriesPlantsById(category);

            setCategoryPlantCountsById(data);

            // WILL REMOVE IF UI IS DONE.
            return data;
        } catch (error) {
            console.error(
                "Failed to fetch the categories plants by id"
            );

            setError(error instanceof Error ? error.message : "Unable to load the categories plants by id");
        } finally {
            setLoading(false);
        }
    }, [])

    const openPlantModal = useCallback((category: string) => {
        setSelectedCategory(category);
        setIsCategoryPlantsModalOpen(true);
    }, [])

    const closePlantModal = useCallback(() => {
        setSelectedCategory(null);
        setIsCategoryPlantsModalOpen(false);
    }, [])

    useEffect(() => {
        fetchCategories();
        fetchCategoriesCount();
    }, [fetchCategories, fetchCategoriesCount]);



    return {
        categories,
        categoriesCount,
        getCategoryPlantCountsById,

        isCategoryPlantsModalOpen,
        isSelectedCategory,

        loading,
        error,

        setLoading,
        setError,
        setCategories,
        setCategoriesCount,
        setCategoryPlantCountsById,
        setIsCategoryPlantsModalOpen,
        setSelectedCategory,

        fetchCategories,
        fetchCategoriesCount,
        fetchPlantsByCategory,
        openPlantModal,
        closePlantModal
    };
}