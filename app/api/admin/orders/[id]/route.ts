import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { api } from "@/lib/api";

export async function DELETE(
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
        await api(`/admin/orders/${id}`, {
            method: "DELETE",
            token
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error("[ORDER_DELETE]", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
