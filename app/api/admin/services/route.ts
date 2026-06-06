import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { api } from "@/lib/api";

export async function POST(req: Request) {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;

    if ((session?.user as any)?.role !== "ADMIN" || !token) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();

        const newService = await api("/admin/services", {
            method: "POST",
            body: JSON.stringify(body),
            token
        });

        return NextResponse.json(newService);
    } catch (error: any) {
        console.error("[SERVICE_CREATE]", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
