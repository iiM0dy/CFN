"use client"

import Link from "next/link"

const heroImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBRzeCjVHT9QvU5iuFnIQdzeOs-av89S_1lB5yoTaFyrc-EtsGzCvraXEA5GoRpwJAw-wLDTo1o05u_zG2Utbxxk10WUVXHJJze9XLxJkHOMM-YZhlQrlBPueceYHXeADva3CtmZ7iox5jx8C0D-hId2cucNZAO9py1RWkZ9pmA0QVlUvV8fB-kFjn6TKOgZQFA41xJsGQCeBytXOy77-TS0h5dzfkmCtWmbsW1SSB8DSdbylPqeTtdcDHHd87jCZvcMR9jtqPpu4NA"

export function HeroSection() {
    return (
        <header className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0B0B0B]">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/60 via-[#0B0B0B]/80 to-[#0B0B0B] z-10" />
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat opacity-40"
                    style={{ backgroundImage: `url('${heroImageUrl}')` }}
                />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 py-32 text-center">
                {/* Main Heading */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                    LEVEL UP<br />
                    YOUR GAME
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    The premium marketplace for competitive rank boosting. Secure, anonymous, and elite service for top-tier gamers who demand perfection.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <Link
                        href="/games"
                        className="px-8 py-4 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                        Start Boosting
                        <svg className="size-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </Link>
                    <Link
                        href="/contact"
                        className="px-8 py-4 rounded-lg bg-[#1A1A1A] hover:bg-[#252525] border border-[#2a2a2a] text-white font-bold text-base transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <svg className="size-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        Jobs
                    </Link>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-[#2a2a2a]">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">50k+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Orders Done</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Trust Rating</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">200+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Active Boosters</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">24/7</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Live Support</div>
                    </div>
                </div>
            </div>
        </header>
    )
}
