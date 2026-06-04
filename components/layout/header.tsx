"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CFNLogo } from "@/components/layout/cfnboost-logo"
import { UserNav } from "@/components/layout/user-nav"
import { SearchModal } from "@/components/layout/search-modal"
import { CurrencySwitcher } from "@/components/layout/currency-switcher"
import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSession } from "next-auth/react"

const NAV_LINKS = [
    { href: "/#games", label: "Games" },
    { href: "/services", label: "Services" },
    { href: "/track-order", label: "Track Order" },
    { href: "/faq", label: "FAQ" },
    { href: "/blog", label: "Journal" },
    { href: "/become-pro", label: "Work with Us" },
    { href: "/cashback", label: "Cashback" },
    { href: "/legit", label: "Trust & Safety" },
    { href: "/contact", label: "Contact" },
    { href: "/story", label: "About Us" },
]

export function Header() {
    const pathname = usePathname()
    const { data: session } = useSession()

    if (pathname?.startsWith("/admin")) {
        return null
    }

    const [mobileOpen, setMobileOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const menuButtonRef = useRef<HTMLButtonElement>(null)

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false)
    }, [pathname])

    // Lock scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [mobileOpen])

    // Close desktop menu on Escape
    useEffect(() => {
        if (!menuOpen) return
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMenuOpen(false)
                menuButtonRef.current?.focus()
            }
        }
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [menuOpen])

    // Close desktop menu on outside click
    useEffect(() => {
        if (!menuOpen) return
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [menuOpen])

    // Close mobile menu on Escape
    useEffect(() => {
        if (!mobileOpen) return
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMobileOpen(false)
        }
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [mobileOpen])

    // @ts-ignore
    const demandsPassword = session?.user && session?.user?.hasPassword === false

    return (
        <>
            {demandsPassword && (
                <div className="bg-primary/20 border-b border-primary/30 p-2.5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[14px] z-[101] relative backdrop-blur-md">
                    <span className="text-white font-bold tracking-wide text-center">Create a password to access your account features</span>
                    <Link href="/set-password" className="px-4 py-1.5 bg-primary text-white font-black rounded hover:bg-primary/90 transition-all uppercase tracking-widest text-[14px] shadow-lg shadow-primary/20 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        Create new password
                    </Link>
                </div>
            )}

            <nav
                className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-xl"
                suppressHydrationWarning
            >
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">

                    {/* Left: Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="CFNBoost - Go to homepage">
                        <div className="text-primary group-hover:text-white transition-colors duration-300">
                            <CFNLogo className="size-7 sm:size-8" />
                        </div>
                        <span className="text-lg sm:text-xl font-black tracking-tight uppercase font-(family-name:--font-brand)">
                            <span className="text-primary">CFN</span>
                            <span className="text-white">BOOST</span>
                        </span>
                    </Link>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-1.5 sm:gap-2">

                        {/* Favorites */}
                        <Link
                            href="/favorites"
                            className="hidden md:flex items-center justify-center size-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-red-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            aria-label="Favorites"
                        >
                            <svg className="size-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                            </svg>
                        </Link>

                        {/* Search */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="hidden md:flex items-center justify-center size-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            aria-label="Search services"
                        >
                            <svg className="size-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Currency Switcher */}
                        <div className="hidden sm:flex">
                            <CurrencySwitcher />
                        </div>

                        {/* Auth / User */}
                        <UserNav />

                        {/* Desktop Menu Dropdown */}
                        <div className="relative hidden md:block" ref={menuRef}>
                            <button
                                ref={menuButtonRef}
                                onClick={() => setMenuOpen((o) => !o)}
                                className="flex items-center gap-1.5 px-3 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-sm font-medium text-gray-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                aria-expanded={menuOpen}
                                aria-haspopup="true"
                                aria-label="Navigation menu"
                            >
                                <span>Menu</span>
                                <svg
                                    className={`size-3.5 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {menuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                        className="absolute right-0 mt-2 w-64 rounded-xl bg-[#111] border border-white/[0.08] shadow-2xl shadow-black/60 p-2"
                                        role="menu"
                                    >
                                        <div className="space-y-0.5">
                                            {NAV_LINKS.map((link) => (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    onClick={() => setMenuOpen(false)}
                                                    className="block px-3 py-2 rounded-lg text-[13px] font-medium text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                                                    role="menuitem"
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Log In (visible only when logged out on mobile) */}
                        {!session && (
                            <Link
                                href="/login"
                                className="md:hidden flex items-center justify-center h-9 px-3.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-[12px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary shrink-0"
                                aria-label="Log in"
                            >
                                Log In
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden flex items-center justify-center size-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-expanded={mobileOpen}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        >
                            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>
                </div>

                <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-16 z-40 md:hidden bg-[#080808] overflow-y-auto"
                        suppressHydrationWarning
                    >
                        <div className="flex flex-col p-5 pb-24 gap-6 w-full" suppressHydrationWarning>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => { setMobileOpen(false); setSearchOpen(true) }}
                                    className="flex items-center justify-center gap-2.5 py-3.5 bg-[#141414] rounded-xl border border-white/[0.06] text-gray-300 active:bg-white/[0.06] transition-all focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                                >
                                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <span className="text-[13px] font-semibold uppercase tracking-wider">Search</span>
                                </button>
                                <Link
                                    href="/favorites"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-2.5 py-3.5 bg-[#141414] rounded-xl border border-white/[0.06] text-gray-300 active:bg-white/[0.06] transition-all focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                                >
                                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                                    </svg>
                                    <span className="text-[13px] font-semibold uppercase tracking-wider">Saved</span>
                                </Link>
                            </div>

                            {/* Currency */}
                            <div className="bg-[#141414] px-4 py-3 rounded-xl border border-white/[0.06] flex items-center justify-between">
                                <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Currency</span>
                                <CurrencySwitcher />
                            </div>

                            {/* Navigation Links */}
                            <div>
                                <h3 className="text-[11px] font-semibold text-gray-600 uppercase tracking-[0.2em] mb-3 px-1">Navigate</h3>
                                <div className="space-y-1">
                                    {[
                                        { href: "/#games", label: "Games" },
                                        { href: "/services", label: "All Services" },
                                        { href: "/track-order", label: "Track Order" },
                                        { href: "/faq", label: "FAQ" },
                                        { href: "/contact", label: "Support" },
                                    ].map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center justify-between px-4 py-3 bg-[#141414] border border-white/[0.06] rounded-xl active:bg-white/[0.06] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                                        >
                                            <span className="text-[13px] font-semibold text-gray-200">{item.label}</span>
                                            <svg className="size-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* More Links */}
                            <div>
                                <h3 className="text-[11px] font-semibold text-gray-600 uppercase tracking-[0.2em] mb-3 px-1">Company</h3>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {[
                                        { href: "/blog", label: "Journal" },
                                        { href: "/cashback", label: "Cashback" },
                                        { href: "/become-pro", label: "Work with Us" },
                                        { href: "/legit", label: "Trust & Safety" },
                                        { href: "/story", label: "About Us" },
                                    ].map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center justify-center py-3 bg-[#141414] border border-white/[0.06] rounded-xl text-[12px] font-semibold text-gray-400 active:bg-white/[0.06] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <Link
                                href="/become-pro"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-between px-5 py-4 bg-primary/10 border border-primary/20 rounded-xl active:bg-primary/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                            >
                                <div>
                                    <h4 className="text-white text-[13px] font-bold mb-0.5">Become a Booster</h4>
                                    <p className="text-gray-500 text-[11px] font-medium">Join our team of experts</p>
                                </div>
                                <svg className="size-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
