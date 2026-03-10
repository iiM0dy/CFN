import { prisma } from "./lib/prisma"

async function setComingSoon() {
    try {
        // Set all games except ARC Raiders to inactive (coming soon)
        const result = await prisma.gameService.updateMany({
            where: {
                slug: {
                    not: 'arc-raiders'
                }
            },
            data: {
                isActive: false
            }
        })

        console.log(`✓ Updated ${result.count} games to "Coming Soon" status`)

        // Ensure ARC Raiders is active
        await prisma.gameService.update({
            where: {
                slug: 'arc-raiders'
            },
            data: {
                isActive: true
            }
        })

        console.log('✓ ARC Raiders is set as active')

        // Show current status
        const allGames = await prisma.gameService.findMany({
            select: {
                name: true,
                slug: true,
                isActive: true
            }
        })

        console.log('\nCurrent game status:')
        allGames.forEach(game => {
            console.log(`  ${game.name}: ${game.isActive ? '✓ Active' : '⏳ Coming Soon'}`)
        })

    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

setComingSoon()
