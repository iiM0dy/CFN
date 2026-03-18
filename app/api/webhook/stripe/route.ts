import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        console.log("Payment successful for session:", session.id);

        const metadata = session.metadata;

        // Handle standard Order model
        if (metadata?.orderId) {
            await prisma.order.update({
                where: { id: metadata.orderId },
                data: { status: "PAID" },
            });
        }

        // Handle ServiceOrder model
        if (metadata?.serviceOrderId) {
            await prisma.serviceOrder.update({
                where: { id: metadata.serviceOrderId },
                data: { status: "paid" },
            });
        }
    }

    return new NextResponse(null, { status: 200 });
}
