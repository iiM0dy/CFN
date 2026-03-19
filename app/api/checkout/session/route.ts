import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();
        const body = await req.json();
        const { items, successUrl, cancelUrl, customerEmail, metadata } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: "No items provided" }, { status: 400 });
        }

        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: "usd", // You might want to get this from your currency context
                product_data: {
                    name: item.name,
                    ...(item.image && { images: [item.image] }),
                    ...(item.description && { description: item.description }),
                },
                unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
            },
            quantity: item.quantity || 1,
        }));

        // Calculate total amount in cents for Stripe, but we also need the decimal version for Prisma
        const totalAmount = lineItems.reduce((acc: number, item: any) => acc + (item.price_data.unit_amount * item.quantity), 0) / 100;

        // Create the ServiceOrder in the database
        const serviceOrder = await prisma.serviceOrder.create({
            data: {
                userId: session?.user?.id || null,
                guestEmail: customerEmail || session?.user?.email || null,
                serviceId: items[0].id, // For now assuming 1 service per order as per previous logic
                totalPrice: totalAmount,
                quantity: items[0].quantity || 1,
                platform: metadata?.platform || "Standard",
                completionMethod: metadata?.completionMethod || "Direct",
                orderNotes: metadata?.orderNotes || null,
                selectedOptions: metadata?.selectedOptions ? JSON.parse(metadata.selectedOptions) : null,
                status: "pending",
            }
        });

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
            customer_email: customerEmail || session?.user?.email || undefined,
            metadata: {
                userId: session?.user?.id || "guest",
                serviceOrderId: serviceOrder.id,
                ...metadata,
            },
        });

        return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
