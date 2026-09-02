import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { EditCategoryModalProps } from "@type/dashboard/categoties.type";

export default function EditCategoryModal({
    isOpen,
    onClose,
    onEdit,
    isEditing,
    category,
}: EditCategoryModalProps) {

    const [label, setLabel] = useState("");

    useEffect(() => {
        if (isOpen) {
            setLabel(category.label);
        }
    }, [isOpen, category]);

    if (!isOpen) {
        return null;
    }

    const handleEdit = async () => {
        if (!label.trim()) {
            return;
        }

        await onEdit(
            category.id,
            label.trim());

        setLabel("");
        onClose();
    };

    const handleClose = () => {
        setLabel("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#e1e5de] px-5 py-4">

                    <div>
                        <h2 className="text-lg font-semibold text-[#263126]">
                            Edit Category
                        </h2>

                        <p className="mt-1 text-sm text-[#929a91]">
                            Update the plant category name.
                        </p>
                    </div>

                    <button
                        onClick={handleClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#929a91] transition hover:bg-[#f0f4ed] hover:text-[#486344]"
                    >
                        <X className="h-5 w-5" />
                    </button>

                </div>

                {/* Form */}
                <div className="p-5">

                    <label
                        htmlFor="category-label"
                        className="mb-2 block text-sm font-medium text-[#263126]"
                    >
                        Category Name
                    </label>

                    <input
                        id="category-label"
                        type="text"
                        value={label}
                        onChange={(event) =>
                            setLabel(event.target.value)
                        }
                        placeholder="e.g. Skin Care"
                        className="w-full rounded-lg border border-[#e1e5de] bg-white px-3 py-2.5 text-sm text-[#263126] outline-none transition placeholder:text-[#929a91] focus:border-[#486344] focus:ring-2 focus:ring-[#486344]/10"
                    />

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-[#e1e5de] px-5 py-4">

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isEditing}
                        className="rounded-lg border border-[#e1e5de] px-4 py-2.5 text-sm font-medium text-[#263126] transition hover:bg-[#f5f7f3] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleEdit}
                        disabled={
                            isEditing ||
                            !label.trim()
                        }
                        className="rounded-lg bg-[#486344] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3d5739] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isEditing
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                </div>

            </div>

        </div>
    );
}
