import { cn } from "@utils/cn";

import type { InputProps } from "@components/ui/input/input.types";

export default function Input({
    label,
    error,
    helperText,
    className,
    ...props
}: InputProps) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <input
                className={cn(
                    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black outline-none transition",
                    "focus:border-gray-400 focus:ring-2 focus:ring-gray-100",
                    error &&
                    "border-red-500 focus:border-red-500 focus:ring-red-100",
                    className
                )}
                {...props}
            />

            {error ? (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            ) : (
                helperText && (
                    <p className="text-sm text-gray-500">
                        {helperText}
                    </p>
                )
            )}
        </div>
    );
}