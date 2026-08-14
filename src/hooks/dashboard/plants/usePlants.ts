import { useCallback, useEffect, useMemo, useState } from "react";

import {
    addPlant,
    deletePlant,
    getPlantById,
    getPlants,
    updatePlant,
} from "@service/dashboard/plantsSection/plants.service";

import type { PlantModel } from "@model/dashboard/plants.model";

type PlantFilter = "all" | "verified" | "unverified";

interface UsePlantsReturn {
    plants: PlantModel[];
    filteredPlants: PlantModel[];

    search: string;
    filter: PlantFilter;

    setSearch: (value: string) => void;
    setFilter: (value: PlantFilter) => void;

    loading: boolean;
    error: string | null;

    fetchPlants: () => Promise<void>;

    fetchPlantById: (
        id: string
    ) => Promise<PlantModel | null>;

    createPlant: (
        plant: Omit<PlantModel, "id">
    ) => Promise<PlantModel>;

    editPlant: (
        id: string,
        plant: Partial<Omit<PlantModel, "id">>
    ) => Promise<void>;

    removePlant: (id: string) => Promise<void>;
}

export function usePlants(): UsePlantsReturn {
    const [plants, setPlants] = useState<PlantModel[]>([]);

    const [search, setSearch] = useState("");

    const [filter, setFilter] =
        useState<PlantFilter>("all");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    /**
     * Fetch all plants.
     */
    const fetchPlants = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getPlants();

            setPlants(data);
        } catch (error) {
            console.error(
                "Failed to fetch plants:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to load plants."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Filter plants based on search and verification status.
     */
    const filteredPlants = useMemo(() => {
        const searchTerm = search
            .toLowerCase()
            .trim();

        return plants.filter((plant) => {
            const matchesSearch =
                !searchTerm ||
                plant.commonName
                    ?.toLowerCase()
                    .includes(searchTerm) ||
                plant.scientificName
                    ?.toLowerCase()
                    .includes(searchTerm);

            const matchesFilter =
                filter === "all" ||
                (filter === "verified" &&
                    plant.verified === true) ||
                (filter === "unverified" &&
                    plant.verified === false);

            return (
                matchesSearch &&
                matchesFilter
            );
        });
    }, [plants, search, filter]);

    /**
     * Fetch a single plant.
     */
    const fetchPlantById = useCallback(
        async (id: string) => {
            try {
                setError(null);

                return await getPlantById(id);
            } catch (error) {
                console.error(
                    "Failed to fetch plant:",
                    error
                );

                setError(
                    error instanceof Error
                        ? error.message
                        : "Unable to load plant."
                );

                return null;
            }
        },
        []
    );

    /**
     * Create a plant.
     */
    const createPlant = useCallback(
        async (
            plant: Omit<PlantModel, "id">
        ) => {
            try {
                setError(null);

                const newPlant =
                    await addPlant(plant);

                setPlants((current) => [
                    ...current,
                    newPlant,
                ]);

                return newPlant;
            } catch (error) {
                console.error(
                    "Failed to create plant:",
                    error
                );

                setError(
                    error instanceof Error
                        ? error.message
                        : "Unable to add plant."
                );

                throw error;
            }
        },
        []
    );

    /**
     * Update a plant.
     */
    const editPlant = useCallback(
        async (
            id: string,
            plant: Partial<Omit<PlantModel, "id">>
        ) => {
            try {
                setError(null);

                await updatePlant(id, plant);

                setPlants((current) =>
                    current.map((item) =>
                        item.id === id
                            ? {
                                ...item,
                                ...plant,
                            }
                            : item
                    )
                );
            } catch (error) {
                console.error(
                    "Failed to update plant:",
                    error
                );

                setError(
                    error instanceof Error
                        ? error.message
                        : "Unable to update plant."
                );

                throw error;
            }
        },
        []
    );

    /**
     * Delete a plant.
     */
    const removePlant = useCallback(
        async (id: string) => {
            try {
                setError(null);

                await deletePlant(id);

                setPlants((current) =>
                    current.filter(
                        (plant) =>
                            plant.id !== id
                    )
                );
            } catch (error) {
                console.error(
                    "Failed to delete plant:",
                    error
                );

                setError(
                    error instanceof Error
                        ? error.message
                        : "Unable to delete plant."
                );

                throw error;
            }
        },
        []
    );

    /**
     * Fetch plants when the hook mounts.
     */
    useEffect(() => {
        fetchPlants();
    }, [fetchPlants]);

    return {
        plants,
        filteredPlants,

        search,
        filter,

        setSearch,
        setFilter,

        loading,
        error,

        fetchPlants,
        fetchPlantById,

        createPlant,
        editPlant,
        removePlant,
    };
}