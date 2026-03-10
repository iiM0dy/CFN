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
      {/* Search & Filter */}
      <section className="w-full max-w-7xl sticky top-[72px] z-40 mb-12">
        <div className="bg-[#1A1A1A]/80 backdrop-blur-md border border-[#2A2A2A] rounded-xl p-4 shadow-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors text-xl">
              🔍
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
              placeholder="Search for a game..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === c
                    ? "bg-primary text-white font-bold shadow-lg shadow-primary/20 border border-primary"
                    : "bg-[#0B0B0B] hover:bg-[#2A2A2A] text-gray-300 hover:text-white border border-[#2A2A2A]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        {filteredGames.map((game) => {
          const handleClick = (e: React.MouseEvent) => {
            if (!game.isActive) {
              e.preventDefault()
            }
          }

          return (
            <Link
              key={game.id}
              href={game.isActive ? game.href : '#'}
              onClick={handleClick}
              className={`group relative h-96 rounded-2xl overflow-hidden border border-white/5 bg-[#1A1A1A] block transition-all duration-500 ${
                game.isActive 
                  ? 'hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(175,18,37,0.4)] hover:border-primary/50 cursor-pointer' 
                  : 'cursor-not-allowed opacity-75'
              }`}
            >
            {/* Coming Soon Badge */}
            {!game.isActive && (
              <div className="absolute top-4 right-4 z-30 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-white text-xs font-bold uppercase tracking-wider">
                Coming Soon
              </div>
            )}

            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={game.bgImage}
                alt={game.name}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  game.isActive ? 'group-hover:scale-105' : 'grayscale'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            </div>

            {/* Character Image */}
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

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-20">
              <h3 className="text-2xl font-black text-white mb-1 italic tracking-tighter uppercase drop-shadow-lg">
                {game.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-1 group-hover:text-gray-200 transition-colors">
                {game.description}
              </p>
              {game.isActive ? (
                <div className="flex items-center text-primary text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  View Services
                  <svg
                    className="size-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              ) : (
                <div className="text-gray-500 text-sm font-medium">
                  Available Soon
                </div>
              )}
            </div>
          </Link>
        )})}

        {/* Request Game Card */}
        <div className="h-96 rounded-2xl border border-dashed border-[#2A2A2A] bg-[#0B0B0B]/50 flex flex-col items-center justify-center text-center p-6 gap-4 hover:bg-[#0B0B0B] transition-all duration-300 cursor-pointer group hover:border-primary/50">
          <div className="size-16 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:scale-110 transition-all duration-300 text-3xl font-light border border-white/5 group-hover:border-primary/30">
            +
          </div>
          <div>
            <h3 className="text-xl font-black text-white mb-2 italic tracking-tighter uppercase">
              Game Not Found?
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-[200px] mx-auto">
              Request a new title and we&apos;ll notify you when elite boosters
              are ready.
            </p>
            <span className="text-primary text-xs font-black uppercase tracking-widest border-b-2 border-transparent group-hover:border-primary transition-all">
              Request Game
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
