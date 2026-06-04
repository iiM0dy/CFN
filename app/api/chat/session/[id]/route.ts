import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { api } from "@/lib/api";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        const token = (session?.user as any)?.accessToken;
        const { id } = await params;

        const chatSession = await api(`/chat/session/${id}`, { token: token || undefined });
        return NextResponse.json(chatSession);
    } catch (error: any) {
        console.error("Chat Session Get Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
