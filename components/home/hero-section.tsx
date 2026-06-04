"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Shield, HeadphonesIcon, CheckCircle } from "lucide-react"

const heroImageUrl = "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png"

const HERO_GAME_CARDS = [
    { image: "/assets/val-char-bg.png", label: "Valorant", sub: "Rank Boost", slug: "valorant", tagline: "Climb every rank with precision" },
    { image: "/assets/wow-char-bg.png", label: "WoW", sub: "Powerleveling", slug: "wow", tagline: "Conquer Azeroth effortlessly" },
    { image: "/assets/lol-char-bg.png", label: "LoL", sub: "Duo Queue", slug: "lol", tagline: "Rise through the ranks together" },
    { image: "/assets/arc-char-bg.png", label: "ARC Raiders", sub: "Materials", slug: "arc-raiders", tagline: "Stockpile rare resources" },
]

const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function HeroSection() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState(1)

    useEffect(() => {
        const panelInterval = setInterval(() => {
            setDirection(1)
            setActiveIndex((prev) => (prev + 1) % HERO_GAME_CARDS.length)
        }, 5000)

        return () => clearInterval(panelInterval)
    }, [])

    const goTo = (index: number) => {
        setDirection(index > activeIndex ? 1 : -1)
        setActiveIndex(index)
    }

    const activeCard = HERO_GAME_CARDS[activeIndex]

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

    const textSlide = {
        enter: { opacity: 0, y: 30 },
        center: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    }

    return (
        <header className="relative w-full min-h-[480px] sm:min-h-[600px] lg:min-h-[660px] flex items-center overflow-hidden border-b border-white/5 bg-[#050505]">

            {/* Backgrounds */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 z-20 bg-linear-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                <div className="absolute inset-0 z-20 bg-linear-to-r from-[#050505] via-[#050505]/70 to-transparent" />
                <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_80%_60%_at_65%_50%,rgba(175,18,37,0.07)_0%,transparent_70%)]" />
                <div className="absolute inset-0 z-10 opacity-25 mix-blend-overlay bg-[linear-gradient(0deg,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[48px_48px]" />
                <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay">
                    <Image
                        src={heroImageUrl}
                        alt="Background"
                        fill
                        className="object-cover object-center transition-transform duration-[20s] scale-110 hover:scale-100"
                        priority
                    />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-30 w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-12 sm:py-16 lg:py-20 flex flex-col justify-center h-full">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">

                    {/* LEFT: Text + CTAs */}
                    <motion.div
                        className="flex-1 max-w-2xl w-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {/* Eyebrow */}
                        <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-6">
                            <div className="h-px w-8 bg-primary" />
                            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
                                Fast, secure, player-focused
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            variants={fadeUp}
                            className="hero-title text-[42px] sm:text-5xl md:text-7xl lg:text-[84px] font-bold leading-[0.9] tracking-tighter text-white mb-4 sm:mb-6"
                        >
                            ASCEND
                            <br />
                            <span className="hero-gradient-text">BEYOND LIMITS</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={fadeUp}
                            className="text-sm sm:text-[15px] md:text-base text-gray-400 max-w-md leading-relaxed mb-6 sm:mb-8"
                        >
                            Professional boosting, coaching, and progression services for competitive players.
                            Fast delivery, secure checkout, and real support from start to finish.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-5 sm:mb-6">
                            <Link
                                href="/#games"
                                className="group min-h-[48px] px-6 sm:px-7 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_8px_24px_-4px_rgba(175,18,37,0.45)] hover:-translate-y-0.5 flex items-center gap-2.5 justify-center w-full sm:w-auto"
                            >
                                Explore Games
                                <svg className="size-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link
                                href="/become-pro"
                                className="min-h-[48px] px-6 sm:px-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-semibold text-sm uppercase tracking-wider transition-all duration-300 backdrop-blur-sm flex items-center justify-center w-full sm:w-auto"
                            >
                                Become a Pro
                            </Link>
                        </motion.div>

                        {/* Trust line */}
                        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] sm:text-xs text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <CheckCircle className="size-3.5 text-emerald-600" />
                                Secure checkout
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Shield className="size-3.5 text-emerald-600" />
                                Verified boosters
                            </span>
                            <span className="flex items-center gap-1.5">
                                <HeadphonesIcon className="size-3.5 text-emerald-600" />
                                24/7 support
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT: Game Showcase Card */}
                    <div className="hidden lg:flex relative w-[440px] h-[490px] shrink-0 items-center justify-center">
                        {/* Subtle ambient glow behind the card */}
                        <div className="absolute -inset-10 rounded-full bg-primary/[0.06] blur-[80px] pointer-events-none" />

                        {/* Main card — single container */}
                        <div className="relative w-full h-full rounded-[20px] overflow-hidden border border-white/[0.08] shadow-[0_16px_64px_-12px_rgba(0,0,0,0.5)]">
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
                                        alt={`${activeCard.label} - ${activeCard.sub}`}
                                        fill
                                        sizes="440px"
                                        className="object-cover object-[center_20%]"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/25 to-transparent" />
                                </motion.div>
                            </AnimatePresence>

                            {/* Panel Content */}
                            <div className="absolute inset-0 z-20 flex flex-col justify-between p-6">
                                <div className="flex items-center justify-between">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIndex}
                                            variants={textSlide}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            className="bg-primary/90 backdrop-blur-sm rounded-md px-3 py-1.5"
                                        >
                                            <span className="text-[11px] font-semibold text-white uppercase tracking-wider">{activeCard.sub}</span>
                                        </motion.div>
                                    </AnimatePresence>

                                    <div className="bg-black/40 backdrop-blur-md rounded-md px-2.5 py-1">
                                        <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
                                            {String(activeIndex + 1).padStart(2, '0')} / {String(HERO_GAME_CARDS.length).padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIndex}
                                            variants={textSlide}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                        >
                                            <h3 className="font-cairo text-[28px] font-bold text-white uppercase tracking-tighter leading-none mb-1">
                                                {activeCard.label}
                                            </h3>
                                            <p className="text-[13px] text-white/40 font-medium mb-5">
                                                {activeCard.tagline}
                                            </p>
                                            <Link
                                                href={`/${activeCard.slug}/services`}
                                                className="group inline-flex items-center gap-2.5 bg-white/10 hover:bg-primary border border-white/15 hover:border-primary rounded-lg px-5 py-3 min-h-[44px] backdrop-blur-sm transition-all duration-300"
                                            >
                                                <span className="text-[12px] font-semibold text-white uppercase tracking-wider">View Services</span>
                                                <svg className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </Link>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Navigation dots + arrows */}
                                    <div className="flex items-center justify-between mt-5">
                                        <div className="flex items-center gap-1.5">
                                            {HERO_GAME_CARDS.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => goTo(i)}
                                                    className="relative flex items-center justify-center p-1 -m-1"
                                                    aria-label={`Go to ${HERO_GAME_CARDS[i].label}`}
                                                >
                                                    <div
                                                        className="relative h-1.5 rounded-full transition-all duration-300"
                                                        style={{ width: i === activeIndex ? 22 : 6 }}
                                                    >
                                                        <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                                                            i === activeIndex ? 'bg-primary' : 'bg-white/20'
                                                        }`} />
                                                        {i === activeIndex && (
                                                            <motion.div
                                                                className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
                                                                initial={{ width: "0%" }}
                                                                animate={{ width: "100%" }}
                                                                transition={{ duration: 5, ease: "linear" }}
                                                                key={`progress-${activeIndex}`}
                                                            />
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={() => goTo((activeIndex - 1 + HERO_GAME_CARDS.length) % HERO_GAME_CARDS.length)}
                                                className="w-7 h-7 min-w-[36px] min-h-[36px] rounded-md bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all"
                                                aria-label="Previous game"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => goTo((activeIndex + 1) % HERO_GAME_CARDS.length)}
                                                className="w-7 h-7 min-w-[36px] min-h-[36px] rounded-md bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all"
                                                aria-label="Next game"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            </div>
        </header>
    )
}
