"use server"

import { auth } from "@/auth"
import { api } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export type CreateOrderState = {
    errors?: {
        _form?: string[]
    }
    message?: string
}

export async function createOrder(
    prevState: CreateOrderState,
    formData: FormData
): Promise<CreateOrderState> {
    const session = await auth()
    const token = (session?.user as any)?.accessToken;

    if (!token) {
        return {
            message: "You must be logged in to place an order.",
        }
    }

    const cartJson = formData.get("cart") as string
    if (!cartJson) {
        return { message: "Cart is empty" }
    }

    let cartItems: any[] = []
    try {
        cartItems = JSON.parse(cartJson)
    } catch (e) {
        return { message: "Invalid cart data" }
    }

    if (cartItems.length === 0) {
        return { message: "Cart is empty" }
    }

    try {
        await api("/orders", {
            method: "POST",
            body: JSON.stringify({ items: cartItems }),
            token
        })
    } catch (error: any) {
        console.error("Order creation failed:", error)
        return { message: error.message || "Failed to create order." }
    }

    revalidatePath("/admin/orders")
    redirect("/dashboard")
}
