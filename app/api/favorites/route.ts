import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET - Get user's favorites (services and games)
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch Service Favorites (Offers)
    const serviceFavoritesData = await prisma.$queryRaw<any[]>`
      SELECT fav.id, fav."serviceId", fav."createdAt",
             json_build_object(
               'id', s.id,
               'name', s.name,
               'image', s.image,
               'basePrice', s."basePrice",
               'game', json_build_object(
                 'name', g.name,
                 'slug', g.slug
               ),
               'options', (
                 SELECT json_agg(
                   json_build_object(
                     'id', so.id,
                     'label', so.label,
                     'type', so.type,
                     'required', so.required,
                     'minValue', so."minValue",
                     'maxValue', so."maxValue",
                     'values', (
                       SELECT json_agg(
                         json_build_object(
                           'id', sov.id,
                           'label', sov.label,
                           'value', sov.value,
                           'priceModifier', sov."priceModifier"
                         )
                       ) FROM "ServiceOptionValue" sov WHERE sov."optionId" = so.id
                     )
                   )
                 ) FROM "ServiceOption" so WHERE so."serviceId" = s.id
               )
             ) as service
      FROM "Favorite" fav
      JOIN "Service" s ON fav."serviceId" = s.id
      JOIN "GameService" g ON s."gameId" = g.id
      WHERE fav."userId" = ${session.user.id}
      ORDER BY fav."createdAt" DESC
    `

    // Process service prices
    const services = serviceFavoritesData.map(fav => {
      const service = fav.service;
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

      const finalDisplayPrice = basePrice + minAdditionalPrice;

      return {
        ...fav,
        service: {
          ...service,
          displayPrice: finalDisplayPrice.toFixed(2),
          slug: encodeURIComponent(service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
        }
      };
    });

    // Fetch Game Favorites
    const gameFavorites = await prisma.gameFavorite.findMany({
      where: { userId: session.user.id },
      include: {
        game: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      services,
      games: gameFavorites.map(gf => ({
        id: gf.id,
        gameId: gf.gameId,
        createdAt: gf.createdAt,
        game: {
          ...gf.game,
          // Ensure we have a friendly slug
          slug: gf.game.slug || encodeURIComponent(gf.game.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
        }
      }))
    });
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

    const { serviceId, gameId } = await request.json()

    if (serviceId) {
      const favorite = await prisma.favorite.create({
        data: {
          userId: session.user.id,
          serviceId
        }
      })
      return NextResponse.json(favorite)
    } 
    
    if (gameId) {
      const favorite = await prisma.gameFavorite.create({
        data: {
          userId: session.user.id,
          gameId
        }
      })
      return NextResponse.json(favorite)
    }

    return NextResponse.json({ error: "Service ID or Game ID is required" }, { status: 400 })
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
    const gameId = searchParams.get('gameId')

    if (serviceId) {
      await prisma.favorite.delete({
        where: {
          userId_serviceId: {
            userId: session.user.id,
            serviceId
          }
        }
      })
      return NextResponse.json({ success: true })
    }

    if (gameId) {
      await prisma.gameFavorite.delete({
        where: {
          userId_gameId: {
            userId: session.user.id,
            gameId
          }
        }
      })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Service ID or Game ID is required" }, { status: 400 })
  } catch (error) {
    console.error("Error removing favorite:", error)
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 })
  }
}

