import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    addPlant,
    deletePlant,
    getPlantById,
    getPlants,
    updatePlant,
} from "@service/dashboard/plantsSection/plants.service";

import type { PlantModel } from "@model/dashboard/plants.model";

import type {
    PlantFilter,
    UsePlantsReturn,
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

    const [editModalOpen, setEditModalOpen] =
        useState(false);

    // Fields currently being edited
    const [editingFields, setEditingFields] =
        useState<Set<keyof PlantModel>>(new Set());

    // Fields that contain unsaved changes
    const [changedFields, setChangedFields] =
        useState<Set<keyof PlantModel>>(new Set());

    // Original plant before editing
    const [originalPlant, setOriginalPlant] =
        useState<PlantModel | null>(null);

    const [saving, setSaving] =
        useState(false);

    // Fetch Plants

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

    // Filter Plants

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

    // Fetch Single Plant

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

    // Create Plant

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

    // Update Plant

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

    // Delete Plant

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

    // Open Edit Modal

    const openEditModal = useCallback(
        (plant: PlantModel) => {
            const clonedPlant: PlantModel = {
                ...plant,

                medicinalProperties:
                    Array.isArray(
                        plant.medicinalProperties
                    )
                        ? [
                            ...plant.medicinalProperties,
                        ]
                        : [],

                categories:
                    Array.isArray(
                        plant.categories
                    )
                        ? [...plant.categories]
                        : [],
            };

            // Keep a copy of the original data
            // so fields can be reverted later.
            setOriginalPlant(clonedPlant);

            // Create the editable form
            setEditForm({
                ...clonedPlant,

                medicinalProperties: [
                    ...clonedPlant.medicinalProperties,
                ],

                categories: [
                    ...clonedPlant.categories,
                ],
            });

            // Reset field states
            setEditingFields(new Set());
            setChangedFields(new Set());

            setSelectedPlant(clonedPlant);

            setEditModalOpen(true);
        },
        []
    );

    // Close Edit Modal

    const closeEditModal = useCallback(() => {
        if (saving) {
            return;
        }

        setEditModalOpen(false);

        setSelectedPlant(null);

        setEditForm(null);

        setOriginalPlant(null);

        setEditingFields(new Set());

        setChangedFields(new Set());
    }, [saving]);

    // Enable Field Editing

    const enableFieldEdit = useCallback(
        (field: keyof PlantModel) => {
            setEditingFields((current) => {
                const next = new Set(current);

                next.add(field);

                return next;
            });
        },
        []
    );

    // Update Edit Field

    const updateEditField = useCallback(
        <K extends keyof PlantModel>(
            field: K,
            value: PlantModel[K]
        ) => {
            // Update form
            setEditForm((current) => {
                if (!current) {
                    return current;
                }

                return {
                    ...current,
                    [field]: value,
                };
            });

            if (!originalPlant) {
                return;
            }

            // Check whether the field actually changed
            setChangedFields((current) => {
                const next = new Set(current);

                const originalValue =
                    originalPlant[field];

                const hasChanged =
                    JSON.stringify(
                        originalValue
                    ) !==
                    JSON.stringify(value);

                if (hasChanged) {
                    next.add(field);
                } else {
                    next.delete(field);
                }

                return next;
            });
        },
        [originalPlant]
    );

    // Save Individual Field Edit

    const saveEditField = useCallback(
        (field: keyof PlantModel) => {
            // The field is no longer being edited.
            //
            // IMPORTANT:
            // This does NOT save to Firestore.
            // It only finishes editing this field.
            setEditingFields((current) => {
                const next = new Set(current);

                next.delete(field);

                return next;
            });
        },
        []
    );

    // Clear Individual Field Edit

    const clearFieldEdit = useCallback(
        (field: keyof PlantModel) => {
            if (!originalPlant) {
                return;
            }

            // Restore the original value
            setEditForm((current) => {
                if (!current) {
                    return current;
                }

                return {
                    ...current,
                    [field]: originalPlant[field],
                };
            });

            // Remove the field from changed fields
            setChangedFields((current) => {
                const next = new Set(current);

                next.delete(field);

                return next;
            });
        },
        [originalPlant]
    );

    // Save All Plant Changes

    const saveEdit = useCallback(async () => {
        if (!editForm) {
            return;
        }

        try {
            setSaving(true);
            setError(null);

            const {
                id,
                ...plantData
            } = editForm;

            await updatePlant(id, plantData);

            // Update local list
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

            // Close modal
            setEditModalOpen(false);

            setSelectedPlant(null);

            setEditForm(null);

            setOriginalPlant(null);

            setEditingFields(new Set());

            setChangedFields(new Set());
        } catch (error) {
            console.error(
                "Failed to save plant:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to update plant."
            );

            throw error;
        } finally {
            setSaving(false);
        }
    }, [editForm]);

    // Fetch on Mount

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

        // Row UI
        activePlant,
        setActivePlant,

        // Edit modal
        selectedPlant,
        editForm,
        editModalOpen,
        saving,

        openEditModal,
        closeEditModal,

        // Field editing
        editingFields,
        changedFields,

        enableFieldEdit,
        updateEditField,

        saveEditField,
        clearFieldEdit,

        // Save entire plant
        saveEdit,
    };
}