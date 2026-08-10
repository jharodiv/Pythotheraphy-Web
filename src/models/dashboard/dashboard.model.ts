import type { Timestamp } from "firebase/firestore";

// For checking the stats
export type DashboardStats = {
    totalPlants: number;
    verifiedPlants: number;
    unverifiedPlants: number;
    totalUsers: number;
}

// For admin logging
export type AdminLog = {
    id: string;
    adminId: string;
    action: "CREATE" | "UPDATE" | "DELETE" | "VERIFY" | "UNVERIFY";
    targetType: "PLANT" | "USER" | "CATEGORY";
    targetId: string;
    description: string;
    timestamp: Timestamp;
};