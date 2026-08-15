import {
    Check,
    Leaf,
    Pencil,
    Search,
    SlidersHorizontal,
    Trash2,
    X,
} from "lucide-react";

import { useState } from "react";

import { usePlants } from "@hooks/dashboard/plants/usePlants";

import type { PlantModel } from "@model/dashboard/plants.model";

export default function Plants() {
    const [filterOpen, setFilterOpen] = useState(false);

    const {
        filteredPlants,

        search,
        filter,

        setSearch,
        setFilter,

        loading,
        error,

        activePlant,
        setActivePlant,

        editForm,
        editModalOpen,
        saving,

        openEditModal,
        closeEditModal,

        editingFields,
        enableFieldEdit,
        updateEditField,

        saveEdit,
        removePlant,
    } = usePlants();

    const filterLabel = {
        all: "All Plants",
        verified: "Verified",
        unverified: "Unverified",
    };

    return (
        <div className="space-y-6">
            {/* ================================================================ */}
            {/* Header                                                           */}
            {/* ================================================================ */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-[#263126]">
                        Plant Management
                    </h3>

                    <p className="mt-1 text-sm text-[#7b847a]">
                        View and manage plants in the database.
                    </p>
                </div>

                <button
                    type="button"
                    className="cursor-pointer rounded-lg bg-[#486344] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3d5739]"
                >
                    Add Plant
                </button>
            </div>

            {/* ================================================================ */}
            {/* Plants Card                                                      */}
            {/* ================================================================ */}

            <div className="rounded-xl border border-[#e1e5de] bg-white shadow-sm">
                {/* Search and Filter */}

                <div className="relative z-30 border-b border-[#e8ebe5] p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        {/* Search */}

                        <div className="relative max-w-sm flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#929a91]" />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search plants..."
                                className="w-full rounded-lg border border-[#dfe4dc] py-2.5 pl-9 pr-3 text-sm text-black outline-none focus:border-[#aab8a5] focus:ring-2 focus:ring-[#edf2ea]"
                            />
                        </div>

                        {/* Filter */}

                        <div className="relative z-40">
                            <button
                                type="button"
                                onClick={() =>
                                    setFilterOpen(!filterOpen)
                                }
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#dfe4dc] bg-white px-4 py-2.5 text-sm font-medium text-[#596257] transition hover:bg-[#f7f9f5] sm:w-auto"
                            >
                                <SlidersHorizontal className="h-4 w-4" />

                                {filterLabel[filter]}
                            </button>

                            {filterOpen && (
                                <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border border-[#e1e5de] bg-white shadow-lg">
                                    {/* All */}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFilter("all");
                                            setFilterOpen(false);
                                        }}
                                        className={`w-full cursor-pointer px-4 py-2.5 text-left text-sm transition hover:bg-[#f7f9f5] ${
                                            filter === "all"
                                                ? "bg-[#f1f5ef] font-medium text-[#486344]"
                                                : "text-[#596257]"
                                        }`}
                                    >
                                        All Plants
                                    </button>

                                    {/* Verified */}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFilter("verified");
                                            setFilterOpen(false);
                                        }}
                                        className={`w-full cursor-pointer px-4 py-2.5 text-left text-sm transition hover:bg-[#f7f9f5] ${
                                            filter === "verified"
                                                ? "bg-[#f1f5ef] font-medium text-[#486344]"
                                                : "text-[#596257]"
                                        }`}
                                    >
                                        Verified
                                    </button>

                                    {/* Unverified */}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFilter("unverified");
                                            setFilterOpen(false);
                                        }}
                                        className={`w-full cursor-pointer px-4 py-2.5 text-left text-sm transition hover:bg-[#f7f9f5] ${
                                            filter === "unverified"
                                                ? "bg-[#f1f5ef] font-medium text-[#486344]"
                                                : "text-[#596257]"
                                        }`}
                                    >
                                        Unverified
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ============================================================ */}
                {/* Loading                                                        */}
                {/* ============================================================ */}

                {loading && (
                    <div className="flex min-h-64 items-center justify-center">
                        <p className="text-sm text-[#7b847a]">
                            Loading plants...
                        </p>
                    </div>
                )}

                {/* ============================================================ */}
                {/* Error                                                          */}
                {/* ============================================================ */}

                {!loading && error && (
                    <div className="flex min-h-64 items-center justify-center text-center">
                        <div>
                            <p className="text-sm font-medium text-red-600">
                                Failed to load plants
                            </p>

                            <p className="mt-1 text-xs text-[#929a91]">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* ============================================================ */}
                {/* Empty State                                                    */}
                {/* ============================================================ */}

                {!loading &&
                    !error &&
                    filteredPlants.length === 0 && (
                        <div className="flex min-h-64 flex-col items-center justify-center text-center">
                            <Leaf className="h-10 w-10 text-[#b3c0ae]" />

                            <p className="mt-3 text-sm font-medium text-[#596257]">
                                No plants to display
                            </p>

                            <p className="mt-1 text-xs text-[#929a91]">
                                {search
                                    ? "Try adjusting your search."
                                    : "Plant data will be connected later."}
                            </p>
                        </div>
                    )}

                {/* ============================================================ */}
                {/* Plant List                                                     */}
                {/* ============================================================ */}

                {!loading &&
                    !error &&
                    filteredPlants.length > 0 && (
                        <div className="divide-y divide-[#e8ebe5]">
                            {filteredPlants.map((plant) => {
                                const isActive =
                                    activePlant === plant.id;

                                return (
                                    <div
                                        key={plant.id}
                                        className="relative overflow-hidden"
                                    >
                                        {/* Hidden Actions */}

                                        <div className="absolute inset-y-0 right-0 flex w-40">
                                            {/* Edit */}

                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();

                                                    openEditModal(plant);
                                                }}
                                                className="flex h-full w-20 cursor-pointer items-center justify-center gap-1.5 bg-[#486344] text-white transition hover:bg-[#3d5739]"
                                            >
                                                <Pencil className="h-4 w-4" />

                                                <span className="text-xs font-medium">
                                                    Edit
                                                </span>
                                            </button>

                                            {/* Delete */}

                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();

                                                    removePlant(plant.id);
                                                }}
                                                className="flex h-full w-20 cursor-pointer items-center justify-center gap-1.5 bg-[#c65353] text-white transition hover:bg-[#b74747]"
                                            >
                                                <Trash2 className="h-4 w-4" />

                                                <span className="text-xs font-medium">
                                                    Delete
                                                </span>
                                            </button>
                                        </div>

                                        {/* Plant Row */}

                                        <div
                                            role="button"
                                            tabIndex={0}
                                            onClick={() =>
                                                setActivePlant(
                                                    isActive
                                                        ? null
                                                        : plant.id
                                                )
                                            }
                                            onKeyDown={(event) => {
                                                if (
                                                    event.key === "Enter" ||
                                                    event.key === " "
                                                ) {
                                                    setActivePlant(
                                                        isActive
                                                            ? null
                                                            : plant.id
                                                    );
                                                }
                                            }}
                                            className={`relative flex cursor-pointer items-center justify-between bg-white p-4 transition-transform duration-300 ease-in-out hover:bg-[#fafbf9] ${
                                                isActive
                                                    ? "-translate-x-40"
                                                    : "translate-x-0"
                                            }`}
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-[#263126]">
                                                    {plant.commonName}
                                                </p>

                                                <p className="mt-1 text-xs italic text-[#7b847a]">
                                                    {plant.scientificName}
                                                </p>
                                            </div>

                                            <span
                                                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                                                    plant.verified
                                                        ? "bg-[#edf4eb] text-[#486344]"
                                                        : "bg-[#f3f3f0] text-[#7b847a]"
                                                }`}
                                            >
                                                {plant.verified
                                                    ? "Verified"
                                                    : "Unverified"}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
            </div>

            {/* ================================================================ */}
            {/* Edit Modal                                                        */}
            {/* ================================================================ */}

            {editModalOpen && editForm && (
                <EditPlantModal
                    plant={editForm}
                    editingFields={editingFields}
                    saving={saving}
                    onClose={closeEditModal}
                    onEditField={enableFieldEdit}
                    onChangeField={updateEditField}
                    onSave={saveEdit}
                />
            )}
        </div>
    );
}

/* ========================================================================== */
/* Edit Plant Modal                                                           */
/* ========================================================================== */

interface EditPlantModalProps {
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

function EditPlantModal({
    plant,
    editingFields,
    saving,
    onClose,
    onEditField,
    onChangeField,
    onSave,
}: EditPlantModalProps) {
    const isEditing = (
        field: keyof PlantModel
    ) => editingFields.has(field);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            <div
                className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                {/* Header */}

                <div className="flex items-center justify-between border-b border-[#e8ebe5] px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-[#263126]">
                            Edit Plant
                        </h2>

                        <p className="mt-1 text-sm text-[#7b847a]">
                            Update plant information.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="cursor-pointer rounded-lg p-2 text-[#7b847a] transition hover:bg-[#f4f6f2] hover:text-[#263126] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}

                <div className="overflow-y-auto px-6 py-6">
                    <div className="space-y-6">
                        {/* Basic Information */}

                        <div>
                            <h3 className="text-sm font-semibold text-[#486344]">
                                Basic Information
                            </h3>

                            <div className="mt-4 grid gap-5 sm:grid-cols-2">
                                <EditableInput
                                    label="Common Name"
                                    value={plant.commonName}
                                    editing={isEditing("commonName")}
                                    onEdit={() =>
                                        onEditField("commonName")
                                    }
                                    onChange={(value) =>
                                        onChangeField(
                                            "commonName",
                                            value
                                        )
                                    }
                                />

                                <EditableInput
                                    label="Scientific Name"
                                    value={plant.scientificName}
                                    editing={isEditing(
                                        "scientificName"
                                    )}
                                    onEdit={() =>
                                        onEditField(
                                            "scientificName"
                                        )
                                    }
                                    onChange={(value) =>
                                        onChangeField(
                                            "scientificName",
                                            value
                                        )
                                    }
                                />

                                <EditableInput
                                    label="Family"
                                    value={plant.family}
                                    editing={isEditing("family")}
                                    onEdit={() =>
                                        onEditField("family")
                                    }
                                    onChange={(value) =>
                                        onChangeField(
                                            "family",
                                            value
                                        )
                                    }
                                />

                                <EditableInput
                                    label="Origin"
                                    value={plant.origin}
                                    editing={isEditing("origin")}
                                    onEdit={() =>
                                        onEditField("origin")
                                    }
                                    onChange={(value) =>
                                        onChangeField(
                                            "origin",
                                            value
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* Description */}

                        <EditableTextarea
                            label="Description"
                            value={plant.description}
                            editing={isEditing("description")}
                            onEdit={() =>
                                onEditField("description")
                            }
                            onChange={(value) =>
                                onChangeField(
                                    "description",
                                    value
                                )
                            }
                        />

                        {/* Uses */}

                        <EditableTextarea
                            label="Uses"
                            value={plant.uses}
                            editing={isEditing("uses")}
                            onEdit={() =>
                                onEditField("uses")
                            }
                            onChange={(value) =>
                                onChangeField(
                                    "uses",
                                    value
                                )
                            }
                        />

                        {/* Preparation */}

                        <EditableTextarea
                            label="Preparation Method"
                            value={plant.preparation_method}
                            editing={isEditing(
                                "preparation_method"
                            )}
                            onEdit={() =>
                                onEditField(
                                    "preparation_method"
                                )
                            }
                            onChange={(value) =>
                                onChangeField(
                                    "preparation_method",
                                    value
                                )
                            }
                        />

                        {/* Side Effects */}

                        <EditableTextarea
                            label="Side Effects"
                            value={plant.side_effect}
                            editing={isEditing("side_effect")}
                            onEdit={() =>
                                onEditField("side_effect")
                            }
                            onChange={(value) =>
                                onChangeField(
                                    "side_effect",
                                    value
                                )
                            }
                        />

                        {/* Medicinal Properties */}

                        <EditableTextarea
                            label="Medicinal Properties"
                            value={Array.isArray(
                                plant.medicinalProperties
                            )
                                ? plant.medicinalProperties.join(
                                      ", "
                                  )
                                : ""}
                            editing={isEditing(
                                "medicinalProperties"
                            )}
                            onEdit={() =>
                                onEditField(
                                    "medicinalProperties"
                                )
                            }
                            onChange={(value) =>
                                onChangeField(
                                    "medicinalProperties",
                                    value
                                        .split(",")
                                        .map((item) =>
                                            item.trim()
                                        )
                                        .filter(Boolean)
                                )
                            }
                            placeholder="Separate properties with commas"
                        />

                        {/* Categories */}

                        <EditableTextarea
                            label="Categories"
                            value={Array.isArray(
                                plant.categories
                            )
                                ? plant.categories.join(", ")
                                : ""}
                            editing={isEditing("categories")}
                            onEdit={() =>
                                onEditField("categories")
                            }
                            onChange={(value) =>
                                onChangeField(
                                    "categories",
                                    value
                                        .split(",")
                                        .map((item) =>
                                            item.trim()
                                        )
                                        .filter(Boolean)
                                )
                            }
                            placeholder="Separate categories with commas"
                        />

                        {/* Image URL */}

                        <EditableInput
                            label="Image URL"
                            value={plant.imageUrl}
                            editing={isEditing("imageUrl")}
                            onEdit={() =>
                                onEditField("imageUrl")
                            }
                            onChange={(value) =>
                                onChangeField(
                                    "imageUrl",
                                    value
                                )
                            }
                        />

                        {/* Verification */}

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label className="text-xs font-medium text-[#596257]">
                                    Verification Status
                                </label>

                                {!isEditing("verified") && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onEditField("verified")
                                        }
                                        className="flex cursor-pointer items-center gap-1 text-xs font-medium text-[#486344] transition hover:text-[#3d5739]"
                                    >
                                        <Pencil className="h-3 w-3" />
                                        Edit
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center justify-between rounded-lg border border-[#dfe4dc] bg-[#fafbf9] px-4 py-3">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                        plant.verified
                                            ? "bg-[#edf4eb] text-[#486344]"
                                            : "bg-[#f3f3f0] text-[#7b847a]"
                                    }`}
                                >
                                    {plant.verified
                                        ? "Verified"
                                        : "Unverified"}
                                </span>

                                {isEditing("verified") && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onChangeField(
                                                "verified",
                                                !plant.verified
                                            )
                                        }
                                        className="cursor-pointer rounded-lg bg-[#486344] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#3d5739]"
                                    >
                                        Change Status
                                    </button>
                                )}
                            </div>

                            {isEditing("verified") && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        onEditField("verified")
                                    }
                                    className="mt-2 flex cursor-pointer items-center gap-1 text-xs font-medium text-[#486344] hover:text-[#3d5739]"
                                >
                                    <Check className="h-3 w-3" />
                                    Save Status
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}

                <div className="flex items-center justify-end gap-3 border-t border-[#e8ebe5] bg-[#fafbf9] px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="cursor-pointer rounded-lg border border-[#dfe4dc] bg-white px-4 py-2.5 text-sm font-medium text-[#596257] transition hover:bg-[#f5f7f3] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onSave}
                        disabled={saving}
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#486344] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#3d5739] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {saving ? (
                            "Saving..."
                        ) : (
                            <>
                                <Check className="h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ========================================================================== */
/* Editable Input                                                             */
/* ========================================================================== */

interface EditableInputProps {
    label: string;
    value: string;
    editing: boolean;
    onEdit: () => void;
    onChange: (value: string) => void;
}

function EditableInput({
    label,
    value,
    editing,
    onEdit,
    onChange,
}: EditableInputProps) {
    return (
        <div>
            {/* Label */}

            <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium text-[#596257]">
                    {label}
                </label>

                {/* Edit */}

                {!editing && (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="flex cursor-pointer items-center gap-1 text-xs font-medium text-[#486344] transition hover:text-[#3d5739]"
                    >
                        <Pencil className="h-3 w-3" />

                        Edit
                    </button>
                )}

                {/* Temporary Save */}

                {editing && (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="flex cursor-pointer items-center gap-1 rounded-md bg-[#486344] px-2.5 py-1 text-xs font-medium text-white transition hover:bg-[#3d5739]"
                    >
                        <Check className="h-3 w-3" />

                        Save
                    </button>
                )}
            </div>

            {/* Input */}

            <input
                type="text"
                value={value}
                readOnly={!editing}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
                    editing
                        ? "border-[#aab8a5] bg-white text-[#263126] focus:ring-2 focus:ring-[#edf2ea]"
                        : "cursor-default border-[#e1e5de] bg-[#f7f9f5] text-[#596257]"
                }`}
            />
        </div>
    );
}

/* ========================================================================== */
/* Editable Textarea                                                          */
/* ========================================================================== */

interface EditableTextareaProps {
    label: string;
    value: string;
    editing: boolean;
    onEdit: () => void;
    onChange: (value: string) => void;
    placeholder?: string;
}

function EditableTextarea({
    label,
    value,
    editing,
    onEdit,
    onChange,
    placeholder,
}: EditableTextareaProps) {
    return (
        <div>
            {/* Label */}

            <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium text-[#596257]">
                    {label}
                </label>

                {/* Edit */}

                {!editing && (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="flex cursor-pointer items-center gap-1 text-xs font-medium text-[#486344] transition hover:text-[#3d5739]"
                    >
                        <Pencil className="h-3 w-3" />

                        Edit
                    </button>
                )}

                {/* Temporary Save */}

                {editing && (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="flex cursor-pointer items-center gap-1 rounded-md bg-[#486344] px-2.5 py-1 text-xs font-medium text-white transition hover:bg-[#3d5739]"
                    >
                        <Check className="h-3 w-3" />

                        Save
                    </button>
                )}
            </div>

            {/* Textarea */}

            <textarea
                value={value}
                readOnly={!editing}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder={placeholder}
                rows={4}
                className={`w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
                    editing
                        ? "border-[#aab8a5] bg-white text-[#263126] focus:ring-2 focus:ring-[#edf2ea]"
                        : "cursor-default border-[#e1e5de] bg-[#f7f9f5] text-[#596257]"
                }`}
            />
        </div>
    );
}