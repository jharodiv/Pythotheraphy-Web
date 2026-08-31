import { useCategories } from "@hooks/dashboard/useCategories/useCategories";
import { FolderTree, Plus, Search } from "lucide-react";

export default function Categories() {
    const {
        categories,
        loading,
        error
    } = useCategories();

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

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#929a91]" />

                <input
                    type="text"
                    placeholder="Search categories..."
                    className="w-full rounded-lg border border-[#e1e5de] bg-white py-2.5 pl-10 pr-4 text-sm text-[#263126] outline-none transition placeholder:text-[#929a91] focus:border-[#486344] focus:ring-2 focus:ring-[#486344]/10"
                />
            </div>

            {loading && (
                <p>Loading categories....</p>
            )}

            {error && (
                <p>{error}</p>
            )}

            {!loading && !error && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="rounded-xl border border-[#e1e5de] bg-white p-5 shadow-sm transition hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f4ed]">
                                    <FolderTree className="h-5 w-5 text-[#486344]" />
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-[#263126]">
                                        {category.label}
                                    </h4>

                                    <p className="mt-1 text-xs text-[#929a91]">
                                        0 plants
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}