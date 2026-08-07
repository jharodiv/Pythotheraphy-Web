import type { AuthError } from "firebase/auth";

export function getAuthErrorMessage(error: AuthError): string {
    switch (error.code) {
        case "auth/invalid-credential":
            return "Invalid email or password.";

        case "auth/user-disabled":
            return "This account has been disabled.";

        case "auth/too-many-requests":
            return "Too many failed login attempts. Please try again later.";

        case "auth/network-request-failed":
            return "Network error. Please check your internet connection.";

        default:
            return error.message || "Authentication failed.";
    }
}