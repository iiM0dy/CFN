"use client";

import Link from "next/link";
import { useState } from "react";

const ranks = [
    { name: "Bronze", short: "Bronze", color: "bg-amber-700" },
    { name: "Silver", short: "Silver", color: "bg-slate-400" },
    { name: "Gold", short: "Gold", color: "bg-yellow-500" },
    { name: "Platinum", short: "Plat", color: "bg-cyan-400" },
    { name: "Diamond", short: "Dia", color: "bg-purple-500" },
];

const divisions = ["I", "II", "III"];

const addons = [
    { name: "Priority Order", price: "+20%", desc: "Start within 10 mins", icon: "⚡", free: false },
    { name: "Stream Games", price: "+15%", desc: "Watch us play live", icon: "📺", free: false },
    { name: "Play With Booster", price: "+40%", desc: "Duo queue boost", icon: "🎮", free: false },
];

export default function ArcRaidersBoostPage() {
    const [currentRank, setCurrentRank] = useState(1); // Silver
    const [desiredRank, setDesiredRank] = useState(3); // Plat
    const [currentDiv, setCurrentDiv] = useState(2); // II
    const [desiredDiv, setDesiredDiv] = useState(3); // I
    const [currentRR, setCurrentRR] = useState(24);
    const [platform, setPlatform] = useState<"PC" | "Console">("PC");

    const getPrice = () => {
        // Simple mock price calculation
        const basePrice = 15;
        const rankDiff = Math.max(0, desiredRank - currentRank);
        const divDiff = (desiredDiv - currentDiv) * 2;
        return (basePrice + (rankDiff * 20) + divDiff).toFixed(2);
    };

    const getDays = () => {
        const rankDiff = Math.max(1, desiredRank - currentRank);
        return Math.ceil(rankDiff * 1.5);
    };

    return (
        <div className="relative flex min-h-screen flex-col bg-[#181112] text-white font-[family-name:var(--font-space-grotesk)]">
            <main className="flex-1 px-4 py-8 md:px-10 lg:px-20 max-w-[1440px] mx-auto w-full">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-8 text-sm">
                    <Link href="/" className="text-[#b89da1] hover:text-white transition-colors">Home</Link>
                    <span className="text-[#b89da1]">/</span>
                    <Link href="/services" className="text-[#b89da1] hover:text-white transition-colors">Services</Link>
                    <span className="text-[#b89da1]">/</span>
                    <span className="text-white font-medium">Arc Raiders</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                    {/* Left Column */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {/* Hero */}
                        <div className="relative overflow-hidden rounded-2xl bg-[#261c1d] border border-[#38292b] p-8 md:p-10">
                            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/10 to-transparent" />
                            <div className="relative z-10">
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Arc Raiders Boost</h1>
                                <p className="text-[#b89da1] max-w-xl text-lg">Survive against the ARC. Secure your loot and rank up with our elite Raiders.</p>
                                <div className="flex flex-wrap gap-4 mt-8">
                                    <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                        <span>Verified Raiders</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-full border border-blue-400/20">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                        <span>VPN Protection</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/20">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        <span>Starts in 10m</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 1: Platform & Region */}
                        <div className="rounded-xl border border-[#38292b] bg-[#261c1d] p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">1</div>
                                <h3 className="text-xl font-bold text-white">Platform &amp; Region</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#b89da1] mb-2">Platform</label>
                                    <div className="flex gap-2">
                                        <button onClick={() => setPlatform("PC")} className={`flex-1 py-3 rounded-lg border font-medium transition-all ${platform === "PC" ? "bg-primary border-primary text-white" : "bg-[#181112] border-[#38292b] text-gray-400 hover:border-gray-600"}`}>PC</button>
                                        <button onClick={() => setPlatform("Console")} className={`flex-1 py-3 rounded-lg border font-medium transition-all ${platform === "Console" ? "bg-primary border-primary text-white" : "bg-[#181112] border-[#38292b] text-gray-400 hover:border-gray-600"}`}>Console</button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#b89da1] mb-2">Region</label>
                                    <select className="w-full bg-[#181112] border border-[#38292b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                                        <option>North America</option>
                                        <option>Europe</option>
                                        <option>Asia Pacific</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Select Rank */}
                        <div className="rounded-xl border border-[#38292b] bg-[#261c1d] p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">2</div>
                                <h3 className="text-xl font-bold text-white">Select Rank</h3>
                            </div>
                            
                            {/* Current Rank */}
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-[#b89da1] uppercase tracking-wider mb-4">Current Rank</label>
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                                    {ranks.map((rank, idx) => (
                                        <button
                                            key={rank.name}
                                            onClick={() => setCurrentRank(idx)}
                                            className={`flex flex-col items-center p-2 rounded-lg border transition-all ${currentRank === idx ? "bg-primary/20 border-primary" : "bg-[#181112] border-[#38292b] hover:border-gray-600"}`}
                                        >
                                            <div className={`w-8 h-8 rounded-full ${rank.color} mb-2`} />
                                            <span className={`text-xs font-medium ${currentRank === idx ? "text-white" : "text-gray-400"}`}>{rank.short}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    {divisions.map((div, idx) => (
                                        <button
                                            key={div}
                                            onClick={() => setCurrentDiv(idx)}
                                            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${currentDiv === idx ? "bg-primary/20 border-primary text-white" : "bg-[#181112] border-[#38292b] text-gray-400 hover:border-gray-600"}`}
                                        >
                                            {div}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Desired Rank */}
                            <div>
                                <label className="block text-sm font-bold text-[#b89da1] uppercase tracking-wider mb-4">Desired Rank</label>
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                                    {ranks.map((rank, idx) => (
                                        <button
                                            key={rank.name}
                                            onClick={() => setDesiredRank(idx)}
                                            disabled={idx < currentRank}
                                            className={`flex flex-col items-center p-2 rounded-lg border transition-all ${desiredRank === idx ? "bg-primary/20 border-primary" : idx < currentRank ? "opacity-30 cursor-not-allowed bg-[#181112] border-[#38292b]" : "bg-[#181112] border-[#38292b] hover:border-gray-600"}`}
                                        >
                                            <div className={`w-8 h-8 rounded-full ${rank.color} mb-2`} />
                                            <span className={`text-xs font-medium ${desiredRank === idx ? "text-white" : "text-gray-400"}`}>{rank.short}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    {divisions.map((div, idx) => (
                                        <button
                                            key={div}
                                            onClick={() => setDesiredDiv(idx)}
                                            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${desiredDiv === idx ? "bg-primary/20 border-primary text-white" : "bg-[#181112] border-[#38292b] text-gray-400 hover:border-gray-600"}`}
                                        >
                                            {div}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Summary & Checkout */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            {/* Summary Card */}
                            <div className="rounded-xl border border-[#38292b] bg-[#261c1d] p-6 shadow-2xl">
                                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                                
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#38292b]">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full ${ranks[currentRank].color}`} />
                                        <div>
                                            <span className="block text-xs text-[#b89da1]">Current Rank</span>
                                            <span className="font-bold text-white">{ranks[currentRank].name} {divisions[currentDiv]}</span>
                                        </div>
                                    </div>
                                    <div className="text-[#b89da1]">→</div>
                                    <div className="flex items-center gap-3 text-right">
                                        <div>
                                            <span className="block text-xs text-[#b89da1]">Desired Rank</span>
                                            <span className="font-bold text-primary">{ranks[desiredRank].name} {divisions[desiredDiv]}</span>
                                        </div>
                                        <div className={`w-10 h-10 rounded-full ${ranks[desiredRank].color}`} />
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    {addons.map((addon) => (
                                        <div key={addon.name} className="flex items-center justify-between p-3 rounded-lg bg-[#181112] border border-[#38292b] cursor-pointer hover:border-gray-600 transition-all group">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">{addon.icon}</span>
                                                <div>
                                                    <span className="block text-sm font-medium text-white group-hover:text-primary transition-colors">{addon.name}</span>
                                                    <span className="block text-[10px] text-[#b89da1]">{addon.desc}</span>
                                                </div>
                                            </div>
                                            <span className={`text-xs font-bold ${addon.free ? "text-green-400" : "text-[#b89da1]"}`}>{addon.price}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-[#181112] rounded-xl p-4 flex items-center justify-between mb-6 border border-[#38292b]">
                                    <div>
                                        <span className="block text-xs text-[#b89da1] mb-1">Total Price</span>
                                        <span className="text-2xl font-bold text-white">${getPrice()}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xs text-[#b89da1] mb-1">Completion Time</span>
                                        <span className="text-sm font-bold text-white flex items-center justify-end gap-1">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            ~{getDays()} Days
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full bg-primary hover:bg-[#8a0e1d] text-white font-bold py-4 rounded-lg shadow-[0_0_20px_rgba(175,18,37,0.4)] transition-all uppercase tracking-wider flex items-center justify-center gap-2 group">
                                    Secure Boost
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </button>
                                <p className="text-center text-xs text-[#b89da1] mt-4 flex items-center justify-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    Secure SSL Encrypted Checkout
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
