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

export async function updateReview(id: string, data: { status?: string; isFeatured?: boolean }) {
    try {
        const token = await getToken();
        const result = await api(`/admin/reviews/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            token,
        });
        revalidatePath("/admin/reviews");
        return { success: true, review: result };
    } catch (error: any) {
        return { success: false, error: error.message || "Failed to update review" };
    }
}

export async function deleteReview(id: string) {
    try {
        const token = await getToken();
        await api(`/admin/reviews/${id}`, {
            method: "DELETE",
            token,
        });
        revalidatePath("/admin/reviews");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message || "Failed to delete review" };
    }
}
