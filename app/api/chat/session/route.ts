import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { api } from "@/lib/api";

export async function POST(req: Request) {
    try {
        const session = await auth();
        const token = (session?.user as any)?.accessToken;
        const body = await req.json();

        const chatSession = await api("/chat/session", {
            method: "POST",
            body: JSON.stringify(body),
            token: token || undefined
        });

        return NextResponse.json(chatSession);
    } catch (error: any) {
        console.error("Chat Session Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
