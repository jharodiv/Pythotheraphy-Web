import {
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import type { AuthError } from "firebase/auth";

import { auth } from "@service/database/firebase";

import { getAuthErrorMessage } from "@errors/authentication/auth.error";

export async function login(email: string, password: string) {
    try {
        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return credential.user;
    } catch (error) {
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