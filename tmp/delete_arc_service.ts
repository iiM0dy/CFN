import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const game = await prisma.gameService.findUnique({
        where: { slug: 'arc-raiders' }
    })

    if (!game) {
        console.log('Arc Raiders game not found')
        return
    }

    const service = await prisma.service.findFirst({
        where: {
            name: 'Rank Boosting',
            gameId: game.id
        }
    })

    if (!service) {
        console.log('Rank Boosting service not found for Arc Raiders')
    } else {
        // Delete options first due to relations
        await prisma.serviceOption.deleteMany({
            where: { serviceId: service.id }
        })

        await prisma.service.delete({
            where: { id: service.id }
        })
        console.log('Deleted Rank Boosting service from Arc Raiders')
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
