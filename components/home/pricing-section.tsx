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
        <section className="py-32 bg-[#080808] border-y border-white/5 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    {/* Left Content: Social Proof & Headlines */}
                    <div className="lg:w-1/2 space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                                Elite Results.<br />
                                <span className="text-primary">Zero Friction.</span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed font-medium">
                                Join over 12,000 satisfied players who have reached their peak performance with our specialized tactical assets.
                            </p>
                        </div>

                        {/* Trust Statistics Grid */}
                        <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                            <div>
                                <div className="text-3xl font-black text-white mb-1">98.4%</div>
                                <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Success Rate</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white mb-1">15m</div>
                                <div className="text-xs font-black text-slate-500 uppercase tracking-widest">Avg. Response</div>
                            </div>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-500">
                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                                    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h4 className="text-white font-black text-sm uppercase tracking-wider mb-2">Encrypted VPN</h4>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    Full protocol protection matching your local signature.
                                </p>
                            </div>
                            <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-500">
                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                                    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h4 className="text-white font-black text-sm uppercase tracking-wider mb-2">Instant Allocation</h4>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    Operational deployment within minutes of acquisition.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content: The Ultimate Estimator */}
                    <div className="lg:w-1/2 w-full relative">
                        {/* Decorative background glow */}
                        <div className="absolute -inset-4 bg-primary/10 blur-[100px] rounded-[40px] opacity-50" />

                        <div className="relative bg-[#0F0F0F]/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Quick Estimate</h3>
                            </div>

                            <div className="space-y-8">
                                {/* Parameters Selection */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Target Title</label>
                                        <div className="relative group">
                                            <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white hover:border-primary/50 transition-all outline-none appearance-none font-bold uppercase text-xs tracking-wider">
                                                <option>Valorant</option>
                                                <option>League of Legends</option>
                                                <option>CS2</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Region</label>
                                        <div className="relative group">
                                            <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white hover:border-primary/50 transition-all outline-none appearance-none font-bold uppercase text-xs tracking-wider">
                                                <option>North America</option>
                                                <option>Europe West</option>
                                                <option>Asia Pacific</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Rank Progress Area */}
                                <div className="bg-black/40 border border-white/5 rounded-2xl p-6 space-y-6">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Rank Progression</span>
                                        <div className="text-right">
                                            <div className="text-primary font-black text-sm uppercase tracking-tighter">
                                                {getLabel(currentRank)} → {getLabel(desiredRank)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] text-slate-600 font-bold uppercase"><span>Start</span><span>{getLabel(currentRank)}</span></div>
                                            <input
                                                type="range" min="1" max="100" value={currentRank}
                                                onChange={(e) => setCurrentRank(Number(e.target.value))}
                                                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] text-slate-600 font-bold uppercase"><span>Desired</span><span>{getLabel(desiredRank)}</span></div>
                                            <input
                                                type="range" min="1" max="100" value={desiredRank}
                                                onChange={(e) => setDesiredRank(Number(e.target.value))}
                                                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Results Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 group hover:bg-primary/10 transition-all">
                                        <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] block mb-1">Acquisition Cost</span>
                                        <div className="text-3xl font-black text-white tracking-tighter">${price}</div>
                                    </div>
                                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 transition-all">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-1">Time to Target</span>
                                        <div className="text-xl font-black text-white flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                                            {days} Day{days > 1 ? "s" : ""}
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-primary hover:bg-[#8a0e1d] text-white py-6 rounded-2xl font-black uppercase tracking-[0.4em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/40 flex items-center justify-center gap-4 group">
                                    Buy Now
                                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                                </button>

                                <p className="text-center text-[9px] font-bold text-slate-700 uppercase tracking-widest">Secure transaction via encrypted gateway</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
