import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { api } from "@/lib/api";

export async function GET() {
    try {
        const session = await auth();
        const token = (session?.user as any)?.accessToken;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessions = await api("/chat/sessions", { token });
        return NextResponse.json(sessions);
    } catch (error: any) {
        console.error("Chat Sessions List Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
