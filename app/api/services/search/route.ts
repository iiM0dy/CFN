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
                },
                options: {
                    include: {
                        values: true
                    }
                }
            },
            take: 12 // Limit results
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
        console.error("Search error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
