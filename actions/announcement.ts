"use server";

import { auth } from "@/auth";
import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";

async function getToken() {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;
    if (!token) throw new Error("Unauthorized");
    return token;
}

export async function createAnnouncement(data: { message: string; isActive: boolean }) {
    try {
        const token = await getToken();
        const result = await api("/admin/announcements", {
            method: "POST",
            body: JSON.stringify(data),
            token,
        });
        revalidatePath("/admin/announcements");
        return { success: true, announcement: result };
    } catch (error: any) {
        return { success: false, error: error.message || "Failed to create announcement" };
    }
}

export async function updateAnnouncement(id: string, data: { message?: string; isActive?: boolean }) {
    try {
        const token = await getToken();
        const result = await api(`/admin/announcements/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            token,
        });
        revalidatePath("/admin/announcements");
        return { success: true, announcement: result };
    } catch (error: any) {
        return { success: false, error: error.message || "Failed to update announcement" };
    }
}

export async function deleteAnnouncement(id: string) {
    try {
        const token = await getToken();
        await api(`/admin/announcements/${id}`, {
            method: "DELETE",
            token,
        });
        revalidatePath("/admin/announcements");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message || "Failed to delete announcement" };
    }
}
