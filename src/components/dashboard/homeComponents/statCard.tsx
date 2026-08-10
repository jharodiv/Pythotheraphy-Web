import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
}

export default function StatCard({
    title,
    value,
    description,
    icon: Icon,
}: StatCardProps) {
    return (
        <div className="rounded-xl border border-[#e1e5de] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-[#7b847a]">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-semibold text-[#263126]">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-[#929a91]">
                        {description}
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f4ed]">
                    <Icon className="h-5 w-5 text-[#486344]" />
                </div>
            </div>
        </div>
    );
}