"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import { Target, Swords, Trophy, Crosshair } from "lucide-react"

const heroImageUrl = "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png"

const HERO_GAME_CARDS = [
    { image: "/assets/val-char-bg.png", label: "Valorant", sub: "Rank Boost" },
    { image: "/assets/wow-char-bg.png", label: "WoW", sub: "Powerleveling" },
    { image: "/assets/lol-char-bg.png", label: "LoL", sub: "Duo Queue" },
    { image: "/assets/arc-char-bg.png", label: "ARC Raiders", sub: "Materials" },
]

// stagger variants
const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: "easeOut", delay: 0.3 + i * 0.08 },
    }),
}

export function HeroSection() {
    const [expertsCount, setExpertsCount] = useState(412)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        // ... (experts loop)
        const calculateExperts = () => {
            const now = new Date().getTime()
            const fifteenMinutes = 15 * 60 * 1000
            const seed = Math.floor(now / fifteenMinutes)
            const x = Math.sin(seed) * 10000
            const randomValue = 400 + Math.floor((x - Math.floor(x)) * 201)
            setExpertsCount(randomValue)
        }
        calculateExperts()
        const expInterval = setInterval(calculateExperts, 60000)

        // auto-cycle cards every 3 seconds
        const cardInterval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % HERO_GAME_CARDS.length)
        }, 3000)

        return () => {
            clearInterval(expInterval)
            clearInterval(cardInterval)
        }
    }, [])

    return (
        <header className="relative w-full min-h-[680px] flex items-center overflow-hidden border-b border-white/5 bg-[#050505]">

            {/* ── Backgrounds ── */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
                <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_50%,rgba(175,18,37,0.18)_0%,transparent_60%)]" />
                <div className="absolute inset-0 z-10 opacity-40 mix-blend-overlay bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 z-10 opacity-40 mix-blend-overlay">
                    <Image
                        src={heroImageUrl}
                        alt="Background"
                        fill
                        className="object-cover object-center transition-transform duration-[20s] scale-110 hover:scale-100"
                        priority
                    />
                </div>
            </div>

            {/* ── Content ── */}
            <div className="relative z-30 w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-20 flex flex-col justify-center h-full">

                {/* TOP: Text & Cards */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full mb-16 lg:mb-20">

                    {/* LEFT: staggered text + CTAs */}
                    <motion.div
                        className="flex-1 max-w-2xl w-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {/* badge */}
                        <motion.span
                            variants={fadeUp}
                            className="inline-block mb-4 rounded border border-primary/50 bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#FF2B49]"
                        >
                            Elite Gaming Services
                        </motion.span>

                        {/* heading */}
                        <motion.h1
                            variants={fadeUp}
                            className="hero-title text-5xl md:text-7xl lg:text-[88px] font-bold leading-[0.9] tracking-tighter text-white mb-6 drop-shadow-[0_0_30px_rgba(175,18,37,0.45)]"
                        >
                            ASCEND
                            <br />
                            <span className="hero-gradient-text">BEYOND LIMITS</span>
                        </motion.h1>

                        {/* subtitle */}
                        <motion.p
                            variants={fadeUp}
                            className="text-base md:text-lg text-gray-400 max-w-md font-medium leading-relaxed tracking-tight mb-10"
                        >
                            Professional boosting and progression services delivered by top-tier players.
                            <br />
                            Fast results. Secure process. Real progress.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/games"
                                className="group h-14 px-10 rounded-lg bg-primary hover:bg-primary-dark text-white font-black text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-300 shadow-[0_15px_30px_-5px_rgba(175,18,37,0.6)] hover:-translate-y-0.5 flex items-center gap-3 justify-center w-full sm:w-auto"
                            >
                                Explore Games
                                <svg className="size-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link
                                href="/become-pro"
                                className="h-14 px-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-300 backdrop-blur-md flex items-center justify-center w-full sm:w-auto"
                            >
                                Become a PRO
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT: 3D Auto-Rotating Stacked Carousel */}
                    <div className="hidden lg:flex relative w-[400px] h-[400px] shrink-0 items-center justify-center perspective-[1000px]">
                        {HERO_GAME_CARDS.map((c, i) => {
                            // Calculate position relative to active index
                            const total = HERO_GAME_CARDS.length;
                            // This math creates a continuous visual loop
                            let offset = (i - activeIndex) % total;
                            if (offset < 0) offset += total;
                            
                            // Define visual states based on the offset
                            const isFront = offset === 0;
                            const isSecond = offset === 1;
                            const isThird = offset === 2;
                            // Fourth item visually goes to the back
                            
                            // Map offsets to Framer Motion animate values
                            let scale = 1;
                            let y = 0;
                            let z = 0;
                            let rotateX = 0;
                            let opacity = 1;
                            let zIndex = 0;

                            if (isFront) {
                                scale = 1; y = 0; z = 0; rotateX = 0; opacity = 1; zIndex = 40;
                            } else if (isSecond) {
                                scale = 0.85; y = -40; z = -100; rotateX = 10; opacity = 0.7; zIndex = 30;
                            } else if (isThird) {
                                scale = 0.7; y = -70; z = -200; rotateX = 20; opacity = 0.3; zIndex = 20;
                            } else {
                                // hide the last one as it cycles back to the bottom
                                scale = 0.5; y = 20; z = -300; rotateX = -10; opacity = 0; zIndex = 10;
                            }

                            return (
                                <motion.div
                                    key={c.label}
                                    initial={false}
                                    animate={{ 
                                        scale, 
                                        y, 
                                        z, 
                                        rotateX,
                                        opacity,
                                        zIndex
                                    }}
                                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} // smooth, snappy spring-like transition
                                    className="absolute w-[260px] h-[340px] cursor-pointer"
                                    onClick={() => setActiveIndex(i)}
                                >
                                    <div className={`relative w-full h-full rounded-[24px] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-[0_30px_50px_-10px_rgba(0,0,0,0.8)] transition-all duration-300 ${isFront ? 'hover:border-primary/50 hover:shadow-[0_0_40px_rgba(175,18,37,0.3)]' : ''}`}>
                                        
                                        {c.image && (
                                            <Image 
                                                src={c.image} 
                                                alt={c.label} 
                                                fill 
                                                sizes="260px"
                                                className={`object-cover object-top transition-all duration-700 ${isFront ? 'opacity-90 scale-100' : 'opacity-40 scale-110 grayscale-50'}`} 
                                            />
                                        )}
                                        
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-0" />
                                        
                                        {/* Dynamic accent ring on front card only */}
                                        <div className={`absolute inset-0 rounded-[24px] pointer-events-none transition-all duration-700 ${isFront ? 'ring-2 ring-inset ring-primary/20' : 'ring-0 ring-transparent'}`} />

                                        {/* Top Badge */}
                                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md rounded border border-white/10 px-2.5 py-1 z-10">
                                            <span className="text-[10px] font-black text-white uppercase tracking-wider">{c.sub}</span>
                                        </div>

                                        {/* Bottom Details */}
                                        <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between z-10">
                                            <span className="font-cairo text-3xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-md">{c.label}</span>
                                            
                                            {/* Action icon for active card */}
                                            <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white transition-all duration-300 ${isFront ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0 translate-y-4 translate-x-4'}`}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>


            </div>
        </header>
    )
}
