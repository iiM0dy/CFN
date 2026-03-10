import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { GameCard } from "./game-card"

export async function PopularGames() {
    // Get all games (both active and inactive) for display
    const games = await prisma.$queryRaw<any[]>`
        SELECT * FROM "GameService" ORDER BY "isActive" DESC, name ASC LIMIT 4
    `

    if (games.length === 0) return null

    return (
        <section className="py-20 bg-[#0B0B0B]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Popular Games</h2>
                        <p className="text-gray-400">Choose your battlefield and dominate</p>
                    </div>
                    <Link href="/games" className="hidden sm:flex items-center gap-2 text-primary hover:text-white transition-colors font-medium text-sm">
                        View all
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {games.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </div>
        </section>
    )
}
