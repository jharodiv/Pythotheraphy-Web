import { z } from "zod";

export const LoginSchema = z.object({
    email: z.email("Please enter a valid email address")
        .min(1, "Email is required")
        .trim()
        .toLowerCase(),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
})

export type LoginSchema = z.infer<typeof LoginSchema>