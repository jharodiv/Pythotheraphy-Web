import { db } from "@service/database/firebase";
import {
    collection,
    getCountFromServer,
    query,
    where,
} from "firebase/firestore";

import type { DashboardStats } from "@model/dashboard/dashboard.model";

const PLANTS_COLLECTION = "plants";
const USERS_COLLECTION = "users";

// GET THE COUNT OF THE TOTAL PLANTS, VERIFIED PLANTS, UNVERIFIED PLANTS, AND TOTAL USERS. USING THE FIRESTORE 

export async function getDashboardStats(): Promise<DashboardStats> {

    try {
        const plantsRef = collection(db, PLANTS_COLLECTION);
        const userRef = collection(db, USERS_COLLECTION);

        const [
            totalPlantsSnapshot,
            verifiedPlantsSnapshot,
            unverifiedPlantsSnapshot,
            totalUsersSnapshot,
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

            getCountFromServer(userRef),
        ]);

        return {
            totalPlants: totalPlantsSnapshot.data().count,
            verifiedPlants:
                verifiedPlantsSnapshot.data().count,
            unverifiedPlants:
                unverifiedPlantsSnapshot.data().count,
            totalUsers: totalUsersSnapshot.data().count,
        };


    } catch (error) {
        console.error(
            "Failed to fetch dashboard statistic",
            error
        );

        throw new Error(
            "Unable to load statistic"
        )
    }
}