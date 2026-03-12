"use client"

import Link from "next/link"
import Image from "next/image"

const heroImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBRzeCjVHT9QvU5iuFnIQdzeOs-av89S_1lB5yoTaFyrc-EtsGzCvraXEA5GoRpwJAw-wLDTo1o05u_zG2Utbxxk10WUVXHJJze9XLxJkHOMM-YZhlQrlBPueceYHXeADva3CtmZ7iox5jx8C0D-hId2cucNZAO9py1RWkZ9pmA0QVlUvV8fB-kFjn6TKOgZQFA41xJsGQCeBytXOy77-TS0h5dzfkmCtWmbsW1SSB8DSdbylPqeTtdcDHHd87jCZvcMR9jtqPpu4NA"

export function HeroSection() {
    return (
        <header className="relative w-full min-h-[750px] flex items-center justify-center overflow-visible border-b border-white/5 bg-[#050505]">
            {/* Layered Backgrounds */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(175,18,37,0.18)_0%,transparent_60%)] z-10" />
                <div
                    className="absolute inset-0 opacity-40 mix-blend-overlay z-10 bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"
                />
                <div className="absolute inset-0 opacity-40 mix-blend-overlay z-10">
                    <Image
                        src={heroImageUrl}
                        alt="Background"
                        fill
                        className="object-cover object-center transition-transform duration-[20s] scale-110 hover:scale-100"
                        priority
                    />
                </div>
            </div>

            <div className="relative z-30 max-w-[1440px] mx-auto px-6 lg:px-10 flex flex-col items-center text-center py-24">
                {/* Main Heading */}
                <h1 className="hero-title text-5xl md:text-7xl lg:text-[88px] font-bold leading-[0.9] tracking-tighter text-white mb-6 drop-shadow-[0_0_30px_rgba(175,18,37,0.45)]">
                    ASCEND
                    <br />
                    <span className="hero-gradient-text">
                        BEYOND LIMITS
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
                    Professional boosting and progression services delivered by top-tier players.
                    <br />
                    Fast results. Secure process. Real progress.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <Link
                        href="/games"
                        className="group h-14 px-10 rounded-lg bg-primary hover:bg-primary-dark text-white font-black text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-300 shadow-[0_15px_30px_-5px_rgba(175,18,37,0.6)] hover:-translate-y-0.5 flex items-center gap-3"
                    >
                        Explore Games
                        <svg
                            className="size-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0-5 5m5-5H6" />
                        </svg>
                    </Link>
                    <Link
                        href="/services/valorant"
                        className="h-14 px-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-300 backdrop-blur-md flex items-center justify-center"
                    >
                        Become a PRO
                    </Link>
                </div>

                {/* Dashboard-style Live Stats */}
                <div className="w-full max-w-5xl translate-y-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden bg-[#050505]/80 backdrop-blur-xl">
                        <div className="p-6 bg-[#050505]/80 hover:bg-white/[0.02] transition-colors group flex flex-col items-center text-center gap-2">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] group-hover:text-primary transition-colors">
                                Global Orders
                            </p>
                            <span className="text-2xl font-black text-white tracking-tighter">52,109</span>
                            <span className="text-[10px] text-emerald-500 font-bold">+12%</span>
                        </div>
                        <div className="p-6 bg-[#050505]/80 hover:bg-white/[0.02] transition-colors group flex flex-col items-center text-center gap-2">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] group-hover:text-primary transition-colors">
                                Success Rate
                            </p>
                            <span className="text-2xl font-black text-white tracking-tighter">99.8%</span>
                            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Verified
                            </span>
                        </div>
                        <div className="p-6 bg-[#050505]/80 hover:bg-white/[0.02] transition-colors group flex flex-col items-center text-center gap-2">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] group-hover:text-primary transition-colors">
                                Elite Experts
                            </p>
                            <span className="text-2xl font-black text-white tracking-tighter">412</span>
                            <span className="text-[10px] text-primary font-bold">LIVE</span>
                        </div>
                        <div className="p-6 bg-[#050505]/80 hover:bg-white/[0.02] transition-colors group flex flex-col items-center text-center gap-2">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] group-hover:text-primary transition-colors">
                                Avg. Start Time
                            </p>
                            <span className="text-2xl font-black text-white tracking-tighter">14m</span>
                            <svg className="size-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
