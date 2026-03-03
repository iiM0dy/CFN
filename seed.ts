import { prisma } from "./lib/prisma"

async function seed() {
  const gamesData = [
    {
      name: "Valorant",
      slug: "valorant",
      description: "Rank Boost, Coaching",
      href: "/games/valorant/services",
      bgImage: "/assets/val-cat-bg.png",
      charImage: "/assets/val-char-bg.png",
      isPopular: true,
      services: [
        {
          name: "Rank Boosting",
          description: "Reclaim your ELO with our professional boosters.",
          basePrice: 10.00,
          platforms: ["PC", "Console"],
          completionMethods: ["Solo", "Duo"],
        },
        {
          name: "Placement Matches",
          description: "Get the best start to your season.",
          basePrice: 15.00,
          platforms: ["PC", "Console"],
          completionMethods: ["Solo", "Duo"],
        }
      ]
    },
    {
      name: "League of Legends",
      slug: "lol",
      description: "Rank, Duo Queue",
      href: "/games/lol/services",
      bgImage: "/assets/lol-cat-bg.png",
      charImage: "/assets/lol-char-bg.png",
      isPopular: true,
      services: [
        {
          name: "Ranked Solo/Duo",
          description: "Climb the ladder in Summoner's Rift.",
          basePrice: 8.00,
          platforms: ["PC"],
          completionMethods: ["Solo", "Duo"],
        }
      ]
    },
    {
      name: "World of Warcraft",
      slug: "wow",
      description: "Gold, Powerleveling",
      href: "/games/wow/services",
      bgImage: "/assets/wow-cat-bg.png",
      charImage: "/assets/wow-char-bg.png",
      isPopular: true,
      services: [
        {
          name: "Powerleveling 1-70",
          description: "Reach max level in no time.",
          basePrice: 50.00,
          platforms: ["PC"],
          completionMethods: ["Solo"],
        }
      ]
    },
    {
      name: "Throne and Liberty",
      slug: "throne-and-liberty",
      description: "Account, Currency",
      href: "/games/throne-and-liberty/services",
      bgImage: "/assets/TAL-cat-bg.png",
      charImage: "/assets/TAL-char-bg.png",
      isPopular: true,
      services: [
        {
          name: "Leveling Service",
          description: "Quickly level up your character.",
          basePrice: 30.00,
          platforms: ["PC", "Console"],
          completionMethods: ["Solo"],
        }
      ]
    },
  ]

  console.log("Seeding games and services...")

  for (const game of gamesData) {
    const { services, ...gameInfo } = game
    const upsertedGame = await prisma.gameService.upsert({
      where: { name: game.name },
      update: gameInfo,
      create: gameInfo,
    })

    if (services) {
      for (const service of services) {
        await prisma.service.upsert({
          where: {
            // Since we don't have a unique constraint on service name + gameId yet,
            // we'll just use name for now or find it first
            id: (await prisma.service.findFirst({
              where: { name: service.name, gameId: upsertedGame.id }
            }))?.id || "new-id"
          },
          update: { ...service, gameId: upsertedGame.id },
          create: { ...service, gameId: upsertedGame.id },
        })
      }
    }
  }

  console.log("Seeding completed.")
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
