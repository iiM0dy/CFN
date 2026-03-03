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
        <section className="py-24 bg-[#0F0F0F]">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left Content */}
                    <div className="lg:w-1/2">
                        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                            Calculate Your Boost
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            TRANSPARENT PRICING. <br />
                            <span className="text-gray-500">INSTANT START.</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Select your current rank and desired goal to get an instant quote. Our Radiant-tier boosters are ready to start immediately upon order confirmation.
                        </p>

                        <div className="flex flex-col gap-6">
                            {/* Feature 1 */}
                            <div className="flex gap-4">
                                <div className="shrink-0 size-12 rounded-full bg-surface-dark border border-[#333] flex items-center justify-center text-primary">
                                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Fastest Completion</h4>
                                    <p className="text-gray-500 text-sm">We prioritize speed without compromising account safety.</p>
                                </div>
                            </div>
                            {/* Feature 2 */}
                            <div className="flex gap-4">
                                <div className="shrink-0 size-12 rounded-full bg-surface-dark border border-[#333] flex items-center justify-center text-primary">
                                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">VPN Protection</h4>
                                    <p className="text-gray-500 text-sm">All boosters use VPNs to match your location.</p>
                                </div>
                            </div>
                            {/* Feature 3 */}
                            <div className="flex gap-4">
                                <div className="shrink-0 size-12 rounded-full bg-surface-dark border border-[#333] flex items-center justify-center text-primary">
                                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Offline Mode</h4>
                                    <p className="text-gray-500 text-sm">Chat is disabled and status is set to offline.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Calculator Widget */}
                    <div className="lg:w-1/2 w-full relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />

                        <div className="relative bg-surface-dark border border-[#2A2A2A] rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-8 border-b border-[#2A2A2A] pb-4">
                                <h3 className="text-xl font-bold text-white">Quick Estimate</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Game</label>
                                    <select className="w-full bg-[#0B0B0B] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                                        <option>Valorant</option>
                                        <option>League of Legends</option>
                                        <option>CS2</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Server</label>
                                    <select className="w-full bg-[#0B0B0B] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                                        <option>North America</option>
                                        <option>Europe West</option>
                                        <option>Asia Pacific</option>
                                    </select>
                                </div>
                            </div>

                            {/* Current Rank Slider */}
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Current Rank</label>
                                    <span className="text-xs font-bold text-primary">{getLabel(currentRank)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={currentRank}
                                    onChange={(e) => setCurrentRank(Number(e.target.value))}
                                    className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                            {/* Desired Rank Slider */}
                            <div className="mb-8">
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Desired Rank</label>
                                    <span className="text-xs font-bold text-primary">{getLabel(desiredRank)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={desiredRank}
                                    onChange={(e) => setDesiredRank(Number(e.target.value))}
                                    className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                            {/* Estimated Price */}
                            <div className="bg-[#0B0B0B] rounded-xl p-4 flex items-center justify-between mb-6 border border-[#2A2A2A]">
                                <div>
                                    <span className="block text-xs text-gray-500 mb-1">Estimated Price</span>
                                    <span className="text-2xl font-bold text-white">${price}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 mb-1 text-right">Completion Time</span>
                                    <span className="text-sm font-bold text-white flex items-center gap-1">
                                        <svg className="size-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        ~{days} Day{days > 1 ? "s" : ""}
                                    </span>
                                </div>
                            </div>

                            <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 uppercase tracking-wider flex items-center justify-center gap-2">
                                Book Now
                                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
