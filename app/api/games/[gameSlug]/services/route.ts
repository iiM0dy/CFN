import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ gameSlug: string }> }
) {
    try {
        const { gameSlug } = await params

        // Find the game first
        const game = await prisma.gameService.findUnique({
            where: { slug: gameSlug }
        })

        if (!game) {
            return NextResponse.json({ error: "Game not found" }, { status: 404 })
        }

        // Fetch services for this game
        const services = await prisma.service.findMany({
            where: { gameId: game.id },
            orderBy: { name: 'asc' }
        })

        return NextResponse.json(services)
    } catch (error) {
        console.error("Error fetching services:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
