import { prisma } from "./lib/prisma"

async function checkServices() {
  const arcRaiders = await prisma.gameService.findFirst({
    where: { name: "ARC Raiders" },
    include: {
      services: {
        include: {
          options: {
            include: {
              values: true
            },
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  })

  console.log(JSON.stringify(arcRaiders, null, 2))
}

checkServices()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
