"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: { name: string }) {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: { name: data.name }
        });

        revalidatePath("/profile");
        return { success: true };
    } catch (error) {
        return { error: "Failed to update profile" };
    }
}

export async function changePassword(data: { currentPassword?: string, newPassword: string }) {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        });

        if (!user) return { error: "User not found" };

        // If user already has a password, verify current one
        if (user.password) {
            if (!data.currentPassword) {
                return { error: "Current password is required" };
            }

            const isMatch = await bcrypt.compare(data.currentPassword, user.password);
            if (!isMatch) {
                return { error: "Incorrect current password" };
            }
        }

        const hashedPassword = await bcrypt.hash(data.newPassword, 10);

        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedPassword }
        });

        return { success: true };
    } catch (error) {
        return { error: "Failed to change password" };
    }
}
