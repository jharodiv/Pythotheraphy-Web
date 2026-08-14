import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    type DocumentData,
    type QueryDocumentSnapshot,
} from "firebase/firestore";

import { db } from "@service/database/firebase";

import type { PlantModel } from "@model/dashboard/plants.model";

const PLANT_COLLECTION = "plants";
const PLANT_CACHE_COLLECTION = "plant_cache";

/**
 * Convert a Firestore document into a PlantModel.
 */

function mapPlant(
    snapshot: QueryDocumentSnapshot<DocumentData>
): PlantModel {
    return {
        id: snapshot.id,
        ...snapshot.data(),
    } as PlantModel;
}

/**
 * Get all verified plants from the plants collection.
 */
export async function getVerifiedPlant(): Promise<PlantModel[]> {
    try {
        const plantsRef = collection(db, PLANT_COLLECTION);
        const snapshot = await getDocs(plantsRef);

        return snapshot.docs.map(mapPlant);
    } catch (error) {
        console.error(
            "Failed to fetch verified plants",
            error
        );

        throw new Error(
            "Unable to load verified plants"
        );
    }

    /**
     * Get all unverified plants from the plant_cache collection.
     */
}

export async function getUnverifiedPlant(): Promise<PlantModel[]> {
    try {
        const plantCacheRef = collection(db, PLANT_CACHE_COLLECTION);

        const snapshot = await getDocs(plantCacheRef);

        return snapshot.docs.map(mapPlant);
    } catch (error) {
        console.error(
            "Failed to fetch unverified plants:",
            error
        );

        throw new Error(
            "Unable to load unverified plants"
        );
    }
}
/**
 * Get all plants from both verified and unverified collections.
 */

export async function getPlants(): Promise<PlantModel[]> {
    try {
        const [verifiedPlants, unverifiedPlants] =
            await Promise.all([
                getVerifiedPlant(),
                getUnverifiedPlant(),
            ]);

        return [
            ...verifiedPlants,
            ...unverifiedPlants,
        ];
    } catch (error) {
        console.error(
            "Failed to fetch plants:",
            error
        );

        throw new Error(
            "Unable to load plants."
        );
    }
}

/**
 * Get a verified plant by its Firestore document ID.
 */

export async function getPlantById(
    id: string
): Promise<PlantModel | null> {
    try {
        const plantRef = doc(db, PLANT_COLLECTION, id);

        const snapshot = await getDoc(plantRef);

        if (!snapshot.exists()) {
            return null;
        }

        return {
            id: snapshot.id,
            ...snapshot.data(),
        } as PlantModel;
    } catch (error) {
        console.error(
            `Failed to fetch plant with ID ${id}:`,
            error
        );

        throw new Error(
            "Unable to load plants"
        );
    }
}

/**
 * Add a new verified plant.
 */

export async function addPlant(plant: Omit<PlantModel, "id">): Promise<PlantModel> {
    try {
        const plantRef = collection(db, PLANT_COLLECTION);


        const document = await addDoc(
            plantRef,
            plant
        );

        return {
            id: document.id,
            ...plant,
        };
    } catch (error) {
        console.error(
            " Failed to add plant",
            error
        );

        throw new Error(
            " Unable to add Plant"
        );
    }
}

/**
 * Update an existing verified plant.
 */

export async function updatePlant(
    id: string,
    plant: Partial<Omit<PlantModel, "id">>
): Promise<void> {
    try {
        const plantRef = doc(
            db,
            PLANT_COLLECTION,
            id
        );

        await updateDoc(
            plantRef,
            plant
        );
    } catch (error) {
        console.error(
            `Failed to update plant with ID ${id}:`,
            error
        );

        throw new Error(
            "Unable to update plant."
        );
    }
}

/**
 * Delete an existing verified plant.
 */

export async function deletePlant(
    id: string
): Promise<void> {
    try {
        const plantRef = doc(
            db,
            PLANT_COLLECTION,
            id
        );

        await deleteDoc(plantRef);
    } catch (error) {
        console.error(
            `Failed to delete plant with ID ${id}:`,
            error
        );

        throw new Error(
            "Unable to delete plant."
        );
    }
}