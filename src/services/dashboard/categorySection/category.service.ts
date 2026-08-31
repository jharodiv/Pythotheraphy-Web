import {
    getDocs,
    collection
} from "firebase/firestore";

import type { CategoryModel } from "@model/dashboard/categories.model";

import { db } from "@service/database/firebase";

//Fetch all the existing categories
export async function getCategories(): Promise<CategoryModel[]> {
    try {

        const snapshot = await getDocs(collection(db, "categories"));

        const categories: CategoryModel[] = snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                id: doc.id,
                label: data.label,
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