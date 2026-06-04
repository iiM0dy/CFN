import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { api } from "@/lib/api";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;

    if ((session?.user as any)?.role !== "ADMIN" || !token) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { id } = await params;
        const { status } = await req.json();

        const updatedSession = await api(`/admin/chat/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
            token
        });

        return NextResponse.json(updatedSession);
    } catch (error: any) {
        console.error("[CHAT_STATUS_PATCH]", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
