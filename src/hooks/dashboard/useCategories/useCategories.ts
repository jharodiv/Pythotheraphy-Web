import { useConfirmation } from "@hooks/globalized/useConfirmation";
import type { CategoryModel, CategoryCount } from "@model/dashboard/categories.model";
import type { PlantModel } from "@model/dashboard/plants.model";
import { getCategories, getCategoryPlantCounts, getCategoriesPlantsById, createPlantCategory, updatePlantCategory, deletePlantCategory } from "@service/dashboard/categorySection/category.service";
import type { UseCategoriesReturn } from "@type/dashboard/categoties.type";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useCategories(): UseCategoriesReturn {

    const [loading, setLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [isCategoryPlantsModalOpen, setIsCategoryPlantsModalOpen] = useState(false);
    const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const [isSelectedCategory, setIsSelectedCategory] = useState<string | null>(null); const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null);
    const [categoriesCount, setCategoriesCount] = useState<CategoryCount[]>([]);
    const [getCategoryPlantCountsById, setCategoryPlantCountsById] = useState<PlantModel[]>([]);
    const [selectedCategoryPlants, setSelectedCategoryPlants] = useState<PlantModel[]>([]);

    const { openConfirmation } = useConfirmation();

    const openNewCategoryModal = useCallback(() => {
        setIsNewCategoryModalOpen(true);
    }, [])

    const closeNewCategoryModal = useCallback(() => {
        setIsNewCategoryModalOpen(false);
    }, [])

    const openEditCategoryModal = useCallback(
        (category: CategoryModel) => {
            setSelectedCategory(category);
            setIsEditCategoryModalOpen(true);
        },
        []
    );

    const closeEditCategoryModal = useCallback(() => {
        setIsEditCategoryModalOpen(false);
    }, [])

    const openPlantModal = useCallback((category: string, categoryPlants: PlantModel[]) => {
        setIsSelectedCategory(category);
        setSelectedCategoryPlants(categoryPlants);
        setIsCategoryPlantsModalOpen(true);
    }, [])

    const closePlantModal = useCallback(() => {
        setIsSelectedCategory(null);
        setIsCategoryPlantsModalOpen(false);
    }, [])


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

    const filteredCategories = useMemo(() => {
        return categories.filter((category) =>
            category.label
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    }, [categories, search])

    const updateCategory = useCallback(
        async (id: string, label: string): Promise<void> => {
            try {
                setIsUpdating(true);
                setError(null);

                await updatePlantCategory(id, label);

                setCategories((current) =>
                    current.map((category) =>
                        category.id === id
                            ? { ...category, label }
                            : category
                    )
                );

                closeEditCategoryModal();

            } catch (error) {
                console.error(
                    "Failed to update a category"
                );

                setError(error instanceof Error ? error.message : "Unable to update a category");
            } finally {
                setIsUpdating(false);
            }
        }, [closeEditCategoryModal]
    )


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


    const deleteCategory = useCallback(
        async (id: string): Promise<void> => {
            try {
                setIsDeleting(true);
                setError(null);

                await deletePlantCategory(id);

                setCategories(current =>
                    current.filter(category => category.id !== id)
                );

            } catch (error) {
                console.error(
                    "Failed to delete the category",
                    error
                );

                setError(error instanceof Error ? error.message : "Unable to delete the category");

                throw error;
            } finally {
                setIsDeleting(false);
            }

        }, []
    )

    const handleDeleteCategoryClick = (category: CategoryModel) => {
        openConfirmation({
            title: "Delete Category?",
            description: `Are you sure you want to delete ${category.label}?`,
            confirmText: "Delete Category",
            onConfirm: () => deleteCategory(category.id)
        })
    }

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
        selectedCategoryPlants,
        isEditCategoryModalOpen,
        selectedCategory,

        loading,
        isCreating,
        isUpdating,
        isDeleting,
        error,
        search,

        setLoading,
        setError,
        setSearch,
        setCategories,
        setCategoriesCount,
        setCategoryPlantCountsById,
        setIsCategoryPlantsModalOpen,
        setIsSelectedCategory,
        setSelectedCategory,
        setIsCreating,
        setIsNewCategoryModalOpen,
        setSelectedCategoryPlants,
        setIsUpdating,
        setIsEditCategoryModalOpen,

        fetchCategories,
        fetchCategoriesCount,
        fetchPlantsByCategory,
        filteredCategories,
        createNewCategory,
        updateCategory,
        openPlantModal,
        closePlantModal,
        openNewCategoryModal,
        closeNewCategoryModal,
        openEditCategoryModal,
        closeEditCategoryModal,
        handleDeleteCategoryClick,
        deleteCategory,
        isNewCategoryModalOpen,
    };
}