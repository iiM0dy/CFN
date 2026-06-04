import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { api } from "@/lib/api";

export async function POST(req: Request) {
    try {
        const session = await auth();
        const token = (session?.user as any)?.accessToken;
        const body = await req.json();

        const message = await api("/chat/message", {
            method: "POST",
            body: JSON.stringify(body),
            token: token || undefined
        });

        return NextResponse.json(message);
    } catch (error: any) {
        console.error("Chat Message Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
