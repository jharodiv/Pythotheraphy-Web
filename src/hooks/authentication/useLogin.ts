import { useState } from "react";

import { LoginSchema } from "@validation/authentication/auth.validation";
import { login } from "@service/authentication/auth.service";

export function useLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    async function handleLogin() {
        setEmailError("");
        setPasswordError("");

        const result = LoginSchema.safeParse({
            email,
            password,
        });

        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;

            setEmailError(errors.email?.[0] ?? "");
            setPasswordError(errors.password?.[0] ?? "");

            return;
        }

        try {
            setLoading(true);

            await login(
                result.data.email,
                result.data.password
            );

            // TODO:
            // router.replace("/(tabs)");

        } catch (error) {
            alert((error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return {
        email,
        setEmail,

        password,
        setPassword,

        emailError,
        passwordError,

        loading,

        handleLogin,
    };
}