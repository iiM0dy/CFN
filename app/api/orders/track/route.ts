import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')
    const email = searchParams.get('email')

    if (!orderId && email) {
        // find all orders by email
        const user = await prisma.user.findFirst({ where: { email: email.toLowerCase() } })
        
        try {
            const orders = await prisma.serviceOrder.findMany({
                where: {
                    OR: [
                        { guestEmail: { equals: email, mode: 'insensitive' } },
                        ...(user ? [{ userId: user.id }] : [])
                    ]
                },
                include: {
                    service: {
                        include: {
                            game: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            })

            if (orders.length === 0) {
                return NextResponse.json({ error: "No orders found for this email" }, { status: 404 })
            }

            return NextResponse.json({
                orders: orders.map(order => ({
                    id: order.id,
                    status: order.status,
                    totalPrice: order.totalPrice,
                    createdAt: order.createdAt,
                    serviceName: order.service.name,
                    gameName: order.service.game.name,
                    gameSlug: order.service.game.slug,
                    image: order.service.image || order.service.game.bgImage,
                    guestEmail: order.guestEmail || email
                }))
            })
        } catch (error) {
            console.error("Error tracking orders by email:", error)
            return NextResponse.json({ error: "Internal server error" }, { status: 500 })
        }
    }

    if (!orderId) {
        return NextResponse.json({ error: "Order ID or Email is required" }, { status: 400 })
    }

    try {
        const order = await prisma.serviceOrder.findUnique({
            where: { id: orderId },
            include: {
                service: {
                    include: {
                        game: true
                    }
                }
            }
        })

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 })
        }

        // Security Check
        let orderEmail = order.guestEmail
        if (!orderEmail && order.userId) {
            const user = await prisma.user.findUnique({ where: { id: order.userId } })
            orderEmail = user?.email || null
        }

        if (email && orderEmail && email.toLowerCase() !== orderEmail.toLowerCase()) {
             return NextResponse.json({ error: "Email does not match order records" }, { status: 403 })
        }
        
        // Return limited details for public view
        return NextResponse.json({
            id: order.id,
            status: order.status,
            totalPrice: order.totalPrice,
            createdAt: order.createdAt,
            serviceName: order.service.name,
            gameName: order.service.game.name,
            gameSlug: order.service.game.slug,
            image: order.service.image || order.service.game.bgImage,
            guestEmail: order.guestEmail
        })

    } catch (error) {
        console.error("Error tracking order:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
