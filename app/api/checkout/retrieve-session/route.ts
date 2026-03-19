import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
        return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        if (!session) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 });
        }

        const orderId = session.metadata?.serviceOrderId;
        const email = session.customer_details?.email || session.metadata?.email;

        return NextResponse.json({ 
            orderId,
            email 
        });
    } catch (error: any) {
        console.error("Error retrieving session:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
