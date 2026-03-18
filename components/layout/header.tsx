"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CFNLogo } from "@/components/layout/cfnboost-logo"
import { UserNav } from "@/components/layout/user-nav"
import { SearchModal } from "@/components/layout/search-modal"
import { CurrencySwitcher } from "@/components/layout/currency-switcher"
import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
    const pathname = usePathname()

    // Hide main header on admin routes
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    const [mobileOpen, setMobileOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuHoverTimeout = useRef<NodeJS.Timeout | null>(null)

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false)
    }, [pathname])

    // Lock scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    return (
        <>
            <nav
                className="sticky top-0 z-[100] border-b border-[#2A2A2A] bg-[#080808]/90 backdrop-blur-md"
                suppressHydrationWarning
            >
                <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
                    {/* Left: Logo + Site name */}
                    <div className="flex items-center gap-10">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="text-primary group-hover:text-white transition-colors duration-300">
                                <CFNLogo className="size-8" />
                            </div>
                            <span className="text-xl font-black tracking-tight uppercase font-cairo">
                                <span className="text-primary">CFN</span>
                                <span className="text-white">BOOST</span>
                            </span>
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

                        <div className="hidden sm:block">
                            <CurrencySwitcher />
                        </div>

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
                                            href="/become-pro"
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
                                            href="/legit"
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

                {/* Search Modal */}
                <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            </nav>

            {/* Mobile Nav Overlay - Moved outside <nav> for isolation */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 top-20 z-[90] md:hidden bg-[#080808] overflow-y-auto flex flex-col"
                        suppressHydrationWarning
                    >
                        <div className="flex flex-col p-6 pb-24 gap-8 w-full" suppressHydrationWarning>

                            {/* Search & Favorites Quick Access */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => {
                                        setMobileOpen(false);
                                        setSearchOpen(true);
                                    }}
                                    className="flex items-center justify-center gap-3 py-4 bg-[#1A1A1A] rounded-2xl border border-white/5 text-slate-300 active:bg-primary/20 transition-all"
                                >
                                    <span className="material-symbols-outlined text-lg">search</span>
                                    <span className="text-xs font-black uppercase tracking-widest">Search</span>
                                </button>
                                <Link
                                    href="/favorites"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-3 py-4 bg-[#1A1A1A] rounded-2xl border border-white/5 text-slate-300 active:bg-primary/20 transition-all"
                                >
                                    <span className="material-symbols-outlined text-lg">favorite</span>
                                    <span className="text-xs font-black uppercase tracking-widest">Saved</span>
                                </Link>
                            </div>

                            {/* Currency Selection - Mobile */}
                            <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-white/5 flex items-center justify-between">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Global Currency</span>
                                <CurrencySwitcher />
                            </div>

                            {/* Gaming Sections */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="h-px bg-primary/30 grow"></span>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Operational Sectors</span>
                                    <span className="h-px bg-primary/30 grow"></span>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { href: '/games/valorant/services', label: 'Valorant' },
                                        { href: '/games/lol/services', label: 'League of Legends' },
                                        { href: '/games/wow/services', label: 'World of Warcraft' },
                                        { href: '/games/throne-and-liberty/services', label: 'Throne and Liberty' }
                                    ].map((game) => (
                                        <Link
                                            key={game.href}
                                            href={game.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center justify-between p-5 bg-[#141414] border border-white/5 rounded-2xl active:border-primary/50"
                                        >
                                            <span className="text-sm font-black text-slate-200 uppercase tracking-wider">{game.label}</span>
                                            <span className="material-symbols-outlined text-primary text-sm">east</span>
                                        </Link>
                                    ))}
                                    <Link
                                        href="/games"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-center p-4 bg-primary/10 border border-primary/20 rounded-2xl text-primary text-[10px] font-black uppercase tracking-[0.3em]"
                                    >
                                        View All Games
                                    </Link>
                                </div>
                            </div>

                            {/* Information Hub */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="h-px bg-white/10 grow"></span>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Command Center</span>
                                    <span className="h-px bg-white/10 grow"></span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { href: '/about-us', label: 'About Us', icon: 'info' },
                                        { href: '/cashback', label: 'Cashback', icon: 'payments' },
                                        { href: '/blog', label: 'Journal', icon: 'article' },
                                        { href: '/become-pro', label: 'Careers', icon: 'group_add' },
                                        { href: '/legit', label: 'Security', icon: 'verified_user' },
                                        { href: '/contact', label: 'Support', icon: 'emergency_home' }
                                    ].map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex flex-col items-center gap-3 p-6 bg-[#111111] border border-white/5 rounded-2xl"
                                        >
                                            <span className="material-symbols-outlined text-primary/70">{item.icon}</span>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Community Actions */}
                            <Link
                                href="/become-pro"
                                onClick={() => setMobileOpen(false)}
                                className="bg-primary/5 border-l-2 border-primary p-6 rounded-r-2xl flex items-center justify-between"
                            >
                                <div>
                                    <h4 className="text-white text-xs font-black uppercase tracking-widest mb-1">Become a Booster</h4>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Join our elite field experts</p>
                                </div>
                                <span className="material-symbols-outlined text-primary">bolt</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
