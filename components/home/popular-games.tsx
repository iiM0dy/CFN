import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"

export async function PopularGames() {
    // Use raw query to avoid issues with missing fields in Prisma client types
    const games = await prisma.$queryRaw<any[]>`
        SELECT * FROM "GameService" WHERE "isPopular" = true AND "isActive" = true LIMIT 4
    `

    if (games.length === 0) return null

    return (
        <section className="py-24 bg-[#0B0B0B] relative">
            {/* Top gradient line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="max-w-[1440px] mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 italic tracking-tighter">POPULAR GAMES</h2>
                        <p className="text-gray-400">Choose your battlefield and dominate.</p>
                    </div>
                    <Link href="/games" className="hidden sm:flex items-center gap-2 text-primary hover:text-white transition-colors font-bold uppercase tracking-widest text-sm">
                        View all games
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {games.map((game) => (
                        <Link
                            key={game.id}
                            href={game.href}
                            className="group relative block aspect-[4/5.5] rounded-2xl overflow-hidden bg-surface-dark border border-white/5 hover:border-primary/50 transition-all duration-500"
                        >
                            {/* Background Image - Static */}
                            <div className="absolute inset-0">
                                <Image
                                    src={game.bgImage}
                                    alt={game.name}
                                    fill
                                    className="object-cover"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                            </div>

                            {/* Character Image - Anchored to bottom right with no gaps */}
                            {game.charImage && (
                                <div className="absolute inset-0 z-10 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 origin-bottom-right">
                                    <Image
                                        src={game.charImage}
                                        alt={`${game.name} Character`}
                                        fill
                                        className="object-contain object-right-bottom scale-[1.5] translate-y-[22%] translate-x-[12%]"
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        priority
                                    />
                                </div>
                            )}

                            {/* Bottom content - Left-aligned again for better readability with bottom-right character */}
                            <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                                <h3 className="text-2xl font-bold text-white mb-1">{game.name}</h3>
                                <p className="text-sm text-gray-400 mb-4">{game.description}</p>
                                <div className="flex items-center text-primary text-sm font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    Select Service
                                    <svg className="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
