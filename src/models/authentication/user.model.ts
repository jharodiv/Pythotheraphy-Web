import { Timestamp } from "firebase/firestore";

export type UserModel = {
    id: string; // uid
    role: "user" | "admin";
    email: string;
    userName: string;
    fullName: string;
    photoURL: string;
    favorites: string[];
    created_at: Timestamp;
    updated_at: Timestamp;
};