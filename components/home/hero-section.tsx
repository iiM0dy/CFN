"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, Variants } from "framer-motion"

const heroImageUrl = "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png"

const HERO_GAME_CARDS = [
    { image: "/assets/val-char-bg.png", label: "Valorant", sub: "Rank Boost", slug: "valorant", tagline: "Dominate every ranked match" },
    { image: "/assets/wow-char-bg.png", label: "WoW", sub: "Powerleveling", slug: "wow", tagline: "Conquer Azeroth effortlessly" },
    { image: "/assets/lol-char-bg.png", label: "LoL", sub: "Duo Queue", slug: "lol", tagline: "Climb the ladder together" },
    { image: "/assets/arc-char-bg.png", label: "ARC Raiders", sub: "Materials", slug: "arc-raiders", tagline: "Stockpile rare resources" },
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

export function HeroSection() {
    const [expertsCount, setExpertsCount] = useState(412)
    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward

    useEffect(() => {
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

        // Auto-cycle panels
        const panelInterval = setInterval(() => {
            setDirection(1)
            setActiveIndex((prev) => (prev + 1) % HERO_GAME_CARDS.length)
        }, 5000)

        return () => {
            clearInterval(expInterval)
            clearInterval(panelInterval)
        }
    }, [])

    const goTo = (index: number) => {
        setDirection(index > activeIndex ? 1 : -1)
        setActiveIndex(index)
    }

    const activeCard = HERO_GAME_CARDS[activeIndex]

    // Panel slide variants
    const panelVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? "100%" : "-100%",
            opacity: 0,
            scale: 1.05,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as any },
        },
        exit: (dir: number) => ({
            x: dir > 0 ? "-30%" : "30%",
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as any },
        }),
    }

    // Text animation variants
    const textSlide = {
        enter: { opacity: 0, y: 30 },
        center: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    }

    return (
        <header className="relative w-full min-h-[680px] flex items-center overflow-hidden border-b border-white/5 bg-[#050505]">

            {/* ── Backgrounds ── */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 z-20 bg-linear-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                <div className="absolute inset-0 z-20 bg-linear-to-r from-[#050505] via-[#050505]/70 to-transparent" />
                <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_50%,rgba(175,18,37,0.18)_0%,transparent_60%)]" />
                <div className="absolute inset-0 z-10 opacity-40 mix-blend-overlay bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px]" />
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

                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 w-full">

                    {/* LEFT: Text + CTAs */}
                    <motion.div
                        className="flex-1 max-w-2xl w-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >

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
                                href="/#games"
                                className="group h-14 px-10 rounded-lg bg-primary hover:bg-primary-dark text-white font-black text-[14px] uppercase tracking-[0.25em] transition-all duration-300 shadow-[0_15px_30px_-5px_rgba(175,18,37,0.6)] hover:-translate-y-0.5 flex items-center gap-3 justify-center w-full sm:w-auto"
                            >
                                Explore Games
                                <svg className="size-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link
                                href="/become-pro"
                                className="h-14 px-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-[14px] uppercase tracking-[0.25em] transition-all duration-300 backdrop-blur-md flex items-center justify-center w-full sm:w-auto"
                            >
                                Become a PRO
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT: Full-Bleed Sliding Panel */}
                    <div className="hidden lg:block relative w-[440px] h-[520px] shrink-0 rounded-2xl overflow-hidden">
                        {/* Panel Image — AnimatePresence for slide transitions */}
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={panelVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0"
                            >
                                <Image
                                    src={activeCard.image}
                                    alt={activeCard.label}
                                    fill
                                    sizes="440px"
                                    className="object-cover object-top"
                                    priority
                                />

                                {/* Overlays */}
                                <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/30 to-transparent" />
                                <div className="absolute inset-0 bg-linear-to-l from-transparent via-transparent to-[#050505]/40" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Border & glow */}
                        <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none z-10" />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/10 pointer-events-none z-10" />

                        {/* Panel Content Overlay — stays on top */}
                        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6">
                            {/* Top: Service badge */}
                            <div className="flex items-center justify-between">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        variants={textSlide}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-primary/50"
                                    >
                                        <span className="text-[14px] font-black text-white uppercase tracking-widest">{activeCard.sub}</span>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Card counter */}
                                <div className="bg-black/40 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/10">
                                    <span className="text-[14px] font-black text-white/60 uppercase tracking-widest">
                                        {String(activeIndex + 1).padStart(2, '0')} / {String(HERO_GAME_CARDS.length).padStart(2, '0')}
                                    </span>
                                </div>
                            </div>

                            {/* Bottom: Game info + CTA */}
                            <div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        variants={textSlide}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                    >
                                        <h3 className="font-cairo text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                                            {activeCard.label}
                                        </h3>
                                        <p className="text-sm text-white/60 font-medium mb-5 italic">
                                            {activeCard.tagline}
                                        </p>
                                        <Link
                                            href={`/${activeCard.slug}/services`}
                                            className="group inline-flex items-center gap-2 bg-white/10 hover:bg-primary border border-white/20 hover:border-primary rounded-xl px-5 py-3 backdrop-blur-md transition-all duration-300"
                                        >
                                            <span className="text-[14px] font-black text-white uppercase tracking-widest">View Services</span>
                                            <svg className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation dots + arrows */}
                                <div className="flex items-center justify-between mt-6">
                                    <div className="flex gap-2">
                                        {HERO_GAME_CARDS.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => goTo(i)}
                                                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                                                style={{ width: i === activeIndex ? 32 : 12 }}
                                            >
                                                <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                                                    i === activeIndex ? 'bg-primary' : 'bg-white/20'
                                                }`} />
                                                {/* Progress fill for active dot */}
                                                {i === activeIndex && (
                                                    <motion.div
                                                        className="absolute inset-y-0 left-0 bg-white/40 rounded-full"
                                                        initial={{ width: "0%" }}
                                                        animate={{ width: "100%" }}
                                                        transition={{ duration: 5, ease: "linear" }}
                                                        key={`progress-${activeIndex}`}
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Arrow controls */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => goTo((activeIndex - 1 + HERO_GAME_CARDS.length) % HERO_GAME_CARDS.length)}
                                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all backdrop-blur-sm"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => goTo((activeIndex + 1) % HERO_GAME_CARDS.length)}
                                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all backdrop-blur-sm"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    )
}
