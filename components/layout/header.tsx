"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AirwickLogo } from "@/components/layout/airwick-logo"
import { CartSheet } from "@/components/cart/cart-sheet"
import { UserNav } from "@/components/layout/user-nav"
import { SearchModal } from "@/components/layout/search-modal"
import { useState } from "react"

export function Header() {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 border-b border-[#2A2A2A] bg-[#0B0B0B]/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Left: Logo + Nav */}
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="text-primary group-hover:text-white transition-colors duration-300">
                            <AirwickLogo className="size-8" />
                        </div>
                        <span className="text-xl font-bold tracking-tight uppercase">Airwick</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {/* Games dropdown */}
                        <div className="relative group h-20 flex items-center cursor-pointer">
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Games</span>
                            <div className="absolute top-full left-0 w-64 bg-surface-dark border border-[#2A2A2A] rounded-b-lg p-4 hidden group-hover:block shadow-xl shadow-black/50">
                                <Link href="/games/valorant/services" className="block py-2 text-gray-400 hover:text-primary transition-colors">Valorant</Link>
                                <Link href="/games/lol/services" className="block py-2 text-gray-400 hover:text-primary transition-colors">League of Legends</Link>
                                <Link href="/games/wow/services" className="block py-2 text-gray-400 hover:text-primary transition-colors">World of Warcraft</Link>
                                <Link href="/games/throne-and-liberty/services" className="block py-2 text-gray-400 hover:text-primary transition-colors">Throne and Liberty</Link>
                                <div className="h-px bg-white/5 my-2" />
                                <Link href="/games" className="block py-2 text-primary font-bold hover:text-white transition-colors">All Games →</Link>
                            </div>
                        </div>
                        <Link href="/story" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Coaching</Link>
                        <Link href="/wall-of-fame" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Loyalty Program</Link>
                        <Link href="/contact" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">Become a Booster</Link>
                    </div>
                </div>

                {/* Right: Search + Auth + Cart */}
                <div className="flex items-center gap-4">
                    {/* Search Button */}
                    <button 
                        onClick={() => setSearchOpen(true)}
                        className="hidden lg:flex items-center justify-center size-10 rounded-full bg-[#1A1A1A] hover:bg-[#252525] text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>

                    <CartSheet />
                    <UserNav />

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
