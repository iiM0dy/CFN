"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createGame(data: { name: string; slug: string; description: string; bgImage: string; charImage?: string; href: string }) {
  try {
    const game = await prisma.gameService.create({
      data: {
        ...data,
        charImage: data.charImage || null
      }
    });
    revalidatePath("/admin/games");
    revalidatePath("/");
    return { success: true, game };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateGame(id: string, data: Partial<{ name: string; slug: string; description: string; bgImage: string; charImage: string; href: string; isActive: boolean; isPopular: boolean }>) {
  try {
    const game = await prisma.gameService.update({
      where: { id },
      data: {
        ...data,
        charImage: data.charImage ?? undefined, // handle null if needed
      }
    });
    revalidatePath("/admin/games");
    revalidatePath("/");
    return { success: true, game };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteGame(id: string) {
  try {
    await prisma.gameService.delete({ where: { id } });
    revalidatePath("/admin/games");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
