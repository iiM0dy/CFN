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
      <section className="w-full mb-12 sticky top-4 z-30">
        <div className="bg-[#161616]/80 backdrop-blur-xl border border-white/5 p-4 rounded-xl shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">search</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0B0B0B] border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg pl-12 py-3 text-slate-100 placeholder:text-slate-600 font-medium transition-all"
                placeholder="Search elite services (e.g. Valorant Immortal, LoL Challenger)..."
                type="text"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
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
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${activeCategory === c
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-100"
                      }`}
                  >
                    <span className="material-symbols-outlined text-sm">{icon}</span>
                    {c === "All Games" ? "All Categories" : c}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Header Info */}
      <div className="w-full flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 uppercase tracking-tight">Active Battlegrounds</h2>
          <p className="text-slate-500 text-sm mt-1">Select a title to view professional tier packages</p>
        </div>
        <div className="text-slate-400 text-sm font-medium hidden sm:block">
          Showing <span className="text-primary">{filteredGames.length}</span> Premium Games
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

              {/* Character Overlay (Optional integration with the new style) */}
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
        })}

        {/* Request Game Card - Adjusted for new design */}
        <div className="group relative aspect-3/4 rounded-xl overflow-hidden border border-dashed border-white/10 bg-[#0B0B0B]/50 flex flex-col items-center justify-center text-center p-8 transition-all duration-300 hover:border-primary/50 hover:bg-[#0B0B0B] cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500">
            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary text-3xl transition-colors">add_circle</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Game Not Found?</h3>
          <p className="text-slate-500 text-xs leading-relaxed mb-6 max-w-[200px] uppercase tracking-wider">Request a new title for elite boost services</p>
          <span className="text-[10px] font-bold text-primary tracking-widest border-b border-primary/0 group-hover:border-primary transition-all uppercase">Request Title</span>
        </div>
      </section>
    </>
  )
}
