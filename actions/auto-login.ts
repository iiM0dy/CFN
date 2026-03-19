"use server";

import { signIn } from "@/auth";

export async function preCheckoutLogin(email: string) {
    try {
        await signIn("guest_email_login", {
            email,
            redirect: false,
        });
        return { success: true };
    } catch (error: any) {
        console.error("BACKEND ACTION ERROR: ", error);
        const errorMsg = error.message || error.type || "Unknown error";
        return { error: errorMsg };
    }
}
