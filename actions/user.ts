"use server";

import { auth } from "@/auth";
import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: { name: string }) {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;

    if (!token) {
        return { error: "Unauthorized" };
    }

    try {
        await api("/user/profile", {
            method: "PATCH",
            body: JSON.stringify({ name: data.name }),
            token
        });

        revalidatePath("/profile");
        return { success: true };
    } catch (error: any) {
        return { error: error.message || "Failed to update profile" };
    }
}

export async function changePassword(data: { currentPassword?: string, newPassword: string }) {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;

    if (!token) {
        return { error: "Unauthorized" };
    }

    try {
        await api("/user/change-password", {
            method: "POST",
            body: JSON.stringify({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            }),
            token
        });

        return { success: true };
    } catch (error: any) {
        return { error: error.message || "Failed to change password" };
    }
}
