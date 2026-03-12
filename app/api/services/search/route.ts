import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const query = searchParams.get('q')

        if (!query || query.length < 2) {
            return NextResponse.json([])
        }

        // Search services by name or game name
        const services = await prisma.service.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        game: {
                            isActive: true,
                            name: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            },
            include: {
                game: {
                    select: {
                        name: true,
                        slug: true
                    }
                }
            },
            take: 12 // Limit results
        })

        return NextResponse.json(services)
    } catch (error) {
        console.error("Search error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
