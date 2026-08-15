import { useCallback, useEffect, useMemo, useState } from "react";

import {
    addPlant,
    deletePlant,
    getPlantById,
    getPlants,
    updatePlant,
} from "@service/dashboard/plantsSection/plants.service";

import type { PlantModel } from "@model/dashboard/plants.model";

import type {
    UsePlantsReturn,
    PlantFilter
} from "@type/dashboard/plant.types";

export function usePlants(): UsePlantsReturn {

    const [plants, setPlants] = useState<PlantModel[]>([]);

    const [search, setSearch] = useState("");

    const [filter, setFilter] =
        useState<PlantFilter>("all");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);


    // UI State
    const [activePlant, setActivePlant] =
        useState<string | null>(null);

    const [selectedPlant, setSelectedPlant] =
        useState<PlantModel | null>(null);

    const [editForm, setEditForm] =
        useState<PlantModel | null>(null);

    const [editModalOpen, setEditModalOpen] = useState(false);

    const [editingFields, setEditingFields] = useState<Set<keyof PlantModel>>(new Set());

    const [saving, setSaving] = useState(false);


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

    // Saving the Plant

    const saveEdit = useCallback(async () => {

        if (!editForm || !selectedPlant) {
            return;
        }


        try {
            setSaving(true);



            const {
                id,
                ...plantData
            } = editForm;

            await updatePlant(id, plantData);

            setPlants((current) =>
                current.map((plant) =>
                    plant.id === id
                        ? {
                            ...plant,
                            ...plantData,
                        }
                        : plant
                )
            );

            setEditModalOpen(false);
            setSelectedPlant(null);
            setEditForm(null);
            setEditingFields(new Set());
        } catch (error) {
            console.error(
                "Failed to save Plants",
                error
            )

            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to update plant"
            )

            throw error
        } finally {
            setSaving(false);
        }

    }, [editForm, selectedPlant]);

    // Opening Edit Modal
    const openEditModal = useCallback((plant: PlantModel) => {
        setEditForm({
            ...plant,

            medicinalProperties: Array.isArray(
                plant.medicinalProperties
            )
                ? [...plant.medicinalProperties]
                : [],

            categories: Array.isArray(plant.categories)
                ? [...plant.categories]
                : [],
        });

        setEditingFields(new Set());
        setEditModalOpen(true);
    }, []);

    // Closing Edit Modal

    const closeEditModal = useCallback(() => {
        if (saving) return;

        setEditModalOpen(false);
        setSelectedPlant(null);
        setEditForm(null);
        setEditingFields(new Set());
    }, [saving]);

    //Enabling Field Edits

    const enableFieldEdit = useCallback(
        (field: keyof PlantModel) => {
            setEditingFields((current) => {
                const updated = new Set(current);

                updated.add(field);

                return updated;
            });
        }, []
    );

    // Updating Edit Fields:

    const updateEditField = useCallback(
        <K extends keyof PlantModel>(
            field: K,
            value: PlantModel[K]
        ) => {
            setEditForm((current) => {
                if (!current) {
                    return current;
                }

                return {
                    ...current,
                    [field]: value,
                };
            });
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

        // Plant row UI state
        activePlant,
        setActivePlant,

        // Edit modal
        selectedPlant,
        editForm,
        editModalOpen,
        saving,

        // Edit modal actions
        openEditModal,
        closeEditModal,
        editingFields,
        enableFieldEdit,
        updateEditField,
        saveEdit,
    };
}