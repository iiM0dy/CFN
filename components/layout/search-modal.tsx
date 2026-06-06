"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronRight, ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import { useCurrency } from "@/context/currency-context"
import { CFNLogo } from "@/components/layout/cfnboost-logo"

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
  game?: { name: string; slug?: string }
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
  const [featuredService, setFeaturedService] = useState<Service | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      loadGames()
      loadFeatured()
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

  const loadFeatured = async () => {
    try {
      const res = await fetch('/api/featured-services')
      if (res.ok) {
        const data = await res.json()
        const list = data?.data ?? data
        if (Array.isArray(list) && list.length > 0) {
          setFeaturedService(list[0])
        }
      }
    } catch { /* silent */ }
  }

  const loadServicesForGame = async (gameSlug: string) => {
    if (services[gameSlug]) return

    try {
      const res = await fetch(`/api/games/${gameSlug}/services`)
      if (res.ok) {
        const data = await res.json()
        setServices(prev => ({ ...prev, [gameSlug]: Array.isArray(data) ? data : data?.services ?? data?.data ?? [] }))
      }
    } catch (error) {
      console.error('Error loading services:', error)
    }
  }

  const handleGameHover = (gameSlug: string) => {
    setHoveredGame(gameSlug)
    loadServicesForGame(gameSlug)
  }

  // Animation: keep mounted during exit so CSS transition can play
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setAnimating(true)
      // Force a layout read before adding the "open" class so the browser sees the initial state
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    } else if (visible) {
      setVisible(false)
    }
  }, [isOpen])

  const onTransitionEnd = useCallback(() => {
    if (!visible) setAnimating(false)
  }, [visible])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen && !animating) return null

  const getPrice = (s: Service) => formatPrice(s.displayPrice ? Number(s.displayPrice) : Number(s.basePrice))
  const activeGameName = games.find(g => g.slug === hoveredGame)?.name
  const activeServices = hoveredGame ? (services[hoveredGame] ?? []) : []
  const showSearchResults = searchQuery.length >= 2
  const featuredSlug = featuredService ? (featuredService as any).slug ?? (featuredService.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-')) : null
  const featuredImage = (featuredService as any)?.image ?? (featuredService as any)?.game?.bgImage ?? null
  const hasFeauredImage = featuredImage && (featuredImage.includes('://') || featuredImage.startsWith('/'))

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: 9999 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className={`fixed inset-0 flex flex-col transition-transform duration-300 ease-out ${visible ? 'translate-y-0' : '-translate-y-full'}`}
        style={{ zIndex: 10000, height: '100dvh', maxHeight: '100dvh' }}
        onKeyDown={handleKeyDown}
        onTransitionEnd={onTransitionEnd}
      >
        <div className="flex flex-col h-full bg-[#0a0a0a] lg:max-h-[85vh]">

          {/* ── HEADER ── */}
          <div className="border-b border-white/[0.06] shrink-0">
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-4">
              {/* Top row: logo + close */}
              <div className="flex items-center justify-between mb-4">
                <Link href="/" onClick={onClose} className="flex items-center gap-2 group" aria-label="CFNBoost home">
                  <CFNLogo className="size-6" />
                  <span className="font-cairo text-sm font-bold text-white uppercase tracking-tight">
                    CFN<span className="text-primary">Boost</span>
                  </span>
                </Link>
                <button
                  onClick={onClose}
                  aria-label="Close search"
                  className="flex items-center justify-center size-8 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Search input — full width */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search games, services, and support..."
                  autoFocus
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-11 pr-10 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-primary/40 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── CONTENT ── */}
          <div className="flex-1 overflow-y-auto md:overflow-hidden">
            <div className="max-w-[1400px] mx-auto w-full h-full flex flex-col md:flex-row">

              {/* === LEFT: Games list === */}
              <div className={`w-full md:w-60 lg:w-64 shrink-0 md:border-r border-white/[0.06] md:overflow-y-auto ${showSearchResults ? 'hidden md:block' : 'block'}`}>
                <div className="px-4 py-4 sm:px-5">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Popular Games</h3>
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="size-5 rounded-full border-2 border-white/[0.06] border-t-primary animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      {games.map((game) => {
                        const isActive = hoveredGame === game.slug
                        return (
                          <button
                            key={game.id}
                            onMouseEnter={() => handleGameHover(game.slug)}
                            onClick={() => handleGameHover(game.slug)}
                            className={`w-full group flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                              isActive
                                ? 'bg-primary text-white'
                                : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                            }`}
                          >
                            <span>{game.name}</span>
                            <ChevronRight className={`size-3.5 transition-all ${
                              isActive ? 'text-white/70' : 'opacity-0 group-hover:opacity-40'
                            }`} />
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* === MIDDLE: Services / Search results === */}
              <div className={`flex-1 md:overflow-y-auto border-b md:border-b-0 ${featuredService && !showSearchResults ? 'md:border-r border-white/[0.06]' : ''} ${!showSearchResults && !hoveredGame ? 'hidden md:block' : 'block'}`}>
                <div className="px-4 py-4 sm:px-6 sm:py-5">
                  {showSearchResults ? (
                    /* ── Search results ── */
                    searching ? (
                      <div className="flex flex-col items-center justify-center py-14 gap-3">
                        <div className="size-5 rounded-full border-2 border-white/[0.06] border-t-primary animate-spin" />
                        <span className="text-xs text-slate-500">Searching...</span>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="animate-in fade-in duration-300">
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                          {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                        </h3>
                        <div className="space-y-1">
                          {searchResults.map((service: Service) => (
                            <Link
                              key={service.id}
                              href={`/services/${service.id}`}
                              onClick={onClose}
                              className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                            >
                              <div className="min-w-0">
                                <span className="text-[10px] text-slate-600 block">{service.game?.name}</span>
                                <h4 className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors truncate">
                                  {service.name}
                                </h4>
                              </div>
                              <div className="flex items-center gap-3 shrink-0 ml-4">
                                <span className="text-sm font-bold text-white">{getPrice(service)}</span>
                                <ArrowRight className="size-3.5 text-slate-700 group-hover:text-primary transition-colors" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-14">
                        <Search className="size-6 text-slate-700 mx-auto mb-3" />
                        <p className="text-sm text-slate-400">No results found</p>
                        <p className="text-xs text-slate-600 mt-1">Try a different search term</p>
                      </div>
                    )
                  ) : !hoveredGame ? (
                    /* ── Default: no game selected ── */
                    <div className="flex flex-col items-center justify-center h-full text-center py-14 opacity-25">
                      <ChevronRight className="size-8 text-slate-600 mb-3" />
                      <p className="text-sm text-slate-500">Select a game to browse services</p>
                    </div>
                  ) : services[hoveredGame] ? (
                    /* ── Selected game services ── */
                    <div className="animate-in fade-in duration-200">
                      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                        {activeGameName} — Services
                      </h3>
                      {activeServices.length > 0 ? (
                        <div className="space-y-1">
                          {activeServices.map((service) => (
                            <Link
                              key={service.id}
                              href={`/services/${service.id}`}
                              onClick={onClose}
                              className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                            >
                              <h4 className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors truncate">
                                {service.name}
                              </h4>
                              <div className="flex items-center gap-3 shrink-0 ml-4">
                                <span className="text-sm font-bold text-white">{getPrice(service)}</span>
                                <ArrowRight className="size-3.5 text-slate-700 group-hover:text-primary transition-colors" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500 py-8 text-center">No services available for this game yet.</p>
                      )}
                    </div>
                  ) : (
                    /* ── Loading services ── */
                    <div className="flex items-center justify-center py-14">
                      <div className="size-5 rounded-full border-2 border-white/[0.06] border-t-primary animate-spin" />
                    </div>
                  )}
                </div>
              </div>

              {/* === RIGHT: Featured pick === */}
              {featuredService && !showSearchResults && (
                <div className="w-full md:w-64 lg:w-72 shrink-0 md:overflow-y-auto">
                  <div className="px-4 py-4 sm:px-5">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Featured Service</h3>

                    <Link
                      href={`/services/${featuredSlug}`}
                      onClick={onClose}
                      className="group block rounded-xl overflow-hidden border border-white/[0.06] bg-[#0c0c0c] hover:border-primary/30 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {/* Image */}
                      <div className="relative h-36 overflow-hidden bg-[#111]">
                        {hasFeauredImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={featuredImage}
                            alt=""
                            aria-hidden="true"
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#1a0a0a] to-[#0d0505] flex items-center justify-center">
                            <span className="font-cairo text-3xl font-bold text-white/[0.05]">
                              {featuredService.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                          {(featuredService as any)?.game?.name ?? "Service"}
                        </span>
                        <h4 className="font-cairo text-[14px] font-bold text-white uppercase tracking-tight leading-snug mb-3 group-hover:text-primary transition-colors">
                          {featuredService.name}
                        </h4>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-600 uppercase tracking-wider">From</span>
                            <div className="text-lg font-bold text-white tracking-tight">{getPrice(featuredService)}</div>
                          </div>
                          <div className="min-h-[34px] px-3 flex items-center rounded-lg bg-primary/10 border border-primary/20 text-xs font-semibold text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all gap-1">
                            View
                            <ArrowRight className="size-3" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
