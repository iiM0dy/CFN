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
        await api(`/admin/users/${id}`, {
            method: "DELETE",
            token
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error("[USER_DELETE]", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}

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
        const body = await req.json();

        const updatedUser = await api(`/admin/users/${id}`, {
            method: "PATCH",
            body: JSON.stringify(body),
            token
        });

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        console.error("[USER_PATCH]", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
