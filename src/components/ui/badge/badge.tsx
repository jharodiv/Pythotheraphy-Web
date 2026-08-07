import type { HTMLAttributes } from "react";

import { cn } from "@utils/cn";

interface BadgeProps
    extends HTMLAttributes<HTMLSpanElement> {
    variant?: "success" | "warning" | "danger";
}

const variants = {
    success:
        "bg-green-100 text-green-700",

    warning:
        "bg-yellow-100 text-yellow-700",

    danger:
        "bg-red-100 text-red-700",
};

export default function Badge({
    variant = "success",
    className,
    children,
    ...props
}: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex rounded-full px-3 py-1 text-sm font-medium",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}