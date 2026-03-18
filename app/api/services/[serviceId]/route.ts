import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ serviceId: string }> }
) {
    try {
        const { serviceId } = await params

        // We receive the slugified name in the URL, e.g., "weapons" or "rank-boosting"
        // In the database, we need to find the service that matches this slug
        // Since we don't have a slug field on the Service model yet, we'll try to find by ID first,
        // then try to find by matching the name
        
        let service = await prisma.service.findUnique({
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

        // If not found by ID, try to find by name (slugified)
        if (!service) {
            // Un-slugify: "rank-boosting" -> "Rank Boosting"
            // This is a naive approach, but it works for simple cases. 
            // A better approach would be to add a `slug` field to the Service model.
            const services = await prisma.service.findMany({
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
            
            service = services.find(s => 
                encodeURIComponent(s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')) === serviceId
            ) || null;
        }

        if (!service) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 })
        }

        return NextResponse.json(service)
    } catch (error) {
        console.error("Error fetching service:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
