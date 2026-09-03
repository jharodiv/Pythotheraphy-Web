export type ConfirmationOption = {
    title: string;
    description: string;
    confirmText: string;
    cancelText?: string;
    onConfirm: () => void | Promise<void>;
}

export type ConfirmationState = {
    isOpen: boolean;
    isLoading: boolean;
} & ConfirmationOption