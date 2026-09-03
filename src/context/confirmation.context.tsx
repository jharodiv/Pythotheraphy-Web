import {
    createContext,
    useCallback,
    useState,
    type ReactNode
} from "react";

import type {
    ConfirmationOption,
    ConfirmationState
} from "@type/globalized/confirmation.type";

import { ConfirmationModal } from "@components/ui/modal/confirmationModal";

type ConfirmationContextType = {
    confirmation: ConfirmationState;
    openConfirmation: (option: ConfirmationOption) => void;
    closeConfirmation: () => void;
};

export const ConfirmationContext =
    createContext<ConfirmationContextType | null>(null);


export function ConfirmationProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [confirmation, setConfirmation] = useState<ConfirmationState>({
        isOpen: false,
        isLoading: false,
        title: "",
        description: "",
        confirmText: "Confirm",
        cancelText: "Cancel",
        onConfirm: () => { }
    });

    const openConfirmation = useCallback((options: ConfirmationOption) => {
        setConfirmation({
            ...options,
            isOpen: true,
            isLoading: false
        });
    }, []);

    const closeConfirmation = useCallback(() => {
        setConfirmation((previous) => ({
            ...previous,
            isOpen: false,
        }));
    }, []);


    const handleConfirm = useCallback(async () => {
        if (confirmation.isLoading) {
            return;
        }

        try {
            setConfirmation((previous) => ({
                ...previous,
                isLoading: true,
            }));

            await confirmation.onConfirm();

            setConfirmation((previous) => ({
                ...previous,
                isOpen: false,
                isLoading: false,
            }));

        } catch (error) {
            console.error(
                "Confirmation action failed:",
                error
            );

            setConfirmation((previous) => ({
                ...previous,
                isLoading: false,
            }));
        }
    }, [confirmation]);


    return (
        <ConfirmationContext.Provider
            value={{
                confirmation,
                openConfirmation,
                closeConfirmation
            }}
        > {children}

            <ConfirmationModal
                {...confirmation}
                onConfirm={handleConfirm}
                onCancel={closeConfirmation}
            />

        </ConfirmationContext.Provider>
    )
}

