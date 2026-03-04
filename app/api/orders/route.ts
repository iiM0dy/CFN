import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET - Get user's orders
export async function GET(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where: any = { userId: session.user.id }
    if (status) {
      where.status = status
    }

    const orders = await prisma.serviceOrder.findMany({
      where,
      include: {
        service: {
          include: {
            game: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

// POST - Create new order
export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const order = await prisma.serviceOrder.create({
      data: {
        userId: session.user.id,
        serviceId: data.serviceId,
        totalPrice: data.totalPrice,
        quantity: data.quantity,
        platform: data.platform,
        completionMethod: data.completionMethod,
        completionSpeed: data.completionSpeed,
        promoCode: data.promoCode,
        discount: data.discount || 0,
        selectedOptions: data.selectedOptions,
        status: 'pending'
      },
      include: {
        service: {
          include: {
            game: true
          }
        }
      }
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
