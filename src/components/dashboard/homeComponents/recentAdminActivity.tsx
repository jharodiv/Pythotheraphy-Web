import { ShieldCheck } from "lucide-react";

const recentLogs = [
    {
        admin: "Jem Centino",
        action: "Verified",
        target: "Lagundi",
        time: "5 minutes ago",
    },
    {
        admin: "Admin User",
        action: "Updated",
        target: "Ginger",
        time: "32 minutes ago",
    },
    {
        admin: "Jem Centino",
        action: "Created",
        target: "Digestive Plants",
        time: "1 hour ago",
    },
    {
        admin: "Admin User",
        action: "Deleted",
        target: "Unknown Plant",
        time: "2 hours ago",
    },
    {
        admin: "Jem Centino",
        action: "Verified",
        target: "Aloe Vera",
        time: "3 hours ago",
    },
];

export default function RecentAdminActivity() {
    return (
        <div className="rounded-xl border border-[#e1e5de] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#e1e5de] px-6 py-5">
                <div>
                    <h3 className="text-base font-semibold text-[#263126]">
                        Recent Admin Activity
                    </h3>

                    <p className="mt-1 text-sm text-[#7b847a]">
                        Recent changes made by administrators.
                    </p>
                </div>

                <button
                    type="button"
                    className="text-sm font-medium text-[#486344] transition hover:text-[#263126]"
                >
                    View all logs
                </button>
            </div>

            <div className="divide-y divide-[#eef0ec]">
                {recentLogs.map((log, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between px-6 py-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0f4ed]">
                                <ShieldCheck className="h-4 w-4 text-[#486344]" />
                            </div>

                            <div>
                                <p className="text-sm text-[#263126]">
                                    <span className="font-medium">
                                        {log.admin}
                                    </span>{" "}
                                    {log.action.toLowerCase()}{" "}
                                    <span className="font-medium">
                                        {log.target}
                                    </span>
                                </p>

                                <p className="mt-0.5 text-xs text-[#929a91]">
                                    {log.time}
                                </p>
                            </div>
                        </div>

                        <span className="rounded-full bg-[#f0f4ed] px-2.5 py-1 text-xs font-medium text-[#486344]">
                            {log.action}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}