"use client";

import Link from "next/link";
import { useState } from "react";
import { useCurrency } from "@/context/currency-context";

const ranks = [
    { name: "Iron", short: "Iron", color: "bg-zinc-500" },
    { name: "Bronze", short: "Bronze", color: "bg-amber-700" },
    { name: "Silver", short: "Silver", color: "bg-slate-400" },
    { name: "Gold", short: "Gold", color: "bg-yellow-500" },
    { name: "Platinum", short: "Plat", color: "bg-cyan-400" },
    { name: "Diamond", short: "Dia", color: "bg-purple-500" },
    { name: "Ascendant", short: "Asc", color: "bg-emerald-500" },
    { name: "Immortal", short: "Imm", color: "bg-rose-500" },
    { name: "Radiant", short: "Rad", color: "bg-yellow-200" },
];

const divisions = ["I", "II", "III"];

const addons = [
    { name: "Priority Order", price: "+20%", desc: "Start within 10 mins", icon: "bolt", free: false },
    { name: "Stream Games", price: "+15%", desc: "Watch us play live", icon: "videocam", free: false },
    { name: "Play With Booster", price: "+40%", desc: "Duo queue boost", icon: "sports_esports", free: false },
    { name: "Specific Agents", price: "Free", desc: "Choose your agents", icon: "group", free: true },
    { name: "Appear Offline", price: "Free", desc: "No one will know", icon: "visibility_off", free: true },
];

export default function ValorantBoostPage() {
    const { formatPrice } = useCurrency();
    const [currentRank, setCurrentRank] = useState(2); // Silver
    const [desiredRank, setDesiredRank] = useState(4); // Plat
    const [platform, setPlatform] = useState<"PC" | "Console">("PC");

    const getPrice = () => {
        const basePrice = 12.50;
        const rankDiff = Math.max(0, desiredRank - currentRank);
        return basePrice + (rankDiff * 18.50);
    };

    const getDays = () => {
        const rankDiff = Math.max(1, desiredRank - currentRank);
        return Math.ceil(rankDiff * 1.2);
    };

    return (
        <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col font-cairo overflow-x-hidden">
            <main className="grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-9 pb-12">
                {/* Tactical Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-9">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <span className="text-white">Valorant</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Operational Parameter Adjustment (Left Column) */}
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        {/* High-Impact Hero */}
                        <div className="relative overflow-hidden rounded-2xl bg-[#111111] border border-white/5 p-10 shadow-2xl group">
                            <div className="absolute right-0 top-0 h-full w-1/2 bg-linear-to-l from-primary/10 to-transparent group-hover:from-primary/20 transition-all duration-700" />
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 blur-[80px] rounded-full"></div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest">
                                    <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                                    Operation: Radiance Active
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase leading-tight">
                                    VALORANT <span className="text-primary">RANK AUGMENTATION</span>
                                </h1>
                                <p className="text-slate-400 max-w-xl text-base font-medium leading-relaxed">
                                    Secure your place among the elite. Our verified Radiant-tier operatives are standing by to execute your rank advancement protocol.
                                </p>

                                <div className="flex flex-wrap gap-6 mt-10">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-primary text-sm">verified</span> Elite Boosters
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-primary text-sm">vpn_lock</span> Multi-Hop VPN
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-primary text-sm">bolt</span> Rapid Deployment
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rank Selection Engine */}
                        <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 shadow-xl">
                            <div className="flex items-center gap-4 mb-10">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-black text-xs">01</span>
                                <h3 className="text-xl font-black text-white uppercase tracking-widest">ELO Coordinator</h3>
                            </div>

                            <div className="space-y-12">
                                {/* Current Status */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Current Tactical Division</label>
                                    <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-3">
                                        {ranks.map((r, i) => (
                                            <button
                                                key={r.name}
                                                onClick={() => setCurrentRank(i)}
                                                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all group ${currentRank === i ? 'border-primary bg-primary/5' : 'border-white/5 bg-[#161616] hover:border-slate-700'}`}
                                            >
                                                <div className={`size-8 rounded-lg mb-2 shadow-lg ${r.color} ${currentRank === i ? 'ring-4 ring-primary/20' : ''}`} />
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${currentRank === i ? 'text-white' : 'text-slate-500'}`}>{r.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-center py-2">
                                    <span className="material-symbols-outlined text-primary/50 text-4xl">swap_vert</span>
                                </div>

                                {/* Desired Status */}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Desired Target Division</label>
                                    <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-3">
                                        {ranks.map((r, i) => (
                                            <button
                                                key={r.name}
                                                onClick={() => setDesiredRank(i)}
                                                disabled={i < currentRank}
                                                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${i < currentRank ? 'opacity-30 cursor-not-allowed grayscale' : desiredRank === i ? 'border-primary bg-primary/5' : 'border-white/5 bg-[#161616] hover:border-slate-700'}`}
                                            >
                                                <div className={`size-8 rounded-lg mb-2 shadow-lg ${r.color} ${desiredRank === i ? 'ring-4 ring-primary/20' : ''}`} />
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${desiredRank === i ? 'text-white' : 'text-slate-500'}`}>{r.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Operational Augments */}
                        <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 shadow-xl">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-black text-xs">02</span>
                                <h3 className="text-xl font-black text-white uppercase tracking-widest">Augmentation Protocols</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {addons.map((addon) => (
                                    <button key={addon.name} className="flex flex-col items-start p-4 rounded-xl border-2 border-white/5 bg-[#161616] hover:border-primary/50 transition-all text-left relative group overflow-hidden h-full">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 blur-xl rounded-full group-hover:bg-primary/10"></div>
                                        <span className="material-symbols-outlined text-primary mb-3 text-xl">{addon.icon}</span>
                                        <h4 className="text-[10px] font-black text-white uppercase tracking-wider mb-1">{addon.name}</h4>
                                        <p className="text-[9px] text-slate-500 font-bold mb-3 uppercase leading-tight">{addon.desc}</p>
                                        <div className="mt-auto text-primary font-black text-[9px] tracking-widest uppercase">{addon.price}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mission Summary (Right Column) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors"></div>
                                <h3 className="text-xl font-black text-white uppercase tracking-widest mb-8">Mission Log</h3>

                                <div className="space-y-6 mb-10 border-b border-white/5 pb-10">
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="text-slate-500 font-black uppercase tracking-widest">Operation Type</span>
                                        <span className="text-white font-black uppercase tracking-tighter">VALORANT RANK UP</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="text-slate-500 font-black uppercase tracking-widest">Current Sector</span>
                                        <span className="text-white font-black">{ranks[currentRank].name}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="text-slate-500 font-black uppercase tracking-widest">Target Sector</span>
                                        <span className="text-primary font-black">{ranks[desiredRank].name}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="text-slate-500 font-black uppercase tracking-widest">ETA window</span>
                                        <span className="text-white font-black">~{getDays()} OPS DAYS</span>
                                    </div>
                                </div>

                                <div className="flex items-end justify-between mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Allocation</span>
                                        <span className="text-slate-600 text-[10px]">Secured Tactical Fund</span>
                                    </div>
                                    <span className="text-5xl font-black text-white tracking-tighter font-cairo">{formatPrice(getPrice())}</span>
                                </div>

                                <Link href="/checkout" className="w-full py-5 bg-primary hover:bg-[#8a0e1d] text-white font-black text-sm uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1 group">
                                    BUY NOW
                                    <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">shopping_cart</span>
                                </Link>

                                <div className="flex items-center justify-center gap-2 mt-8 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-xs text-primary">lock</span>
                                    Neural Link Encrypted (256-bit)
                                </div>
                            </div>

                            {/* Trust Pillar */}
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { icon: 'military_tech', label: 'ELITE SQUAD' },
                                    { icon: 'vpn_lock', label: 'E-VPN ACTIVE' },
                                    { icon: 'support_agent', label: 'HQ COMMS 24/7' },
                                    { icon: 'payments', label: 'VERIFIED' }
                                ].map((item) => (
                                    <div key={item.label} className="bg-[#111111] border border-white/5 rounded-xl p-4 flex flex-col items-center text-center gap-2 shadow-lg hover:border-primary/30 transition-all">
                                        <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
