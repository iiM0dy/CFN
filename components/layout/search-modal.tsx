"use client"

import { useState, useEffect } from "react"
import { X, ChevronRight } from "lucide-react"
import Link from "next/link"

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
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
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
        className="fixed top-0 left-0 right-0 bg-[#0B0B0B]"
        style={{ zIndex: 10000, height: '80vh' }}
        onKeyDown={handleKeyDown}
      >
      {/* Header */}
      <div className="border-b border-[#2a2a2a] bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold text-white">Browse Games & Services</h2>
            <button
              onClick={onClose}
              className="ml-auto flex items-center justify-center size-10 bg-[#141414] border border-[#2a2a2a] rounded-lg text-gray-400 hover:text-white hover:border-primary/50 transition-all"
            >
              <X className="size-5" />
            </button>
          </div>
          {/* Search Input */}
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for services..."
              autoFocus
              className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
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
      <div className="flex max-w-7xl mx-auto" style={{ height: 'calc(80vh - 180px)' }}>
        {/* Left Sidebar - Games List */}
        <div className="w-80 border-r border-[#2a2a2a] bg-[#0B0B0B] overflow-y-auto">
          <div className="p-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-4">Popular Games</h3>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-1">
                {games.map((game) => (
                  <Link
                    key={game.id}
                    href={`/games/${game.slug}/services`}
                    onClick={onClose}
                    onMouseEnter={() => handleGameHover(game.slug)}
                    className={`group flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                      hoveredGame === game.slug
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-300 hover:bg-[#141414] hover:text-white'
                    }`}
                  >
                    <span className="font-medium">{game.name}</span>
                    <ChevronRight className={`size-5 transition-transform ${
                      hoveredGame === game.slug ? 'translate-x-1' : ''
                    }`} />
                  </Link>
                ))}
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-[#2a2a2a]">
              <Link
                href="/games"
                onClick={onClose}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-primary hover:bg-primary/10 transition-all font-bold"
              >
                <span>View All Games</span>
                <ChevronRight className="size-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Panel - Services */}
        <div className="flex-1 overflow-y-auto bg-[#0B0B0B]">
          <div className="p-8">
            {searchQuery ? (
              /* Search Results */
              searching ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  <p className="text-sm text-gray-500 mb-6">
                    Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((service: any) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        onClick={onClose}
                        className="group px-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-lg hover:border-primary/50 hover:bg-[#1a1a1a] transition-all"
                      >
                        <h4 className="font-medium text-white group-hover:text-primary transition-colors">
                          {service.name}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">{service.game?.name}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <svg className="size-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-400 mb-2">No results found</h3>
                  <p className="text-gray-500">Try searching for something else</p>
                </div>
              )
            ) : !hoveredGame ? (
              /* Default State */
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <div className="size-20 mx-auto mb-4 rounded-full bg-[#141414] flex items-center justify-center">
                    <ChevronRight className="size-10 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Select a game</h3>
                  <p className="text-gray-500">Hover over a game to see available services</p>
                </div>
              </div>
            ) : services[hoveredGame] ? (
              /* Game Services */
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  {games.find(g => g.slug === hoveredGame)?.name} Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services[hoveredGame].map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      onClick={onClose}
                      className="group px-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-lg hover:border-primary/50 hover:bg-[#1a1a1a] transition-all"
                    >
                      <h4 className="font-medium text-white group-hover:text-primary transition-colors">
                        {service.name}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              /* Loading */
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
