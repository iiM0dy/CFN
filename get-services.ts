import { prisma } from "./lib/prisma"

async function getServices() {
    try {
        const services = await prisma.service.findMany({
            include: {
                game: {
                    select: {
                        name: true
                    }
                }
            }
        })

        console.log('\n=== SERVICES LIST ===\n')
        services.forEach(service => {
            console.log(`Service: ${service.name}`)
            console.log(`Game: ${service.game.name}`)
            console.log(`Description: ${service.description || 'N/A'}`)
            console.log('---')
        })

        console.log(`\nTotal services: ${services.length}`)

    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

getServices()
