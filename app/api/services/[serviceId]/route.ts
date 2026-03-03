import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: { serviceId: string } }
) {
    try {
        const { serviceId } = await params

        // Fetch service using raw query to avoid issues with missing models in client
        const services = await prisma.$queryRaw<any[]>`
            SELECT * FROM "Service" WHERE "id" = ${serviceId} LIMIT 1
        `
        const service = services[0]

        if (!service) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 })
        }

        // Fetch game separately using raw query to avoid slug selection issues
        const games = await prisma.$queryRaw<any[]>`
            SELECT name, slug FROM "GameService" WHERE id = ${service.gameId} LIMIT 1
        `
        const game = games[0] || { name: "Unknown", slug: "" }

        return NextResponse.json({ ...service, game })
    } catch (error) {
        console.error("Error fetching service:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
