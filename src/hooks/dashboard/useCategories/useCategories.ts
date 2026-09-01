import type { CategoryModel, CategoryCount } from "@model/dashboard/categories.model";
import type { PlantModel } from "@model/dashboard/plants.model";
import { getCategories, getCategoryPlantCounts, getCategoriesPlantsById, createPlantCategory } from "@service/dashboard/categorySection/category.service";
import type { UseCategoriesReturn } from "@type/dashboard/categoties.type";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useCategories(): UseCategoriesReturn {

    const [loading, setLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [isCategoryPlantsModalOpen, setIsCategoryPlantsModalOpen] = useState(false);
    const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
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

    const filteredCategories = useMemo(() => {
        return categories.filter((category) =>
            category.label
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    }, [categories, search])

    // Open New Category Modal
    const openNewCategoryModal = useCallback(() => {
        setIsNewCategoryModalOpen(true);
    }, [])
    // Close New Category Modal
    const closeNewCategoryModal = useCallback(() => {
        setIsNewCategoryModalOpen(false);
    }, [])


    const createNewCategory = useCallback(
        async (label: string): Promise<void> => {
            try {
                setIsCreating(true);
                setError(null);

                const newCategory = await createPlantCategory(label);

                setCategories((current) => [
                    ...current,
                    newCategory
                ]);

                closeNewCategoryModal();

                console.log(
                    "Successfully Created a Plant Category"
                )
            } catch (error) {
                console.error(
                    "Failed to create a category"
                );

                setError(error instanceof Error ? error.message : "Unable to create a category");
            } finally {
                setIsCreating(false);
            }
        }, [fetchCategories, closeNewCategoryModal])

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
        isCreating,
        error,
        search,

        setLoading,
        setError,
        setSearch,
        setCategories,
        setCategoriesCount,
        setCategoryPlantCountsById,
        setIsCategoryPlantsModalOpen,
        setSelectedCategory,
        setIsCreating,
        setIsNewCategoryModalOpen,

        fetchCategories,
        fetchCategoriesCount,
        fetchPlantsByCategory,
        filteredCategories,
        createNewCategory,
        openPlantModal,
        closePlantModal,
        openNewCategoryModal,
        closeNewCategoryModal,
        isNewCategoryModalOpen,
    };
}