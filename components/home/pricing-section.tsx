"use client"

import { useState } from "react"

export function PricingSection() {
    const [currentRank, setCurrentRank] = useState(40)
    const [desiredRank, setDesiredRank] = useState(70)

    const rankLabels: Record<number, string> = {
        10: "Iron 2", 15: "Iron 3",
        20: "Bronze 1", 25: "Bronze 2", 30: "Bronze 3",
        35: "Silver 1", 40: "Platinum 2", 45: "Platinum 3",
        50: "Gold 1", 55: "Gold 2", 60: "Gold 3",
        65: "Diamond 1", 70: "Diamond 3", 75: "Ascendant 1",
        80: "Ascendant 2", 85: "Ascendant 3", 90: "Immortal 1",
        95: "Immortal 3", 100: "Radiant",
    }

    const getLabel = (val: number) => {
        const keys = Object.keys(rankLabels).map(Number).sort((a, b) => a - b)
        let closest = keys[0]
        for (const k of keys) {
            if (k <= val) closest = k
        }
        return rankLabels[closest] || "Unranked"
    }

    const price = Math.max(15, ((desiredRank - currentRank) * 1.5)).toFixed(2)
    const days = Math.max(1, Math.round((desiredRank - currentRank) / 30))

    return (
        <section className="py-24 bg-[#080808] border-y border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] pointer-events-none" />
            <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    {/* Left Content */}
                    <div className="md:w-1/2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] font-black uppercase tracking-[0.25em]">
                            Smart Pricing Algorithm
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-none tracking-tighter italic">
                            Transparent.
                            <br />
                            <span className="text-primary">Instant.</span>
                            <br />
                            Proven.
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed font-medium">
                            Our dynamic pricing model accounts for current meta difficulty and regional demand, ensuring you get the best value for elite service.
                        </p>

                        <div className="flex flex-col gap-6">
                            {/* Feature 1 */}
                            <div className="flex gap-4">
                                <div className="shrink-0 size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                                    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12a5 5 0 015-5V5a3 3 0 00-6 0v2a5 5 0 01-5 5v5h10v-5a5 5 0 01-4-5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Encrypted VPN Routing</h4>
                                    <p className="text-gray-500 text-sm">
                                        Boosters match your region and play through encrypted tunnels for maximum safety.
                                    </p>
                                </div>
                            </div>
                            {/* Feature 2 */}
                            <div className="flex gap-4">
                                <div className="shrink-0 size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                                    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19a8 8 0 107-7h-7v7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Live Tracking Dashboard</h4>
                                    <p className="text-gray-500 text-sm">
                                        Watch your LP or MMR climb in real time with our private client.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Calculator Widget */}
                    <div className="md:w-1/2 w-full relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />

                        <div className="relative bg-surface-dark border border-[#2A2A2A] rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-8 border-b border-[#2A2A2A] pb-4">
                                <h3 className="text-xl font-bold text-white">Quick Estimate</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] mb-2">
                                        Target Title
                                    </label>
                                    <select className="w-full bg-[#0B0B0B] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                                        <option>Valorant</option>
                                        <option>League of Legends</option>
                                        <option>CS2</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] mb-2">
                                        Region / Cluster
                                    </label>
                                    <select className="w-full bg-[#0B0B0B] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                                        <option>North America</option>
                                        <option>Europe West</option>
                                        <option>Asia Pacific</option>
                                    </select>
                                </div>
                            </div>

                            {/* Rank Increment Slider (current + desired) */}
                            <div className="mb-8">
                                <div className="flex justify-between mb-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em]">
                                        Rank Increment
                                    </label>
                                    <span className="text-xs font-bold text-primary">
                                        {getLabel(currentRank)} → {getLabel(desiredRank)}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-3 text-[11px] font-medium text-gray-400">
                                    <div className="flex flex-col">
                                        <span className="mb-1 text-[10px] uppercase tracking-wide text-gray-500">
                                            Current
                                        </span>
                                        <input
                                            type="range"
                                            min="1"
                                            max="100"
                                            value={currentRank}
                                            onChange={(e) => setCurrentRank(Number(e.target.value))}
                                            className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="mb-1 text-[10px] uppercase tracking-wide text-gray-500">
                                            Desired
                                        </span>
                                        <input
                                            type="range"
                                            min="1"
                                            max="100"
                                            value={desiredRank}
                                            onChange={(e) => setDesiredRank(Number(e.target.value))}
                                            className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Estimated Price */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div className="bg-[#0B0B0B] rounded-xl p-4 border border-white/10 flex flex-col items-center text-center">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] mb-1">
                                        Quote Estimate
                                    </span>
                                    <span className="text-3xl font-black text-white tracking-tight">${price}</span>
                                </div>
                                <div className="bg-[#0B0B0B] rounded-xl p-4 border border-white/10 flex flex-col items-center text-center">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] mb-1">
                                        Lead Time
                                    </span>
                                    <span className="text-sm font-bold text-white flex items-center gap-2">
                                        <svg className="size-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        ~{days} Day{days > 1 ? "s" : ""}
                                    </span>
                                </div>
                            </div>

                            <button className="w-full h-16 bg-primary hover:bg-primary-dark text-white font-black text-xs md:text-sm rounded-lg shadow-2xl shadow-primary/40 transition-all hover:scale-[1.01] active:scale-[0.99] uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                                Initialize Deployment
                                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
