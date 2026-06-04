"use server";

import { LoginSchema, RegisterSchema } from "@/schemas";
import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { api } from "@/lib/api";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    try {
        const response = await api("/register", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        if (response?.error) {
            return { error: response.error };
        }

        return { success: "User created!" };
    } catch (error: any) {
        console.error("Register API error:", error);
        return { error: error.message || "Something went wrong!" };
    }
};


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
        return { success: true };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }

        throw error;
    }
};
