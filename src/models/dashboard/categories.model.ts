import type { Timestamp } from "firebase/firestore";

export type CategoryModel = {
    id: string;
    label: string;
    created_at: Timestamp;
    updated_at: Timestamp;
}

export type CategoryCount = {
    category: string;
    count: number;
}
