import { useCategories } from "@hooks/dashboard/useCategories/useCategories";

import CategoryPlantsModal from "@components/dashboard/categories/plantModal";
import CreateCategoryModal from "@components/dashboard/categories/createCategoryModal";
import EditCategoryModal from "@components/dashboard/categories/editCategoryModal";
import {
    FolderTree,
    MoreVertical,
    Plus,
    Search,
    Pencil,
    Trash2,
} from "lucide-react";

import { useState } from "react";

export default function Categories() {

    const {
        categoriesCount,
        isSelectedCategory,
        isCategoryPlantsModalOpen,
        getCategoryPlantCountsById,
        isNewCategoryModalOpen,
        isEditCategoryModalOpen,
        isCreating,
        selectedCategory,
        closeNewCategoryModal,
        createNewCategory,
        closeEditCategoryModal,
        isUpdating,
        updateCategory,
        openEditCategoryModal,
        handleDeleteCategoryClick,


        search,
        setSearch,
        loading,
        error,

        //fetchPlantsByCategory,
        openPlantModal,
        closePlantModal,
        openNewCategoryModal,

        filteredCategories,

    } = useCategories();


    const [openMenu, setOpenMenu] =
        useState<string | null>(null);


    const handleMenuToggle = (
        categoryId: string
    ) => {

        setOpenMenu((current) =>
            current === categoryId
                ? null
                : categoryId
        );

    };

    const handleCategoryClick = (category: string) => {
        const categoryPlants = getCategoryPlantCountsById.filter((plant) =>
            plant.categories.includes(category));

        openPlantModal(category, categoryPlants);
    }

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h3 className="text-lg font-semibold text-[#263126]">
                        Categories
                    </h3>

                    <p className="mt-1 text-sm text-[#7b847a]">
                        Organize plants into categories.
                    </p>

                </div>


                <button
                    onClick={openNewCategoryModal}
                    className="flex items-center gap-2 rounded-lg bg-[#486344] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3d5739]"
                >

                    <Plus className="h-4 w-4" />

                    Add Category

                </button>

            </div>


            {/* Search */}

            <div className="relative max-w-md">

                <Search
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#929a91]"
                />

                <input
                    type="text"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    className="w-full rounded-lg border border-[#e1e5de] bg-white py-2.5 pl-10 pr-4 text-sm text-[#263126] outline-none transition placeholder:text-[#929a91] focus:border-[#486344] focus:ring-2 focus:ring-[#486344]/10"
                />

            </div>


            {/* Loading */}

            {loading && (
                <p>
                    Loading categories....
                </p>
            )}


            {/* Error */}

            {error && (
                <p>
                    {error}
                </p>
            )}


            {/* Categories */}

            {!loading && !error && (

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {filteredCategories.map((category) => {

                        const categoryCount =
                            categoriesCount.find(
                                (item) =>
                                    item.category.toLowerCase() ===
                                    category.label.toLowerCase()
                            );


                        return (

                            <div
                                key={category.id}

                                onClick={() =>
                                    handleCategoryClick(
                                        category.label
                                    )
                                }

                                className="relative cursor-pointer rounded-xl border border-[#e1e5de] bg-white p-5 shadow-sm transition hover:shadow-md"
                            >

                                <div className="flex items-center justify-between">


                                    {/* Category information */}

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f4ed]">

                                            <FolderTree className="h-5 w-5 text-[#486344]" />

                                        </div>


                                        <div>

                                            <h4 className="text-sm font-semibold text-[#263126]">

                                                {category.label}

                                            </h4>


                                            <p className="mt-1 text-xs text-[#929a91]">

                                                {categoryCount?.count ?? 0}{" "}

                                                {categoryCount?.count === 1
                                                    ? "plant"
                                                    : "plants"}

                                            </p>

                                        </div>

                                    </div>


                                    {/* Three-dot menu */}

                                    <div className="relative">

                                        <button
                                            onClick={(event) => {

                                                event.stopPropagation();

                                                handleMenuToggle(
                                                    category.id
                                                );

                                            }}

                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#929a91] transition hover:bg-[#f0f4ed] hover:text-[#486344]"
                                        >

                                            <MoreVertical className="h-5 w-5" />

                                        </button>


                                        {/* Dropdown */}

                                        {openMenu === category.id && (

                                            <div className="absolute right-0 top-10 z-10 w-36 overflow-hidden rounded-lg border border-[#e1e5de] bg-white py-1 shadow-lg">


                                                {/* Edit */}

                                                <button
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        setOpenMenu(null);

                                                        openEditCategoryModal(category);
                                                    }}
                                                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#263126] transition hover:bg-[#f5f7f3]"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    Edit
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    onClick={(event) => {
                                                        event.stopPropagation();

                                                        setOpenMenu(null);

                                                        handleDeleteCategoryClick(category);
                                                    }}
                                                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />

                                                    Delete
                                                </button>


                                            </div>

                                        )}

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}


            {/* Category Plants Modal */}

            <CategoryPlantsModal
                isOpen={
                    isCategoryPlantsModalOpen
                }

                categoryName={
                    isSelectedCategory ?? ""
                }

                plants={
                    getCategoryPlantCountsById
                }

                onClose={
                    closePlantModal
                }
            />

            <CreateCategoryModal
                isOpen={isNewCategoryModalOpen}
                onClose={closeNewCategoryModal}
                onCreate={createNewCategory}
                isCreating={isCreating}
            />

            <EditCategoryModal
                isOpen={isEditCategoryModalOpen}
                onClose={closeEditCategoryModal}
                onEdit={updateCategory}
                isEditing={isUpdating}
                category={selectedCategory}
            />

        </div>
    );
}