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
            className={`group relative aspect-3/4 rounded-xl overflow-hidden border border-white/5 bg-[#161616] transition-all duration-300 ${game.isActive
                    ? 'hover:shadow-[0_0_20px_rgba(175,18,37,0.4)] hover:-translate-y-2 hover:border-primary cursor-pointer'
                    : 'cursor-not-allowed opacity-75'
                }`}
        >
            {/* Coming Soon Badge */}
            {!game.isActive && (
                <div className="absolute top-4 right-4 z-30 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
                    Coming Soon
                </div>
            )}

            {/* Background Image */}
            <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${game.isActive ? 'group-hover:scale-110' : 'grayscale'}`}
                style={{ backgroundImage: `url('${game.bgImage}')` }}
            />

            {/* Gradients */}
            <div className="absolute inset-0 bg-linear-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent" />
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Character Overlay */}
            {game.charImage && (
                <div className={`absolute inset-0 z-10 pointer-events-none transition-transform duration-700 ease-out origin-bottom-right ${game.isActive ? 'group-hover:scale-105 group-hover:-translate-y-2' : 'grayscale'}`}>
                    <img
                        src={game.charImage}
                        alt={`${game.name} Character`}
                        className="w-full h-full object-contain object-bottom-right scale-[1.1] translate-y-[15%] translate-x-[8%]"
                    />
                </div>
            )}

            {/* Card Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors uppercase tracking-tight">
                    {game.name}
                </h3>
                <p className="text-slate-300 text-xs font-medium uppercase tracking-wider line-clamp-1">
                    {game.description || 'Professional Ranking'}
                </p>

                {game.isActive && (
                    <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-300">
                        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">VIEW PACKAGES</span>
                        <span className="material-symbols-outlined text-primary text-sm">north_east</span>
                    </div>
                )}
            </div>
        </Link>
    )
}
