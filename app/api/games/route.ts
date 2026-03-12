import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const games = await prisma.gameService.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' }
        })

        return NextResponse.json(games)
    } catch (error) {
        console.error("Error fetching games:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
