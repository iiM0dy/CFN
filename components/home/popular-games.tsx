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
        <section className="py-24 bg-[#050505]">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
                    <div>
                        <div className="h-px w-12 bg-primary mb-5" />
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-3 uppercase">
                            Dominant Titles
                        </h2>
                        <p className="text-gray-500 max-w-xl text-sm md:text-base font-medium">
                            Select your specialization. Our team holds multiple world-first records across all major competitive titles.
                        </p>
                    </div>
                    <Link
                        href="/games"
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary hover:text-white transition-colors group"
                    >
                        Browse more games
                        <svg
                            className="size-4 group-hover:translate-x-1.5 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {games.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </div>
        </section>
    )
}
