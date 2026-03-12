"use client"

import { useState, useEffect } from "react"
import { X, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useCurrency } from "@/context/currency-context"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Game {
  id: string
  name: string
  slug: string
  image?: string
}

interface Service {
  id: string
  name: string
  basePrice: string
  image?: string
  game?: { name: string }
  displayPrice?: string
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { formatPrice } = useCurrency()
  const [hoveredGame, setHoveredGame] = useState<string | null>(null)
  const [games, setGames] = useState<Game[]>([])
  const [services, setServices] = useState<Record<string, Service[]>>({})
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Service[]>([])
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      loadGames()
    } else {
      document.body.style.overflow = 'unset'
      setHoveredGame(null)
      setSearchQuery("")
      setSearchResults([])
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const searchServices = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([])
        return
      }

      setSearching(true)
      try {
        const res = await fetch(`/api/services/search?q=${encodeURIComponent(searchQuery)}`)
        if (res.ok) {
          const data = await res.json()
          setSearchResults(data)
        }
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setSearching(false)
      }
    }

    const debounce = setTimeout(searchServices, 300)
    return () => clearTimeout(debounce)
  }, [searchQuery])

  const loadGames = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/games')
      if (res.ok) {
        const data = await res.json()
        setGames(data)
      }
    } catch (error) {
      console.error('Error loading games:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadServicesForGame = async (gameSlug: string) => {
    if (services[gameSlug]) return

    try {
      const res = await fetch(`/api/games/${gameSlug}/services`)
      if (res.ok) {
        const data = await res.json()
        setServices(prev => ({ ...prev, [gameSlug]: data }))
      }
    } catch (error) {
      console.error('Error loading services:', error)
    }
  }

  const handleGameHover = (gameSlug: string) => {
    setHoveredGame(gameSlug)
    loadServicesForGame(gameSlug)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md"
        style={{ zIndex: 9999 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 lg:bottom-auto lg:top-0 lg:left-0 lg:right-0 bg-[#0B0B0B] flex flex-col"
        style={{ zIndex: 10000, height: '100dvh', maxHeight: '100dvh' }}
        onKeyDown={handleKeyDown}
      >
        <div className="lg:max-h-[90vh] flex flex-col h-full bg-[#0B0B0B]">
          {/* Header */}
          <div className="border-b border-white/5 bg-[#0B0B0B] shrink-0">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex flex-col">
                  <h2 className="text-xl font-black text-white uppercase tracking-tight">Search Nexus</h2>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] -mt-1">Operational Query System</p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-auto flex items-center justify-center size-10 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-primary/50 transition-all active:scale-95"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary pointer-events-none transition-transform group-focus-within:scale-110">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Query services, missions, or games..."
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    <X className="size-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden max-w-7xl mx-auto w-full">
            {/* Left Sidebar - Games List (Hidden on result view on mobile if results exist) */}
            <div className={`w-full md:w-80 border-b md:border-b-0 md:border-r border-white/5 bg-[#0B0B0B] shrink-0 md:overflow-y-auto ${searchQuery ? 'hidden md:block' : 'block'}`}>
              <div className="p-4">
                <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 px-4 bg-primary/5 border-l-2 border-primary py-2 rounded-r-lg">Popular Games</h3>
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {games.map((game) => (
                      <button
                        key={game.id}
                        onMouseEnter={() => handleGameHover(game.slug)}
                        onClick={() => handleGameHover(game.slug)}
                        className={`w-full group flex items-center justify-between px-4 py-4 rounded-xl transition-all ${hoveredGame === game.slug
                          ? 'bg-primary/10 text-white border-l-2 border-primary'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                          }`}
                      >
                        <span className="text-sm font-black uppercase tracking-wider">{game.name}</span>
                        <ChevronRight className={`size-4 transition-transform ${hoveredGame === game.slug ? 'translate-x-1 text-primary' : 'opacity-0 group-hover:opacity-100'
                          }`} />
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-4">
                  <Link
                    href="/games"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 p-4 bg-white/5 border border-white/5 rounded-xl text-primary text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary/10 transition-all"
                  >
                    View All Games
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Panel - Services */}
            <div className={`flex-1 md:overflow-y-auto bg-[#080808]/50 ${!searchQuery && !hoveredGame ? 'hidden md:block' : 'block'}`}>
              <div className="p-6 md:p-8">
                {searchQuery ? (
                  /* Search Results */
                  searching ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Scanning Database...</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center gap-3 mb-8">
                        <span className="h-px bg-white/10 grow"></span>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 py-1.5 border border-white/5 rounded-full">
                          {searchResults.length} Match{searchResults.length !== 1 ? 'es' : ''} Found
                        </p>
                        <span className="h-px bg-white/10 grow"></span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResults.map((service: Service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.id}`}
                            onClick={onClose}
                            className="group p-5 bg-[#111111] border border-white/5 rounded-2xl hover:border-primary/40 hover:bg-[#161616] transition-all relative overflow-hidden"
                          >
                            <div className="relative z-10">
                              <span className="text-[9px] font-black text-primary uppercase tracking-widest block mb-1">{service.game?.name}</span>
                              <h4 className="font-bold text-white group-hover:text-white transition-colors uppercase tracking-tight leading-tight">
                                {service.name}
                              </h4>
                              <div className="mt-3 text-[11px] font-black text-white/50 group-hover:text-primary transition-colors">
                                {formatPrice(service.displayPrice ? Number(service.displayPrice) : Number(service.basePrice))}
                              </div>
                            </div>
                            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="material-symbols-outlined text-primary text-sm">north_east</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-20 animate-in zoom-in-95 duration-300">
                      <div className="size-20 bg-white/5 border border-white/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <svg className="size-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-300 mb-2 uppercase tracking-tight">Signal Lost</h3>
                      <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">No matching operations detected</p>
                    </div>
                  )
                ) : !hoveredGame ? (
                  /* Default State */
                  <div className="flex flex-col items-center justify-center h-full text-center py-20 opacity-40">
                    <div className="size-24 mb-6 rounded-3xl bg-white/5 flex items-center justify-center border border-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      <ChevronRight className="size-12 text-slate-700" />
                    </div>
                    <h3 className="text-lg font-black text-slate-500 mb-2 uppercase tracking-[0.2em]">Deployment Selection</h3>
                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Select a sector to view active missions</p>
                  </div>
                ) : services[hoveredGame] ? (
                  /* Game Services */
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center gap-6 mb-8">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                        {games.find(g => g.slug === hoveredGame)?.name}
                      </h3>
                      <span className="h-px bg-white/10 grow"></span>
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Sector Services</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
                      {services[hoveredGame].map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.id}`}
                          onClick={onClose}
                          className="group p-5 bg-[#111111] border border-white/5 rounded-2xl hover:border-primary/40 hover:bg-[#161616] transition-all relative"
                        >
                          <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors uppercase tracking-tight">
                            {service.name}
                          </h4>
                          <span className="absolute bottom-4 right-4 text-[10px] font-black text-primary group-hover:translate-x-0 transition-all">
                            {formatPrice(service.displayPrice ? Number(service.displayPrice) : Number(service.basePrice))}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Loading */
                  <div className="flex flex-col items-center justify-center h-full py-20 gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Accessing Sector...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
