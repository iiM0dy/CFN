"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createGame(data: { 
  name: string; 
  slug: string; 
  description: string; 
  bgImage: string; 
  charImage?: string; 
  href: string; 
  order?: number;
  isActive?: boolean;
  isPopular?: boolean;
}) {
  try {
    // If order is not provided, find the max order and add 1
    let orderToSet = data.order;
    if (orderToSet === undefined) {
      const lastGame = await prisma.gameService.findFirst({
        orderBy: { order: 'desc' },
        select: { order: true }
      });
      orderToSet = (lastGame?.order ?? -1) + 1;
    }

    const game = await prisma.gameService.create({
      data: {
        ...data,
        order: orderToSet,
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

export async function updateGame(id: string, data: Partial<{ 
  name: string; 
  slug: string; 
  description: string; 
  bgImage: string; 
  charImage: string; 
  href: string; 
  isActive: boolean; 
  isPopular: boolean;
  order: number;
}>) {
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
    console.error("Update error:", error);
    return { error: error.message };
  }
}

export async function reorderGames(ids: string[]) {
  try {
    // Update all games orders based on the index in the array
    await Promise.all(
      ids.map((id, index) => 
        prisma.gameService.update({
          where: { id },
          data: { order: index }
        })
      )
    );
    revalidatePath("/admin/games");
    revalidatePath("/");
    return { success: true };
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
