import type { ConfirmationState } from "@type/globalized/confirmation.type";

type ConfirmationModalProps = ConfirmationState & {
    onCancel: () => void;
};

export function ConfirmationModal({
    isOpen,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isLoading,
    onConfirm,
    onCancel,
}: ConfirmationModalProps) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                        {description}
                    </p>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? "Deleting..." : confirmText}
                    </button>
                </div>

            </div>
        </div>
    );
}