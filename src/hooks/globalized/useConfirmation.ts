import { useContext } from "react";
import { ConfirmationContext } from "@context/confirmation.context";

export function useConfirmation() {
    const context = useContext(ConfirmationContext);

    if (!context) {
        throw new Error(
            "useConfirmation must be used inside Confirmation Provider"
        );
    }

    return context;
}