import {
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import {
    doc,
    getDoc,
} from "firebase/firestore";


import type { AuthError } from "firebase/auth";

import { auth, db } from "@service/database/firebase";

import { getAuthErrorMessage } from "@errors/authentication/auth.error";
import type { UserModel } from "src/models/authentication/user.model";

export async function login(email: string, password: string) {
    try {
        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const uid = credential.user.uid;

        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await signOut(auth);
            throw new Error("User profile not found");
        }

        const user = userSnap.data() as UserModel;

        if (user.role !== "admin") {
            await signOut(auth);
            throw new Error("Only admitrators can access this application");
        }

        console.log("Profile Logged", credential.user);

        return credential.user;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        throw new Error(getAuthErrorMessage(error as AuthError));
    }
}

export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error(getAuthErrorMessage(error as AuthError));
    }
}