"use client"

import { useState } from "react"
import Link from "next/link"

interface GameService {
  id: string
  name: string
  description: string
  bgImage: string
  charImage: string | null
  href: string
  isActive: boolean
}

interface GameGridProps {
  initialGames: GameService[]
  categories: string[]
}

export function GameGrid({ initialGames, categories }: GameGridProps) {
  const [activeCategory, setActiveCategory] = useState("All Games")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredGames = initialGames.filter((g) => {
    // Note: Since GameService doesn't have a category field in the schema yet,
    // we show all games for "All Games" and mock some filtering for demonstration.
    // You should add a 'category' field to your Prisma schema for real filtering.
    const matchesCategory = activeCategory === "All Games"
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* Search & Filter Bar */}
      <section className="w-full mb-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide w-full lg:w-auto">
            {categories.map((c) => {
              let icon = "grid_view";
              if (c === "FPS") icon = "target";
              if (c === "MOBA") icon = "swords";
              if (c === "MMO") icon = "shield";
              if (c === "Action") icon = "military_tech";

              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${activeCategory === c
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                    : "bg-[#161616] border-white/5 text-slate-500 hover:text-white hover:border-white/10"
                    }`}
                >
                  <span className="material-symbols-outlined text-[14px]">{icon}</span>
                  {c === "All Games" ? "All Operations" : c}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80 group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm group-focus-within:text-primary transition-colors">search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161616] border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-slate-600 text-sm font-medium transition-all"
              placeholder="Search assets..."
              type="text"
            />
          </div>
        </div>
      </section>

      {/* Grid Header Info */}
      <div className="w-full flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <span className="h-6 w-1 bg-primary rounded-full"></span>
            Battlefield Selection
          </h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Select title to deploy professional experts</p>
        </div>
        <div className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block italic">
          Network Capacity: <span className="text-primary">{filteredGames.length} ACTIVE NODES</span>
        </div>
      </div>

      {/* Games Grid */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        {filteredGames.map((game) => {
          const handleClick = (e: React.MouseEvent) => {
            if (!game.isActive) e.preventDefault()
          }

          return (
            <Link
              key={game.id}
              href={game.isActive ? game.href : '#'}
              onClick={handleClick}
              className={`group relative aspect-3/4 rounded-xl overflow-hidden border border-white/5 bg-[#161616] transition-all duration-300 ${game.isActive
                ? 'hover:shadow-[0_0_20px_rgba(175,18,37,0.4)] hover:-translate-y-2 hover:border-primary cursor-pointer'
                : 'cursor-not-allowed opacity-75'
                }`}
            >
              {/* Coming Soon Badge */}
              {!game.isActive && (
                <div className="absolute top-4 right-4 z-30 px-3 py-1 bg-[#111]/80 backdrop-blur-md border border-white/5 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  Coming Soon
                </div>
              )}

              {/* Background Image */}
              <div
                className={`absolute inset-0 bg-cover object-[center_20%] transition-transform duration-1000 ${game.isActive ? 'group-hover:scale-105' : 'grayscale brightness-50 contrast-125'}`}
                style={{ backgroundImage: `url('${game.bgImage}')`, backgroundPosition: 'center 20%' }}
              />

              {/* Gradients */}
              <div className="absolute inset-0 bg-linear-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent" />
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Character Overlay */}
              {game.charImage && (
                <div className={`absolute inset-0 z-10 pointer-events-none transition-transform duration-700 ease-out origin-bottom-right ${game.isActive ? 'group-hover:scale-105 group-hover:-translate-y-2' : 'grayscale brightness-75'}`}>
                  <img
                    src={game.charImage}
                    alt={`${game.name} Character`}
                    className="w-full h-full object-contain object-bottom-right scale-[1.1] translate-y-[15%] translate-x-[8%]"
                  />
                </div>
              )}

              {/* Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="text-2xl font-black text-white mb-1 group-hover:text-primary transition-colors uppercase tracking-tight">
                  {game.name}
                </h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest line-clamp-1 italic">
                  {game.description || 'Verified Service Node'}
                </p>

                {game.isActive && (
                  <div className="mt-4 flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 group/btn">
                      <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase italic">
                        VIEW PACKAGES
                      </span>
                      <span className="material-symbols-outlined text-primary text-sm">
                        north_east
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          )
        })}

        {/* Request Game Card - Adjusted for new design */}
        <Link href="/contact">
          <div className="group relative aspect-3/4 rounded-2xl overflow-hidden border border-dashed border-white/10 bg-[#0B0B0B]/30 flex flex-col items-center justify-center text-center p-10 transition-all duration-500 hover:border-primary/40 hover:bg-[#0B0B0B] cursor-pointer hover:shadow-2xl">
            <div className="w-20 h-20 rounded-2xl bg-[#111111] border border-white/10 flex items-center justify-center mb-8 shadow-xl group-hover:border-primary/50 group-hover:bg-primary/5 group-hover:rotate-12 transition-all duration-700">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-primary text-4xl transition-colors">add_moderator</span>
            </div>
            <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter italic">Game Not Found?</h3>
            <p className="text-slate-600 text-[10px] font-black leading-relaxed mb-8 max-w-[220px] uppercase tracking-[0.2em] italic">Contact Us to add a new game for CFNBOOST services</p>
            <span className="px-6 py-2.5 bg-[#161616] border border-white/5 rounded-lg text-[9px] font-black text-slate-300 tracking-[0.3em] group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all uppercase italic">CONTACT US</span>
          </div>
        </Link>

      </section>
    </>
  )
}
