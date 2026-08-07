import { cn } from "@utils/cn";

import type { ButtonProps } from "./button.types";

const variants = {
    primary:
        "bg-green-700 hover:bg-green-800 text-white",

    secondary:
        "bg-gray-200 hover:bg-gray-300 text-gray-900",

    danger:
        "bg-red-600 hover:bg-red-700 text-white",
};

export default function Button({
    children,
    variant = "primary",
    loading = false,
    className,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
                variants[variant],
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}