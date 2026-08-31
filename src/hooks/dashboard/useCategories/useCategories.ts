import type { CategoryModel } from "@model/dashboard/categories.model";
import { getCategories } from "@service/dashboard/categorySection/category.service";
import type { UseCategoriesReturn } from "@type/dashboard/categoties.type";
import { useCallback, useEffect, useState } from "react";

export function useCategories(): UseCategoriesReturn {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState<CategoryModel[]>([]);

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

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);



    return {
        loading,
        setLoading,
        error,
        setError,
        categories,
        setCategories,
        fetchCategories,
    }
}