"use server";

import { api } from "@/lib/api";
import { auth } from "@/auth";
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
  const session = await auth();
  const token = (session?.user as any)?.accessToken;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const response = await api("/admin/games", {
      method: "POST",
      body: JSON.stringify(data),
      token
    });

    revalidatePath("/admin/games");
    revalidatePath("/");
    return { success: true, game: response };
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
  const session = await auth();
  const token = (session?.user as any)?.accessToken;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const response = await api(`/admin/games/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      token
    });

    revalidatePath("/admin/games");
    revalidatePath("/");
    return { success: true, game: response };
  } catch (error: any) {
    console.error("Update error:", error);
    return { error: error.message };
  }
}

export async function reorderGames(ids: string[]) {
  const session = await auth();
  const token = (session?.user as any)?.accessToken;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    await api("/admin/games/reorder", {
      method: "POST",
      body: JSON.stringify({ ids }),
      token
    });

    revalidatePath("/admin/games");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteGame(id: string) {
  const session = await auth();
  const token = (session?.user as any)?.accessToken;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    await api(`/admin/games/${id}`, {
      method: "DELETE",
      token
    });

    revalidatePath("/admin/games");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
