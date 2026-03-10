"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AirwickLogo } from "@/components/layout/airwick-logo"
import { UserNav } from "@/components/layout/user-nav"
import { SearchModal } from "@/components/layout/search-modal"
import { useRef, useState } from "react"

export function Header() {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuHoverTimeout = useRef<NodeJS.Timeout | null>(null)

    return (
        <nav className="sticky top-0 z-50 border-b border-[#2A2A2A] bg-[#0B0B0B]/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Left: Logo + Site name */}
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="text-primary group-hover:text-white transition-colors duration-300">
                            <AirwickLogo className="size-8" />
                        </div>
                        <span className="text-xl font-bold tracking-tight uppercase">CFNboost</span>
                    </Link>
                </div>

                {/* Right: Favorites + Search + Auth + Main menu */}
                <div className="flex items-center gap-4">
                    {/* Favorites in header */}
                    <Link
                        href="/favorites"
                        className="hidden md:flex items-center justify-center size-9 rounded-full bg-[#1A1A1A] hover:bg-[#252525] text-gray-400 hover:text-red-400 transition-colors"
                        aria-label="Favorites"
                    >
                        <svg
                            className="size-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                            />
                        </svg>
                    </Link>

                    {/* Search in header */}
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="hidden md:flex items-center justify-center size-9 rounded-full bg-[#1A1A1A] hover:bg-[#252525] text-gray-400 hover:text-white transition-colors"
                        aria-label="Search"
                    >
                        <svg
                            className="size-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>

                    <UserNav />

                    {/* Main menu button (About / Cashback / Blog / Work with us) */}
                    <div
                        className="relative hidden md:block"
                        onMouseEnter={() => {
                            if (menuHoverTimeout.current) {
                                clearTimeout(menuHoverTimeout.current)
                                menuHoverTimeout.current = null
                            }
                            setMenuOpen(true)
                        }}
                        onMouseLeave={() => {
                            if (menuHoverTimeout.current) {
                                clearTimeout(menuHoverTimeout.current)
                            }
                            menuHoverTimeout.current = setTimeout(() => {
                                setMenuOpen(false)
                            }, 250)
                        }}
                    >
                        <button
                            onClick={() => setMenuOpen((open) => !open)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A] hover:bg-[#252525] text-sm font-medium text-gray-200 hover:text-white transition-colors"
                        >
                            <span>Menu</span>
                            <svg
                                className={`size-4 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-surface-dark border border-[#2A2A2A] shadow-xl shadow-black/50 p-4">
                                {/* Top links */}
                                <div className="space-y-2">
                                    <Link
                                        href="/about-us"
                                        onClick={() => setMenuOpen(false)}
                                        className="block text-sm font-medium text-gray-200 hover:text-primary transition-colors"
                                    >
                                        About us
                                    </Link>
                                    <Link
                                        href="/cashback"
                                        onClick={() => setMenuOpen(false)}
                                        className="block text-sm font-medium text-gray-200 hover:text-primary transition-colors"
                                    >
                                        Cashback
                                    </Link>
                                    <Link
                                        href="/blog"
                                        onClick={() => setMenuOpen(false)}
                                        className="block text-sm font-medium text-gray-200 hover:text-primary transition-colors"
                                    >
                                        Blog
                                    </Link>
                                    <Link
                                        href="/work-with-us"
                                        onClick={() => setMenuOpen(false)}
                                        className="block text-sm font-medium text-gray-200 hover:text-primary transition-colors"
                                    >
                                        Work with us
                                    </Link>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-white/10 my-3" />

                                {/* Trust & Safety / Contact */}
                                <div className="flex items-center justify-start gap-3">
                                    <Link
                                        href="/trust-and-safety"
                                        onClick={() => setMenuOpen(false)}
                                        className="px-3 py-1.5 rounded-full bg-[#1A1A1A] text-xs font-semibold text-gray-200 hover:bg-[#252525] hover:text-white transition-colors"
                                    >
                                        Trust &amp; Safety
                                    </Link>
                                    <Link
                                        href="/contact"
                                        onClick={() => setMenuOpen(false)}
                                        className="px-3 py-1.5 rounded-full bg-primary text-xs font-semibold text-black hover:bg-primary-dark transition-colors"
                                    >
                                        Contact us
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button className="md:hidden text-gray-400" onClick={() => setMobileOpen(!mobileOpen)}>
                        <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileOpen && (
                <div className="md:hidden border-t border-[#2A2A2A] bg-[#0B0B0B]/95 backdrop-blur-md">
                    <div className="flex flex-col p-6 gap-4">
                        <Link href="/games" onClick={() => setMobileOpen(false)} className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Explore Games →</Link>
                        <Link href="/games/valorant/services" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Valorant</Link>
                        <Link href="/games/lol/services" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">League of Legends</Link>
                        <Link href="/games/wow/services" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">World of Warcraft</Link>
                        <Link href="/games/throne-and-liberty/services" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Throne and Liberty</Link>
                        <div className="h-px bg-white/5 my-2" />
                        <Link href="/story" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Coaching</Link>
                        <Link href="/wall-of-fame" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Loyalty Program</Link>
                        <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">Become a Booster</Link>
                    </div>
                </div>
            )}

            {/* Search Modal */}
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </nav>
    )
}
