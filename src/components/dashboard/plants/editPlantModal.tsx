import { Check, X } from "lucide-react";

import type { PlantModel } from "@model/dashboard/plants.model";

import EditableInput from "@components/dashboard/plants/editableTextInput";
import EditableTextarea from "@components/dashboard/plants/editableTextArea";

import type { EditPlantModalProps } from "@type/dashboard/plant.types";

export default function EditPlantModal({
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
                                    changed={isChanged("commonName")}
                                    onEdit={() => onEditField("commonName")}
                                    onChange={(value) =>
                                        onChangeField("commonName", value)
                                    }
                                    onSave={() => saveFieldEdit("commonName")}
                                    onClear={() => clearFieldEdit("commonName")}
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
                                    onClear={() => {
                                        // Resets
                                    }}
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
                                    onClear={() => {
                                        // Resets
                                    }}
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
                                    onClear={() => {
                                        // Resets
                                    }}
                                />
                            </div>
                        </div>

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
                            onClear={() => {
                                // Resets
                            }}
                        />

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
                            onClear={() => {
                                // Resets
                            }}
                        />

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
                            onClear={() => {
                                // Resets
                            }}
                        />

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
                            onClear={() => {
                                // Resets
                            }}
                        />

                        <EditableTextarea
                            label="Medicinal Properties"
                            value={
                                Array.isArray(
                                    plant.medicinalProperties
                                )
                                    ? plant.medicinalProperties.join(
                                        ", "
                                    )
                                    : ""
                            }
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
                            onClear={() => {
                                // Resets
                            }}
                            placeholder="Separate properties with commas"
                        />

                        <EditableTextarea
                            label="Categories"
                            value={
                                Array.isArray(
                                    plant.categories
                                )
                                    ? plant.categories.join(", ")
                                    : ""
                            }
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
                            onClear={() => {
                                // Resets
                            }}
                            placeholder="Separate categories with commas"
                        />

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
                            onClear={() => {
                                // Resets
                            }}
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
                                        className="flex cursor-pointer items-center gap-1 text-xs font-medium text-[#486344]"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center justify-between rounded-lg border border-[#dfe4dc] bg-[#fafbf9] px-4 py-3">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${plant.verified
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
                                        className="cursor-pointer rounded-lg bg-[#486344] px-3 py-1.5 text-xs font-medium text-white"
                                    >
                                        Change Status
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-[#e8ebe5] bg-[#fafbf9] px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="cursor-pointer rounded-lg border border-[#dfe4dc] bg-white px-4 py-2.5 text-sm font-medium text-[#596257]"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onSave}
                        disabled={saving}
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#486344] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
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