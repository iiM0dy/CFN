"use client"

import Link from "next/link"

interface GameCardProps {
    game: {
        id: string
        name: string
        description: string
        bgImage: string
        charImage: string | null
        href: string
        isActive: boolean
    }
}

export function GameCard({ game }: GameCardProps) {
    const handleClick = (e: React.MouseEvent) => {
        if (!game.isActive) {
            e.preventDefault()
        }
    }

    return (
        <Link
            href={game.isActive ? game.href : '#'}
            onClick={handleClick}
            className={`group relative block aspect-[4/5.5] rounded-2xl overflow-hidden bg-surface-dark border border-white/5 transition-all duration-500 ${
                game.isActive 
                    ? 'hover:border-primary/50 cursor-pointer' 
                    : 'cursor-not-allowed opacity-75'
            }`}
        >
            {/* Coming Soon Badge */}
            {!game.isActive && (
                <div className="absolute top-4 right-4 z-30 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-white text-xs font-bold uppercase tracking-wider">
                    Coming Soon
                </div>
            )}

            {/* Background Image - Static */}
            <div className="absolute inset-0">
                <img
                    src={game.bgImage}
                    alt={game.name}
                    className={`w-full h-full object-cover ${!game.isActive ? 'grayscale' : ''}`}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            </div>

            {/* Character Image - Anchored to bottom right with no gaps */}
            {game.charImage && (
                <div className={`absolute inset-0 z-10 pointer-events-none transition-transform duration-700 ease-out origin-bottom-right ${
                    game.isActive ? 'group-hover:scale-110' : 'grayscale'
                }`}>
                    <img
                        src={game.charImage}
                        alt={`${game.name} Character`}
                        className="w-full h-full object-contain object-right-bottom scale-[1.1] translate-y-[15%] translate-x-[8%]"
                    />
                </div>
            )}

            {/* Bottom content - Left-aligned again for better readability with bottom-right character */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-1">{game.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{game.description}</p>
                {game.isActive ? (
                    <div className="flex items-center text-primary text-sm font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Select Service
                        <svg className="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                ) : (
                    <div className="text-gray-500 text-sm font-medium">
                        Available Soon
                    </div>
                )}
            </div>
        </Link>
    )
}
