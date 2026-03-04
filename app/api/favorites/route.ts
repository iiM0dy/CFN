import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET - Get user's favorites
export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      include: {
        service: {
          include: {
            game: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(favorites)
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 })
  }
}

// POST - Add to favorites
export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { serviceId } = await request.json()

    if (!serviceId) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 })
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        serviceId
      }
    })

    return NextResponse.json(favorite)
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Already in favorites" }, { status: 400 })
    }
    console.error("Error adding favorite:", error)
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 })
  }
}

// DELETE - Remove from favorites
export async function DELETE(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const serviceId = searchParams.get('serviceId')

    if (!serviceId) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 })
    }

    await prisma.favorite.delete({
      where: {
        userId_serviceId: {
          userId: session.user.id,
          serviceId
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing favorite:", error)
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 })
  }
}
