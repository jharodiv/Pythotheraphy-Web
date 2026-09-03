import {
    getDocs,
    collection,
    addDoc,
    query,
    where,
    Timestamp,
    doc,
    updateDoc,
    deleteDoc,
    getDoc
} from "firebase/firestore";

import type { CategoryModel, CategoryCount } from "@model/dashboard/categories.model";

import { db } from "@service/database/firebase";
import type { PlantModel } from "@model/dashboard/plants.model";

//Fetch all the existing categories
export async function getCategories(): Promise<CategoryModel[]> {
    try {

        const snapshot = await getDocs(collection(db, "categories"));

        const categories: CategoryModel[] = snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                id: doc.id,
                label: data.label,
                created_at: data.created_at as Timestamp,
                updated_at: data.updated_at as Timestamp
            }
        });

        return categories;

    } catch (error) {
        console.error(
            "Failed to fetch the categories",
            error
        );

        throw new Error(
            "Unable to load categories"
        );
    }
}

// Count plants belonging to each category
export async function getCategoryPlantCounts(): Promise<CategoryCount[]> {
    try {

        const snapshot = await getDocs(
            collection(db, "plants")
        );

        const counts: Record<string, number> = {};

        snapshot.docs.forEach((doc) => {
            const data = doc.data();
            const categories = data.categories;

            if (!Array.isArray(categories)) {
                return;
            }

            categories.forEach((category: string) => {
                counts[category] = (counts[category] || 0) + 1;
            });
        })

        return Object.entries(counts).map(
            ([category, count]) => ({
                category,
                count
            })
        );
    } catch (error) {
        console.error(
            "Failed to count the plants per category",
            error
        );

        throw new Error(
            "Unable to count the plants per category"
        );
    }
}

// Fetch the plants that has the specific categories by id
export async function getCategoriesPlantsById(category: string): Promise<PlantModel[]> {
    try {
        const plantQuery = query(
            collection(db, "plants"),
            where(
                "categories",
                "array-contains",
                category.toLowerCase()
            )
        );

        const snapshot = await getDocs(plantQuery);


        const plants: PlantModel[] = snapshot.docs.map(
            (doc) => ({
                id: doc.id,
                ...doc.data()
            } as PlantModel)
        );

        return plants;
    } catch (error) {
        console.error(
            `Failed to fetch plants for category "${category}":`,
            error
        );

        throw new Error(
            "Unable to load plants for this category"
        );
    }
}

// Create Plants Category
export async function createPlantCategory(label: string): Promise<CategoryModel> {
    try {

        const now = Timestamp.now();

        const docRef = await addDoc(collection(db, "categories"), {
            label,
            created_at: now,
            updated_at: now
        });

        return {
            id: docRef.id,
            label,
            created_at: now,
            updated_at: now
        }
    } catch (error) {
        console.error(
            "Failed to create category:",
            error
        );

        throw new Error(
            "Unable to create category"
        );
    }
}

// Updating a plant

export async function updatePlantCategory(id: string, label: string): Promise<void> {
    try {

        const now = Timestamp.now();


        const categoryRef = doc(db, "categories", id);


        await updateDoc(categoryRef, {
            label,
            updated_at: now
        });

    } catch (error) {
        console.error(
            "Failed to update category",
            error
        )

        throw new Error(
            "Unable to update category"
        );
    }
}

export async function deletePlantCategory(id: string): Promise<void> {
    try {

        const categoryRef = doc(db, "categories", id);

        const snapshot = await getDoc(categoryRef)

        if (snapshot.exists()) {
            await deleteDoc(categoryRef);

            return;
        }


        throw new Error(
            "Category does not exist"
        )
    } catch (error) {
        console.error(
            "Failed to delete category",
            error
        )

        throw new Error(
            "Unable to delete category"
        );
    }
}