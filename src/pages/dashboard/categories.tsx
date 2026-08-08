import { FolderTree, Plus } from "lucide-react";

export default function Categories() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-[#263126]">
                        Categories
                    </h3>

                    <p className="mt-1 text-sm text-[#7b847a]">
                        Organize plants into categories.
                    </p>
                </div>

                <button className="flex items-center gap-2 rounded-lg bg-[#486344] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3d5739]">
                    <Plus className="h-4 w-4" />
                    Add Category
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                    "Cold & Flu",
                    "Digestive",
                    "Skin Care",
                    "Diabetes",
                    "Respiratory",
                ].map((category) => (
                    <div
                        key={category}
                        className="rounded-xl border border-[#e1e5de] bg-white p-5 shadow-sm transition hover:shadow-md"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f4ed]">
                                <FolderTree className="h-5 w-5 text-[#486344]" />
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-[#263126]">
                                    {category}
                                </h4>

                                <p className="mt-1 text-xs text-[#929a91]">
                                    0 plants
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}