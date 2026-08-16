import type { Dispatch, SetStateAction } from "react";

import type { PlantModel } from "@model/dashboard/plants.model";

export type PlantFilter =
    | "all"
    | "verified"
    | "unverified";

export interface UsePlantsReturn {
    plants: PlantModel[];
    filteredPlants: PlantModel[];

    search: string;
    filter: PlantFilter;

    setSearch: Dispatch<SetStateAction<string>>;
    setFilter: Dispatch<SetStateAction<PlantFilter>>;

    selectedPlant: PlantModel | null;

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

    // UI State
    activePlant: string | null;
    setActivePlant: Dispatch<
        SetStateAction<string | null>
    >;

    editForm: PlantModel | null;
    editModalOpen: boolean;
    saveEditField: (field: keyof PlantModel) => void;
    saving: boolean;

    openEditModal: (plant: PlantModel) => void;
    closeEditModal: () => void;

    editingFields: Set<keyof PlantModel>;

    enableFieldEdit: (
        field: keyof PlantModel
    ) => void;

    updateEditField: <K extends keyof PlantModel>(
        field: K,
        value: PlantModel[K]
    ) => void;

    saveEdit: () => Promise<void>;

}

export interface EditPlantModalProps {
    plant: PlantModel;
    editingFields: Set<keyof PlantModel>;
    saving: boolean;

    onClose: () => void;

    onEditField: (
        field: keyof PlantModel
    ) => void;

    onChangeField: <K extends keyof PlantModel>(
        field: K,
        value: PlantModel[K]
    ) => void;

    onSave: () => Promise<void>;
}

export interface EditableInputProps {
    label: string;
    value: string;
    editing: boolean;
    changed: boolean;

    onEdit: () => void;
    onChange: (value: string) => void;
    onSave: () => void;
    onClear: () => void;
}

export interface EditableTextareaProps {
    label: string;
    value: string;
    editing: boolean;
    changed?: boolean;

    onEdit: () => void;
    onChange: (value: string) => void;
    onSave: () => void;
    onClear: () => void;
    placeholder?: string;
}