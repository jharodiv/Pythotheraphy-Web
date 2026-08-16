import {
    Check,
    Pencil,
    RotateCcw,
} from "lucide-react";

import type {
    EditableInputProps,
} from "@type/dashboard/plant.types";

export default function EditableInput({
    label,
    value,
    editing,
    changed,
    onEdit,
    onSave,
    onChange,
    onClear,
}: EditableInputProps) {
    return (
        <div>
            {/* Label */}

            <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium text-[#596257]">
                    {label}
                </label>

                {/* Edit */}

                {!editing && !changed && (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="flex cursor-pointer items-center gap-1 text-xs font-medium text-[#486344]"
                    >
                        <Pencil className="h-3 w-3" />

                        Edit
                    </button>
                )}

                {/* Save */}

                {editing && (
                    <button
                        type="button"
                        onClick={onSave}
                        className="flex cursor-pointer items-center gap-1 rounded-md bg-[#486344] px-2.5 py-1 text-xs font-medium text-white"
                    >
                        <Check className="h-3 w-3" />

                        Save
                    </button>
                )}

                {/* Clear */}

                {!editing && changed && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="flex cursor-pointer items-center gap-1 text-xs font-medium text-[#7b847a] hover:text-[#c65353]"
                    >
                        <RotateCcw className="h-3 w-3" />

                        Clear
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
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${changed
                        ? "border-[#486344] bg-[#edf4eb] text-[#263126]"
                        : editing
                            ? "border-[#aab8a5] bg-white text-[#263126] focus:ring-2 focus:ring-[#edf2ea]"
                            : "cursor-default border-[#e1e5de] bg-[#f7f9f5] text-[#596257]"
                    }`}
            />
        </div>
    );
}