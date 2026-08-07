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
        <div className="flex w-full flex-col gap-1">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <input
                className={cn(
                    "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-200",
                    error && "border-red-500 focus:border-red-500 focus:ring-red-200",
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