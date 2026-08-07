import type { TableHTMLAttributes } from "react";

import { cn } from "@utils/cn";

interface Props
    extends TableHTMLAttributes<HTMLTableElement> {}

export default function Table({
    className,
    children,
    ...props
}: Props) {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table
                className={cn(
                    "min-w-full border-collapse",
                    className
                )}
                {...props}
            >
                {children}
            </table>
        </div>
    );
}