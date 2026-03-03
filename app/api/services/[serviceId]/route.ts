import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ serviceId: string }> }
) {
    try {
        const { serviceId } = await params

        // Fetch service with options
        const service = await prisma.service.findUnique({
            where: { id: serviceId },
            include: {
                game: {
                    select: {
                        name: true,
                        slug: true
                    }
                },
                options: {
                    include: {
                        values: {
                            orderBy: { order: 'asc' }
                        }
                    },
                    orderBy: { order: 'asc' }
                }
            }
        })

        if (!service) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 })
        }

        return NextResponse.json(service)
    } catch (error) {
        console.error("Error fetching service:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
