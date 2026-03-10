"use client";

import Link from "next/link";
import { useState } from "react";

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
    { name: "Priority Order", price: "+20%", desc: "Start within 10 mins", icon: "⚡", free: false },
    { name: "Stream Games", price: "+15%", desc: "Watch us play live", icon: "📺", free: false },
    { name: "Play With Booster", price: "+40%", desc: "Duo queue boost", icon: "🎮", free: false },
    { name: "Specific Agents", price: "Free", desc: "Choose your agents", icon: "jq", free: true },
    { name: "Appear Offline", price: "Free", desc: "No one will know", icon: "👻", free: true },
];

export default function RankBoostConfiguratorPage() {
    const [currentRank, setCurrentRank] = useState(2); // Silver
    const [desiredRank, setDesiredRank] = useState(4); // Plat
    const [currentDiv, setCurrentDiv] = useState(2); // II
    const [desiredDiv, setDesiredDiv] = useState(3); // I
    const [currentRR, setCurrentRR] = useState(24);
    const [platform, setPlatform] = useState<"PC" | "Console">("PC");

    return (
        <div className="relative flex min-h-screen flex-col bg-[#181112] text-white font-[family-name:var(--font-space-grotesk)]">
            <main className="flex-1 px-4 py-8 md:px-10 lg:px-20 max-w-[1440px] mx-auto w-full">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-8 text-sm">
                    <Link href="/" className="text-[#b89da1] hover:text-white transition-colors">Home</Link>
                    <span className="text-[#b89da1]">/</span>
                    <Link href="/services" className="text-[#b89da1] hover:text-white transition-colors">Valorant</Link>
                    <span className="text-[#b89da1]">/</span>
                    <span className="text-white font-medium">Rank Boost</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                    {/* Left Column */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {/* Hero */}
                        <div className="relative overflow-hidden rounded-2xl bg-[#261c1d] border border-[#38292b] p-8 md:p-10">
                            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/10 to-transparent" />
                            <div className="relative z-10">
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Valorant Rank Boost</h1>
                                <p className="text-[#b89da1] max-w-xl text-lg">Reclaim your ELO. Select your current rank and desired rank to instantly calculate your boost price.</p>
                                <div className="flex flex-wrap gap-4 mt-8">
                                    <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                        <span>Verified Boosters</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-full border border-blue-400/20">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                        <span>VPN Protection</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/20">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        <span>Starts in 15m</span>
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
                                    <div className="grid grid-cols-2 gap-2">
                                        {(["PC", "Console"] as const).map((p) => (
                                            <button key={p} onClick={() => setPlatform(p)} className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-white transition-all ${platform === p ? 'border-primary bg-primary/10' : 'border-[#38292b] bg-[#181112] hover:border-primary/50'}`}>
                                                <span>{p === "PC" ? "💻" : "🎮"}</span>
                                                <span className="font-medium">{p}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#b89da1] mb-2">Server Region</label>
                                    <select className="w-full appearance-none rounded-lg border border-[#38292b] bg-[#181112] p-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                                        <option>North America</option>
                                        <option>Europe West</option>
                                        <option>Europe Nordic &amp; East</option>
                                        <option>Asia Pacific</option>
                                        <option>Latin America</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Rank Selection */}
                        <div className="rounded-xl border border-[#38292b] bg-[#261c1d] p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">2</div>
                                <h3 className="text-xl font-bold text-white">Select Ranks</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 relative">
                                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#261c1d] p-2 rounded-full border border-[#38292b] text-[#b89da1]">→</div>
                                {/* Current Rank */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-[#b89da1]">Current Rank</span>
                                        <span className="text-xs font-bold text-white bg-[#38292b] px-2 py-1 rounded">{ranks[currentRank]?.name} {divisions[currentDiv]}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {ranks.map((r, i) => (
                                            <button key={r.name} onClick={() => setCurrentRank(i)} className={`relative aspect-square flex flex-col items-center justify-center rounded-lg border p-2 transition-all ${currentRank === i ? 'border-primary bg-primary/10' : 'border-[#38292b] bg-[#181112] hover:border-[#b89da1]'}`}>
                                                <div className={`size-8 rounded-full ${r.color} mb-1 opacity-80`} />
                                                <span className="text-[10px] text-[#b89da1] uppercase font-bold">{r.short}</span>
                                                {currentRank === i && <span className="absolute top-1 right-1 text-primary text-sm">✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-[#b89da1] mb-2">Current Division</label>
                                        <div className="flex rounded-lg bg-[#181112] p-1 border border-[#38292b]">
                                            {divisions.map((d, i) => (
                                                <button key={d} onClick={() => setCurrentDiv(i)} className={`flex-1 py-1 text-xs font-bold rounded ${currentDiv === i ? 'text-white bg-[#261c1d] border border-[#38292b] shadow-sm' : 'text-[#b89da1] hover:text-white'}`}>{d}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <label className="text-xs font-medium text-[#b89da1]">Current RR (0-100)</label>
                                            <span className="text-xs font-bold text-white">{currentRR} RR</span>
                                        </div>
                                        <input className="w-full h-1.5 bg-[#181112] rounded-lg appearance-none cursor-pointer accent-primary" type="range" min={0} max={100} value={currentRR} onChange={(e) => setCurrentRR(Number(e.target.value))} />
                                    </div>
                                </div>
                                {/* Desired Rank */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-[#b89da1]">Desired Rank</span>
                                        <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded">{ranks[desiredRank]?.name} {divisions[desiredDiv]}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {ranks.map((r, i) => (
                                            <button key={r.name} onClick={() => i > currentRank && setDesiredRank(i)} className={`relative aspect-square flex flex-col items-center justify-center rounded-lg border p-2 transition-all ${i <= currentRank ? 'opacity-50 pointer-events-none border-[#38292b] bg-[#181112]' : desiredRank === i ? 'border-primary bg-primary/10' : 'border-[#38292b] bg-[#181112] hover:border-[#b89da1]'}`}>
                                                <div className={`size-8 rounded-full ${r.color} mb-1 opacity-80`} />
                                                <span className="text-[10px] text-[#b89da1] uppercase font-bold">{r.short}</span>
                                                {desiredRank === i && <span className="absolute top-1 right-1 text-primary text-sm">✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-[#b89da1] mb-2">Desired Division</label>
                                        <div className="flex rounded-lg bg-[#181112] p-1 border border-[#38292b]">
                                            {divisions.map((d, i) => (
                                                <button key={d} onClick={() => setDesiredDiv(i)} className={`flex-1 py-1 text-xs font-bold rounded ${desiredDiv === i ? 'text-primary bg-primary/20 border border-primary/50 shadow-sm' : 'text-[#b89da1] hover:text-white'}`}>{d}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Add-ons */}
                        <div className="rounded-xl border border-[#38292b] bg-[#261c1d] p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">3</div>
                                <h3 className="text-xl font-bold text-white">Customize Boost</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {addons.map((a) => (
                                    <label key={a.name} className="cursor-pointer group">
                                        <input type="checkbox" className="peer sr-only" />
                                        <div className="h-full flex flex-col rounded-lg border border-[#38292b] bg-[#181112] p-4 transition-all hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/10">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xl">{a.icon}</span>
                                                <span className="text-[#b89da1] peer-checked:text-primary">○</span>
                                            </div>
                                            <div className="font-bold text-white mb-1">{a.name}</div>
                                            <p className="text-xs text-[#b89da1] mb-3">{a.desc}</p>
                                            <div className="mt-auto flex justify-between items-center border-t border-[#38292b] pt-3">
                                                <span className={`text-xs font-medium ${a.free ? 'text-green-400' : 'text-[#b89da1]'}`}>{a.price}</span>
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* How it works + Reviews */}
                        <div className="flex flex-col gap-6">
                            <div className="rounded-xl border border-[#38292b] bg-[#261c1d] p-6">
                                <h3 className="text-lg font-bold text-white mb-4">How it works</h3>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    {[
                                        { icon: "🛒", step: "1. Book Your Boost", desc: "Select your details and checkout securely." },
                                        { icon: "🎮", step: "2. Booster Plays", desc: "A pro player logs in or joins your lobby." },
                                        { icon: "🏆", step: "3. Rank Up", desc: "Enjoy your new rank and rewards!" },
                                    ].map((s) => (
                                        <div key={s.step} className="p-4 rounded-lg bg-[#181112] border border-[#38292b]">
                                            <div className="bg-primary/20 w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-3">{s.icon}</div>
                                            <h4 className="font-bold text-white mb-1">{s.step}</h4>
                                            <p className="text-sm text-[#b89da1]">{s.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-xl border border-[#38292b] bg-[#261c1d] p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-white">Latest Reviews</h3>
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        {[...Array(5)].map((_, i) => <span key={i}>⭐</span>)}
                                        <span className="text-white text-sm font-bold ml-1">4.9/5</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="border-b border-[#38292b] pb-4">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold text-sm text-white">ViperMain99</span>
                                            <span className="text-xs text-[#b89da1]">2 hours ago</span>
                                        </div>
                                        <p className="text-sm text-[#b89da1]">&quot;Insane speed. The booster was super chill and we won 8 games in a row. Definitely coming back for Diamond push.&quot;</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold text-sm text-white">JettLagged</span>
                                            <span className="text-xs text-[#b89da1]">1 day ago</span>
                                        </div>
                                        <p className="text-sm text-[#b89da1]">&quot;Ordered streaming addon and watched the whole thing. Learnt a lot just by watching. 10/10 service.&quot;</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Summary */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 flex flex-col gap-4">
                            <div className="rounded-xl border border-[#38292b] bg-[#261c1d] p-6 shadow-2xl shadow-black/50">
                                <h2 className="text-xl font-bold text-white mb-6 pb-4 border-b border-[#38292b]">Order Summary</h2>
                                <div className="flex items-center justify-between mb-6 relative">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`size-12 rounded-full ${ranks[currentRank]?.color} flex items-center justify-center font-bold text-[#261c1d] text-xs`}>
                                            {ranks[currentRank]?.short[0]}{divisions[currentDiv]}
                                        </div>
                                        <span className="text-xs font-medium text-[#b89da1]">{ranks[currentRank]?.name} {divisions[currentDiv]}</span>
                                    </div>
                                    <div className="h-0.5 flex-1 bg-[#38292b] mx-2 relative top-[-10px]">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-primary">→</div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`size-12 rounded-full ${ranks[desiredRank]?.color} flex items-center justify-center font-bold text-[#261c1d] text-xs ring-2 ring-primary ring-offset-2 ring-offset-[#261c1d]`}>
                                            {ranks[desiredRank]?.short[0]}{divisions[desiredDiv]}
                                        </div>
                                        <span className="text-xs font-bold text-primary">{ranks[desiredRank]?.short} {divisions[desiredDiv]}</span>
                                    </div>
                                </div>
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm"><span className="text-[#b89da1]">Service</span><span className="text-white font-medium">Rank Boost</span></div>
                                    <div className="flex justify-between text-sm"><span className="text-[#b89da1]">Platform</span><span className="text-white font-medium">{platform} / NA</span></div>
                                    <div className="flex justify-between text-sm"><span className="text-[#b89da1]">Base Price</span><span className="text-white font-medium">$32.00</span></div>
                                    <div className="flex justify-between text-sm pt-2 border-t border-dashed border-[#38292b]">
                                        <span className="text-[#b89da1]">Discount code</span>
                                        <span className="text-primary text-xs font-bold cursor-pointer hover:underline">Add Code</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-[#b89da1] text-sm font-medium">Total Amount</span>
                                    <span className="text-3xl font-bold text-white tracking-tight">$32.00</span>
                                </div>
                                <Link href="/checkout" className="w-full py-4 rounded-lg bg-primary text-white font-bold text-lg hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(175,18,37,0.4)] hover:shadow-[0_0_30px_rgba(175,18,37,0.6)] flex items-center justify-center gap-2">
                                    <span>Boost Now</span> 🚀
                                </Link>
                                <p className="text-center text-xs text-[#b89da1] mt-4">By purchasing you agree to our Terms of Service.</p>
                            </div>
                            <div className="rounded-xl border border-[#38292b] bg-[#261c1d]/50 p-4 grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-center text-center gap-1">
                                    <span className="text-green-400 text-xl">🔒</span>
                                    <span className="text-xs font-bold text-white">SSL Secure</span>
                                    <span className="text-[10px] text-[#b89da1]">Encrypted Payment</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-1">
                                    <span className="text-blue-400 text-xl">🎧</span>
                                    <span className="text-xs font-bold text-white">24/7 Support</span>
                                    <span className="text-[10px] text-[#b89da1]">Live Chat Ready</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-[#38292b] bg-[#181112] py-10 px-6 mt-10">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <h2 className="text-white text-lg font-bold font-[family-name:var(--font-space-grotesk)]">CFNboost</h2>
                        <span className="text-[#b89da1] text-sm">© 2024</span>
                    </div>
                    <div className="flex gap-6">
                        <a className="text-sm text-[#b89da1] hover:text-white" href="#">Terms</a>
                        <a className="text-sm text-[#b89da1] hover:text-white" href="#">Privacy</a>
                        <Link className="text-sm text-[#b89da1] hover:text-white" href="/contact">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
