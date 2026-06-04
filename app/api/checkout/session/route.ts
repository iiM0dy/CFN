import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { api } from "@/lib/api";

export async function POST(req: Request) {
    try {
        const session = await auth();
        const body = await req.json();

        const response = await api("/checkout/session", {
            method: "POST",
            body: JSON.stringify(body),
            token: (session?.user as any)?.accessToken || undefined,
        });

        return NextResponse.json(response);
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
