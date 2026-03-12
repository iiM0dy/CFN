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
            where: {
                slug: gameSlug,
                isActive: true
            }
        })

        if (!game) {
            return NextResponse.json({ error: "Game not found" }, { status: 404 })
        }

        // Fetch services for this game
        const services = await prisma.service.findMany({
            where: { gameId: game.id },
            include: {
                options: {
                    include: {
                        values: true
                    }
                }
            },
            orderBy: { name: 'asc' }
        })

        // Calculate display price for each service
        const sanitizedServices = services.map(service => {
            let basePrice = Number(service.basePrice);
            let minAdditionalPrice = 0;

            if (service.options && service.options.length > 0) {
                service.options.forEach((opt: any) => {
                    if (opt.type === 'number' || opt.type === 'range') {
                        if (opt.minValue && opt.minValue > 0) {
                            if (service.name?.toLowerCase().includes('coin')) {
                                basePrice = (basePrice * opt.minValue) / 1000;
                            } else {
                                basePrice = basePrice * opt.minValue;
                            }
                        }
                    }
                    else if (opt.required && opt.values && opt.values.length > 0) {
                        const prices = opt.values.map((v: any) => Number(v.priceModifier || 0));
                        minAdditionalPrice += Math.min(...prices);
                    }
                });
            }

            return {
                ...service,
                displayPrice: (basePrice + minAdditionalPrice).toFixed(2)
            };
        });

        return NextResponse.json(sanitizedServices)
    } catch (error) {
        console.error("Error fetching services:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
