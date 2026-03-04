"use client"

import Link from "next/link"

const heroImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBRzeCjVHT9QvU5iuFnIQdzeOs-av89S_1lB5yoTaFyrc-EtsGzCvraXEA5GoRpwJAw-wLDTo1o05u_zG2Utbxxk10WUVXHJJze9XLxJkHOMM-YZhlQrlBPueceYHXeADva3CtmZ7iox5jx8C0D-hId2cucNZAO9py1RWkZ9pmA0QVlUvV8fB-kFjn6TKOgZQFA41xJsGQCeBytXOy77-TS0h5dzfkmCtWmbsW1SSB8DSdbylPqeTtdcDHHd87jCZvcMR9jtqPpu4NA"

export function HeroSection() {
    return (
        <header className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0B]/80 to-[#0B0B0B] z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(175,18,37,0.15),transparent_70%)] z-10" />
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat grayscale-[30%] opacity-60 scale-105"
                    style={{ backgroundImage: `url('${heroImageUrl}')` }}
                />
            </div>

            <div className="relative z-20 container mx-auto px-6 text-center max-w-7xl mt-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Top-Tier Boosting Service
                </div>

                {/* Heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tighter text-white mb-6 text-glow">
                    LEVEL UP <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">YOUR GAME</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    The premium marketplace for competitive rank boosting. Secure, anonymous, and elite service for top-tier gamers who demand perfection.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/games"
                        className="h-14 px-8 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-lg tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(175,18,37,0.4)] flex items-center justify-center gap-2 group"
                    >
                        Start Boosting
                        <svg className="size-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </Link>
                    <Link
                        href="/contact"
                        className="h-14 px-8 rounded-lg bg-[#1A1A1A] hover:bg-[#252525] border border-[#333] text-white font-bold text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <svg className="size-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        Jobs
                    </Link>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-white">50k+</span>
                        <span className="text-xs text-gray-500 uppercase tracking-widest">Orders Done</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-white">4.9/5</span>
                        <span className="text-xs text-gray-500 uppercase tracking-widest">Trust Rating</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-white">200+</span>
                        <span className="text-xs text-gray-500 uppercase tracking-widest">Active Boosters</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-white">24/7</span>
                        <span className="text-xs text-gray-500 uppercase tracking-widest">Live Support</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
