import { headers } from "next/headers";
import { NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8888/api';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    try {
        const res = await fetch(`${API}/webhook/stripe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Stripe-Signature": signature,
            },
            body,
        });

        if (!res.ok) {
            const errText = await res.text();
            return new NextResponse(`Forwarding Error: ${errText}`, { status: res.status });
        }

        return new NextResponse(null, { status: 200 });
    } catch (error: any) {
        return new NextResponse(`Webhook Forwarding Error: ${error.message}`, { status: 400 });
    }
}
