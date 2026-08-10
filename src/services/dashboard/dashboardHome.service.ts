import { db } from "@service/database/firebase";
import {
    collection,
    getCountFromServer,
    query,
    where,
} from "firebase/firestore";

import type { DashboardStats } from "@model/dashboard/dashboard.model";

const PLANTS_COLLECTION = "plants";

// GET THE COUNT OF THE TOTAL PLANTS, VERIFIED PLANTS,
// UNVERIFIED PLANTS, AND TOTAL USERS USING FIRESTORE

export async function getDashboardStats(): Promise<DashboardStats> {
    try {
        const plantsRef = collection(db, PLANTS_COLLECTION);

        const [
            totalPlantsSnapshot,
            verifiedPlantsSnapshot,
            unverifiedPlantsSnapshot,
        ] = await Promise.all([
            getCountFromServer(plantsRef),

            getCountFromServer(
                query(
                    plantsRef,
                    where("verified", "==", true)
                )
            ),

            getCountFromServer(
                query(
                    plantsRef,
                    where("verified", "==", false)
                )
            ),
        ]);

        return {
            totalPlants: totalPlantsSnapshot.data().count,
            verifiedPlants:
                verifiedPlantsSnapshot.data().count,
            unverifiedPlants:
                unverifiedPlantsSnapshot.data().count,
        };
    } catch (error) {
        console.error(
            "Failed to fetch dashboard statistics:",
            error
        );

        throw new Error(
            "Unable to load dashboard statistics."
        );
    }
}


// Will create another service for the count of the users per month:

// Will create another serrvice for the admin recent activities: