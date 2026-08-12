import { Leaf, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function Plants() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState<"all" | "verified" | "unverified">(
        "all"
    );

    const filterLabel = {
        all: "All Plants",
        verified: "Verified",
        unverified: "Unverified",
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-[#263126]">
                        Plant Management
                    </h3>

                    <p className="mt-1 text-sm text-[#7b847a]">
                        View and manage plants in the database.
                    </p>
                </div>

                <button className="rounded-lg bg-[#486344] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3d5739]">
                    Add Plant
                </button>
            </div>

            <div className="rounded-xl border border-[#e1e5de] bg-white shadow-sm">
                <div className="border-b border-[#e8ebe5] p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        {/* Search */}
                        <div className="relative max-w-sm flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#929a91]" />

                            <input
                                type="text"
                                placeholder="Search plants..."
                                className="w-full rounded-lg border border-[#dfe4dc] py-2.5 pl-9 pr-3 text-sm text-black outline-none focus:border-[#aab8a5] focus:ring-2 focus:ring-[#edf2ea]"
                            />
                        </div>

                        {/* Filter */}
                        <div className="relative">
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#dfe4dc] bg-white px-4 py-2.5 text-sm font-medium text-[#596257] transition hover:bg-[#f7f9f5] sm:w-auto"
                            >
                                <SlidersHorizontal className="h-4 w-4" />

                                {filterLabel[filter]}
                            </button>

                            {filterOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-lg border border-[#e1e5de] bg-white shadow-lg">
                                    <button
                                        onClick={() => {
                                            setFilter("all");
                                            setFilterOpen(false);
                                        }}
                                        className={`w-full px-4 py-2.5 text-left text-sm transition hover:bg-[#f7f9f5] ${filter === "all"
                                                ? "bg-[#f1f5ef] font-medium text-[#486344]"
                                                : "text-[#596257]"
                                            }`}
                                    >
                                        All Plants
                                    </button>

                                    <button
                                        onClick={() => {
                                            setFilter("verified");
                                            setFilterOpen(false);
                                        }}
                                        className={`w-full px-4 py-2.5 text-left text-sm transition hover:bg-[#f7f9f5] ${filter === "verified"
                                                ? "bg-[#f1f5ef] font-medium text-[#486344]"
                                                : "text-[#596257]"
                                            }`}
                                    >
                                        Verified
                                    </button>

                                    <button
                                        onClick={() => {
                                            setFilter("unverified");
                                            setFilterOpen(false);
                                        }}
                                        className={`w-full px-4 py-2.5 text-left text-sm transition hover:bg-[#f7f9f5] ${filter === "unverified"
                                                ? "bg-[#f1f5ef] font-medium text-[#486344]"
                                                : "text-[#596257]"
                                            }`}
                                    >
                                        Unverified
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex min-h-64 flex-col items-center justify-center text-center">
                    <Leaf className="h-10 w-10 text-[#b3c0ae]" />

                    <p className="mt-3 text-sm font-medium text-[#596257]">
                        No plants to display
                    </p>

                    <p className="mt-1 text-xs text-[#929a91]">
                        Plant data will be connected later.
                    </p>
                </div>
            </div>
        </div>
    );
}