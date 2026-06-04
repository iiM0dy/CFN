import { NextResponse } from "next/server";
import { auth } from "@/auth";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8888/api';

export async function GET() {
    try {
        const res = await fetch(`${API}/announcement`, {
            headers: { 'Accept': 'application/json' }
        });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;

    if ((session?.user as any)?.role !== "ADMIN" || !token) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();

        const res = await fetch(`${API}/announcement`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("[ANNOUNCEMENT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE() {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;

    if ((session?.user as any)?.role !== "ADMIN" || !token) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const res = await fetch(`${API}/announcement`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (res.status === 204) {
            return new NextResponse(null, { status: 204 });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
