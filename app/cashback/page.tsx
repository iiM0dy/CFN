"use client"

import React from "react"
import {
    Rocket,
    Wallet,
    TrendingUp,
    Activity,
    Coins,
    Award,
    RefreshCw,
    Shield,
    Swords,
    Medal,
    Diamond,
    UserPlus,
    CheckCircle,
    Star
} from "lucide-react"
import { useCurrency } from "@/context/currency-context"

export default function CashbackPage() {
    const { formatPrice } = useCurrency()
    return (
        <div className="bg-[#070405] text-slate-100 antialiased selection:bg-[#B11226] selection:text-white min-h-screen font-(family-name:--font-space-grotesk)">
            <style jsx>{`
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 50s linear infinite;
                    width: max-content;
                }
                .hero-mesh {
                    background-image: radial-gradient(circle at 50% 50%, rgba(177, 18, 38, 0.08) 0%, transparent 60%), 
                                    url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10L90 90M90 10L10 90' stroke='%23B11226' stroke-opacity='0.03' stroke-width='0.5'/%3E%3C/svg%3E");
                }
                .glass {
                    background: rgba(20, 13, 14, 0.7);
                    backdrop-filter: blur(14px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .card-glow:hover {
                    box-shadow: 0 0 40px rgba(177, 18, 38, 0.08);
                    border-color: rgba(177, 18, 38, 0.3);
                }
                .text-gradient-red {
                    background: linear-gradient(135deg, #fff 30%, #B11226 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .floating {
                    animation: floating 6s ease-in-out infinite;
                }
                @keyframes floating {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(1deg); }
                }
                .ticker-wrap {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
                .noise-texture {
                    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuDg8YCDjBRH2759CvvgfQ-epcavC035GVaCuWUwHQi--Me2HW6M2YRQscpRt4CnpQ51I8nLGpp0nQXveUzZbz2ebO5oWbIfGSpfyRXeJRNMHhSpjeV-dNGHKcUUt0B2qtLjFWtXbXY2kAD0TLJ4IdDNLKte-q7Hd19R-kykkuX3pPSYAeMrKUj9NXH2SMTnmY_tC-9wr39QAwG972wPe1zlYYaeY8SUJFR8gIwaB04UZIsvJYmNwp1jxHQX2Lmn0Zu66jg8t8mGGdSS);
                    opacity: 0.03;
                }
                .glow-subtle {
                    filter: drop-shadow(0 0 8px rgba(177, 18, 38, 0.4));
                }
                .shadow-3xl {
                    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.5);
                }
            `}</style>
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative min-h-[65vh] flex items-center justify-center pt-16 pb-16 hero-mesh">
                    <div className="absolute inset-0 noise-texture pointer-events-none"></div>
                    <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#B11226]/10 rounded-full blur-[150px] pointer-events-none"></div>
                    <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left">
                            <div className="inline-flex items-center gap-3 px-5 py-2 mb-8 rounded-full bg-white/5 border border-white/10 text-[#B11226] text-[14px] font-black uppercase tracking-[0.25em] backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B11226] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B11226]"></span>
                                </span>
                                Elite Loyalty Ecosystem
                            </div>
                            <h1 className="text-white text-7xl md:text-[5.5rem] font-black leading-[0.95] tracking-tighter mb-8 text-gradient-red">
                                Ascend your <br />savings.
                            </h1>
                            <p className="text-slate-400 text-lg md:text-xl max-w-lg mb-12 leading-relaxed font-light">
                                Premium cashback architecture for the competitive elite. Reclaim <span className="text-white font-semibold">up to 10%</span> on every contract and fund your path to Professional.
                            </p>
                            <div className="flex flex-wrap gap-12 mb-12 py-8 border-y border-white/5">
                                <div>
                                    <p className="text-[14px] text-slate-500 uppercase tracking-[0.2em] font-bold mb-2">Platform Volume</p>
                                    <p className="text-4xl font-bold text-white tracking-tighter">{formatPrice(1248590.42)}</p>
                                </div>
                                <div>
                                    <p className="text-[14px] text-slate-500 uppercase tracking-[0.2em] font-bold mb-2">Verified Pros</p>
                                    <p className="text-4xl font-bold text-white tracking-tighter">12,402</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-5">
                                <button className="bg-[#B11226] hover:bg-[#B11226]/90 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-[0.2em] shadow-2xl shadow-[#B11226]/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
                                    Join the Program <Rocket className="size-5 glow-subtle" />
                                </button>
                            </div>
                        </div>
                        <div className="relative hidden lg:flex justify-center items-center">
                            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
                                {/* Immersive Image */}
                                <div className="absolute inset-0 bg-[#B11226]/20 rounded-full blur-[100px] animate-pulse"></div>
                                <div className="relative z-20 floating">
                                    <div className="relative group">
                                        <img
                                            alt="High-end Esports Setup"
                                            className="w-full h-auto rounded-2xl shadow-2xl rotate-3 border border-white/20 brightness-[0.85] contrast-125 group-hover:brightness-100 transition-all duration-700"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDMHnnph4rYvSq-tnwygVrg7zcqzjEyFU7x2pO9dqLxo081DhTg-_j5D9wOWsqR6DpWeJim6jdMon_Qv_Nfw_4V57czVvNfuAzvYa3JWs9K5IQsbUQKEhfpymfG_qXvnYBK4qVi8EkuoUz8tEnGfwYN7fYX3TnNzsEBP6AJ7t2WgIqLRhIwj8bMUNSLNFl2vXzExvo-hNzmXoHgf2GFTbY6DgBMAryCBOfhUA4s0g-xcWObB0UWZ_B6zYn9xbEzc7pOaWqrAyfnArq"
                                        />
                                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-[#B11226]/40 transition-all"></div>
                                    </div>
                                    {/* Balance Card */}
                                    <div className="absolute -bottom-8 -right-8 glass p-7 rounded-2xl shadow-3xl border border-[#B11226]/20 hover:border-[#B11226]/40 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded bg-[#B11226]/20 flex items-center justify-center">
                                                <Wallet className="size-5 text-[#B11226] glow-subtle" />
                                            </div>
                                            <p className="text-[14px] text-slate-400 font-bold uppercase tracking-[0.2em]">Live Wallet</p>
                                        </div>
                                        <p className="text-3xl font-black text-white tracking-tight">{formatPrice(452.20)}</p>
                                        <div className="flex items-center gap-1.5 mt-3">
                                            <TrendingUp className="size-4 text-green-500" />
                                            <span className="text-[14px] text-green-500 font-black tracking-widest">+12.4% MONTHLY</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dynamic Live Feed */}
                <div className="bg-[#0e090a] border-y border-white/5 py-5 overflow-hidden ticker-wrap relative">
                    <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#070405] to-transparent z-10"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#070405] to-transparent z-10"></div>
                    <div className="flex items-center animate-infinite-scroll whitespace-nowrap py-2">
                        <div className="flex items-center gap-16 px-8 leading-none">
                            <div className="flex items-center gap-4 shrink-0">
                                <Activity className="size-4 text-[#B11226] glow-subtle" />
                                <span className="text-[14px] font-black text-slate-500 uppercase tracking-[0.3em]">Live Redemptions:</span>
                            </div>
                            {[
                                { name: "Slayer99", rank: "Global Elite", amount: 42.50 },
                                { name: "GhostWalker", rank: "Immortal", amount: 15.20 },
                                { name: "ViperQueen", rank: "Diamond III", amount: 8.40 },
                                { name: "Nightmare", rank: "Ascendant", amount: 65.00 },
                                { name: "PixelSlayer", rank: "Radiant", amount: 12.30 }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                    <span className="text-[14px] font-bold text-white">{item.name}</span>
                                    <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                                    <span className="text-[14px] text-slate-500">{item.rank}</span>
                                    <span className="text-[14px] font-bold text-[#B11226]">+{formatPrice(item.amount)}</span>
                                </div>
                            ))}
                        </div>
                        {/* Duplicate for seamless scroll */}
                        <div className="flex items-center gap-16 px-8 leading-none">
                            <div className="flex items-center gap-4 shrink-0">
                                <Activity className="size-4 text-[#B11226] glow-subtle" />
                                <span className="text-[14px] font-black text-slate-500 uppercase tracking-[0.3em]">Live Redemptions:</span>
                            </div>
                            {[
                                { name: "Slayer99", rank: "Global Elite", amount: 42.50 },
                                { name: "GhostWalker", rank: "Immortal", amount: 15.20 },
                                { name: "ViperQueen", rank: "Diamond III", amount: 8.40 },
                                { name: "Nightmare", rank: "Ascendant", amount: 65.00 },
                                { name: "PixelSlayer", rank: "Radiant", amount: 12.30 }
                            ].map((item, i) => (
                                <div key={"dup" + i} className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                    <span className="text-[14px] font-bold text-white">{item.name}</span>
                                    <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                                    <span className="text-[14px] text-slate-500">{item.rank}</span>
                                    <span className="text-[14px] font-bold text-[#B11226]">+{formatPrice(item.amount)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <section className="py-32 relative">
                    <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
                        <div className="text-center mb-24">
                            <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">Engineered for Value</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">Sophisticated rewards integration designed for the modern competitor.</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="relative p-12 rounded-4xl bg-[#0e090a]/40 border border-white/5 card-glow transition-all group overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B11226]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                <div className="w-16 h-16 rounded-2xl bg-[#B11226]/10 flex items-center justify-center mb-10 border border-[#B11226]/20 text-[#B11226] group-hover:scale-110 transition-transform">
                                    <Coins className="size-8 glow-subtle" />
                                </div>
                                <div className="text-[14px] text-[#B11226] font-black uppercase tracking-[0.3em] mb-4">Phase 01</div>
                                <h3 className="text-2xl font-bold text-white mb-4">Execute Contract</h3>
                                <p className="text-slate-400 font-light leading-relaxed">Initiate any service across our marketplace. All transactions are logged instantly.</p>
                            </div>
                            <div className="relative p-12 rounded-4xl bg-[#0e090a]/40 border border-white/5 card-glow transition-all group overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B11226]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                <div className="w-16 h-16 rounded-2xl bg-[#B11226]/10 flex items-center justify-center mb-10 border border-[#B11226]/20 text-[#B11226] group-hover:scale-110 transition-transform">
                                    <Award className="size-8 glow-subtle" />
                                </div>
                                <div className="text-[14px] text-[#B11226] font-black uppercase tracking-[0.3em] mb-4">Phase 02</div>
                                <h3 className="text-2xl font-bold text-white mb-4">Accumulate Credits</h3>
                                <p className="text-slate-400 font-light leading-relaxed">Dynamic cashback calculations applied based on your current tier status.</p>
                            </div>
                            <div className="relative p-12 rounded-4xl bg-[#0e090a]/40 border border-white/5 card-glow transition-all group overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B11226]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                <div className="w-16 h-16 rounded-2xl bg-[#B11226]/10 flex items-center justify-center mb-10 border border-[#B11226]/20 text-[#B11226] group-hover:scale-110 transition-transform">
                                    <RefreshCw className="size-8 glow-subtle" />
                                </div>
                                <div className="text-[14px] text-[#B11226] font-black uppercase tracking-[0.3em] mb-4">Phase 03</div>
                                <h3 className="text-2xl font-bold text-white mb-4">Instant Liquidity</h3>
                                <p className="text-slate-400 font-light leading-relaxed">Redeem your wallet balance for any marketplace asset with zero friction.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tiered Rewards Progress */}
                <section className="py-32 bg-[#0e090a]/40 relative overflow-hidden border-y border-white/5">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B11226]/5 blur-[150px]"></div>
                    <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                            <div className="max-w-xl">
                                <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">The Hierarchy</h2>
                                <p className="text-slate-400 text-lg font-light leading-relaxed">Advanced progression mechanics. Your influence in the ecosystem scales with your participation.</p>
                            </div>
                            <div className="glass p-8 rounded-2xl shadow-xl">
                                <p className="text-[14px] text-slate-500 uppercase tracking-[0.3em] font-black mb-2">Current Identity</p>
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl font-black text-white tracking-tighter">INITIATE</span>
                                    <span className="px-3 py-1 bg-slate-800 text-white text-[14px] font-black rounded tracking-widest uppercase">Rank 01</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Bronze */}
                            <div className="group relative p-10 rounded-3xl bg-white/2 border border-white/5 card-glow transition-all">
                                <div className="flex items-center justify-between mb-10">
                                    <Shield className="size-10 text-[#cd7f32] glow-subtle" />
                                    <span className="text-[14px] font-black text-slate-500 uppercase tracking-widest">Bronze</span>
                                </div>
                                <div className="mb-12">
                                    <h4 className="text-6xl font-black text-white mb-2">2%</h4>
                                    <p className="text-[14px] text-slate-500 font-bold uppercase tracking-[0.2em]">Base Multiplier</p>
                                </div>
                                <div className="space-y-5 mb-10">
                                    <div className="flex items-center gap-3 text-xs text-slate-400">
                                        <CheckCircle className="size-4 text-[#B11226] glow-subtle" />
                                        Marketplace Access
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-400">
                                        <CheckCircle className="size-4 text-[#B11226] glow-subtle" />
                                        Referral Rewards
                                    </div>
                                </div>
                                <div className="pt-8 border-t border-white/5">
                                    <div className="flex justify-between text-[14px] text-slate-500 font-black uppercase mb-3 tracking-widest">
                                        <span>Status</span>
                                        <span>ACTIVE</span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-[#cd7f32] h-full w-full"></div>
                                    </div>
                                </div>
                            </div>
                            {/* Silver */}
                            <div className="group relative p-10 rounded-3xl bg-white/2 border border-white/5 card-glow transition-all">
                                <div className="flex items-center justify-between mb-10">
                                    <Swords className="size-10 text-[#c0c0c0] glow-subtle" />
                                    <span className="text-[14px] font-black text-slate-500 uppercase tracking-widest">Silver</span>
                                </div>
                                <div className="mb-12">
                                    <h4 className="text-6xl font-black text-white mb-2">5%</h4>
                                    <p className="text-[14px] text-slate-500 font-bold uppercase tracking-[0.2em]">Tier II Multiplier</p>
                                </div>
                                <div className="space-y-5 mb-10">
                                    <div className="flex items-center gap-3 text-xs text-white/80 font-semibold">
                                        <CheckCircle className="size-4 text-[#B11226] glow-subtle" />
                                        Priority Queuing
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-400">
                                        <CheckCircle className="size-4 text-[#B11226] glow-subtle" />
                                        Discord Elite Role
                                    </div>
                                </div>
                                <div className="pt-8 border-t border-white/5">
                                    <div className="flex justify-between text-[14px] text-slate-500 font-black uppercase mb-3 tracking-widest">
                                        <span>Threshold</span>
                                        <span>{formatPrice(500)}</span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-white/10 h-full w-0"></div>
                                    </div>
                                </div>
                            </div>
                            {/* Gold */}
                            <div className="group relative p-10 rounded-3xl bg-[#B11226]/10 border border-[#B11226]/30 ring-1 ring-[#B11226]/40 shadow-2xl scale-105 z-10 overflow-hidden">
                                <div className="absolute inset-0 noise-texture"></div>
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#B11226] text-white text-[14px] font-black px-6 py-1.5 rounded-full uppercase tracking-[0.3em] shadow-xl">Most Optimized</div>
                                <div className="flex items-center justify-between mb-10">
                                    <Medal className="size-10 text-[#ffd700] glow-subtle" />
                                    <span className="text-[14px] font-black text-[#B11226] uppercase tracking-widest">Gold</span>
                                </div>
                                <div className="mb-12">
                                    <h4 className="text-6xl font-black text-white mb-2">7.5%</h4>
                                    <p className="text-[14px] text-slate-400 font-bold uppercase tracking-[0.2em]">Elite Multiplier</p>
                                </div>
                                <div className="space-y-5 mb-10">
                                    <div className="flex items-center gap-3 text-xs text-white font-bold">
                                        <CheckCircle className="size-4 text-[#B11226] glow-subtle" />
                                        Dedicated Agent
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-white font-bold">
                                        <CheckCircle className="size-4 text-[#B11226] glow-subtle" />
                                        Early Access Passes
                                    </div>
                                </div>
                                <div className="pt-8 border-t border-[#B11226]/20">
                                    <div className="flex justify-between text-[14px] text-slate-400 font-black uppercase mb-3 tracking-widest">
                                        <span>Threshold</span>
                                        <span>{formatPrice(2500)}</span>
                                    </div>
                                    <div className="w-full bg-[#B11226]/20 rounded-full h-1.5 overflow-hidden">
                                        <div className="bg-[#ffd700] h-full w-0"></div>
                                    </div>
                                </div>
                            </div>
                            {/* Elite */}
                            <div className="group relative p-10 rounded-3xl bg-black border border-white/10 card-glow transition-all overflow-hidden">
                                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#B11226_0%,transparent_70%)]"></div>
                                <div className="flex items-center justify-between mb-10">
                                    <Diamond className="size-10 text-[#B11226] glow-subtle" />
                                    <span className="text-[14px] font-black text-slate-400 uppercase tracking-widest">Elite</span>
                                </div>
                                <div className="mb-12">
                                    <h4 className="text-6xl font-black text-white mb-2">10%</h4>
                                    <p className="text-[14px] text-slate-500 font-bold uppercase tracking-[0.2em]">Apex Multiplier</p>
                                </div>
                                <div className="space-y-5 mb-10">
                                    <div className="flex items-center gap-3 text-xs text-white font-bold">
                                        <Star className="size-4 text-[#B11226] glow-subtle" />
                                        Private LAN Events
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-white font-bold">
                                        <Star className="size-4 text-[#B11226] glow-subtle" />
                                        Global Leaderboard
                                    </div>
                                </div>
                                <div className="pt-8 border-t border-white/10">
                                    <span className="text-[14px] text-[#B11226] font-black uppercase tracking-[0.3em] animate-pulse">INVITATION ONLY</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Referral Section */}
                <section className="py-32">
                    <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
                        <div className="relative bg-linear-to-br from-[#1a1112] to-[#070405] p-16 rounded-[3.5rem] border border-white/5 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-16">
                            <div className="absolute top-0 right-0 w-[60%] h-full bg-[#B11226]/5 blur-[150px]"></div>
                            <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#B11226]/30 to-transparent"></div>
                            <div className="relative z-10 max-w-xl text-center lg:text-left">
                                <div className="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-[#B11226]/10 border border-[#B11226]/20">
                                    <UserPlus className="size-4 text-[#B11226] glow-subtle" />
                                    <span className="text-[#B11226] font-black uppercase tracking-[0.3em] text-[14px]">Expansion Protocol</span>
                                </div>
                                <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">Deploy your <br /><span className="text-[#B11226]">affiliate link.</span></h2>
                                <p className="text-slate-400 text-lg mb-12 leading-relaxed font-light">Scale your wallet balance by recruiting your network. Earn <span className="text-white font-bold">{formatPrice(20.00)} credits</span> for every qualified active recruit.</p>
                                <div className="flex flex-col sm:flex-row gap-3 bg-black/60 p-2.5 rounded-2xl border border-white/10 backdrop-blur-xl">
                                    <div className="flex-1 px-6 py-4 text-slate-300 text-sm font-mono truncate items-center flex tracking-wider">
                                        cfnboost.com/ref/elite_x_ray
                                    </div>
                                    <button className="bg-[#B11226] hover:bg-[#B11226]/90 text-white px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#B11226]/30 hover:shadow-[#B11226]/50">
                                        Copy Protocol
                                    </button>
                                </div>
                            </div>
                            <div className="relative z-10 w-full lg:w-5/12 aspect-4/3 rounded-3xl overflow-hidden shadow-3xl border border-white/10 group">
                                <img alt="Premium Gaming Hardware" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-75 grayscale-[0.2]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW_dBgh9Pt05WDbhoNG_Llw-Hcf3m17cbChpL9YJG-AA3b-6GinyDBPF1mijP4iDKvVC0jzJ4sInSXfkvsGjEi9jNA07n02RdpiWIrqXRRzLZxCYu4FvQhmv5nZssCLN7tsgww3gqTSsFAOeCYg7ItT5lGsl91jr5CU4il1kplPy6WqQf4_EmSVb5lBmXHPiWmUNZND0v-WYMl_b7HlfrRuWJkETbxfDoCRT5KeGNShaK88WJCBcCTNz1QR-7tybjbtGIhyRvA81w9" />
                                <div className="absolute inset-0 bg-linear-to-t from-[#070405]/90 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8">
                                    <div className="flex -space-x-3 mb-5">
                                        {[
                                            "https://lh3.googleusercontent.com/aida-public/AB6AXuC9Vc6fkYuxPxr7Ek1YRpKhsYzcS1mxBs9uTOizWmdoZ6B8rPpyGt-xXDcmWwAVg3GFQfPcy_Z-bgNblqrhi7NAg0cDSvaghkt9vhcyY0jmVUEgDNLCvWQDFjHRly8_tuEV0r_PPZRcM4bhD2XzWNWJ97OHZk1JPXhhK4NJ9ES4qCZ2tBuQDcNsQNtcd7bWA6MK8lgc1wRfIkuZ0ptv_CNfI-io44G98dEUFOAYdvd42IJ70p-kx-NYETmpUaMHMFpOHkNGhU0MGTI8",
                                            "https://lh3.googleusercontent.com/aida-public/AB6AXuBpI54GmUnTGthJzoraBbiK2DrDcTa_Za92exv4uVL3S_jgDK9VEmSSwZcX-uo35Dh4VVLU-jCOR4zTC-JmzEs4jBI6IVZLJllxoHOVDuIM6HvQK-97-462s4KPcHckp2usBnYOJ6fQ_Ty7oWulZ6gAJz3LX8y-3ktG2DshW6w53W3PnVCywdDV_el261YOT0S2za6m8D2BD7g7WNXTAYQlTucNAN6A82J1W2iSFSSi5E3u59-eQm55zVnHlKQ0CpQl3Np2RVNfgrEN",
                                            "https://lh3.googleusercontent.com/aida-public/AB6AXuDf1vmE5rV3LxdB57QMUIaEVUiaBwQTUJqrsoOo6hzXkwXWM-SPyEt8y7M78um4Aq6zXam8q4TWPcwaPYyC9xFOlLDfYFkgAc8P_tK97ZIiLN8b3qqBCwngE0tOQij47zgQsfBMPxB_5A3-F1TsP4tFEZFN2eyySX6gJUyn9rp4k33e1TomHGDO1Ij3NHfvc-wK--POroeC8m6M7F5AS1gfkbvBFYjPt8JyQCw3labbheAI9W03JPiU18_62aWgeUtzzogFtRF4Xn4O"
                                        ].map((src, idx) => (
                                            <div key={idx} className="w-12 h-12 rounded-full border-2 border-[#B11226] bg-slate-800 shadow-xl overflow-hidden">
                                                <img alt="user" src={src} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                        <div className="w-12 h-12 rounded-full border-2 border-[#B11226] flex items-center justify-center bg-[#B11226] text-[14px] font-black text-white shadow-xl">
                                            +14K
                                        </div>
                                    </div>
                                    <p className="text-[14px] font-black text-white uppercase tracking-[0.3em]">RECRUITED THIS CYCLE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-40 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#B11226_0%,transparent_60%)] opacity-20"></div>
                    <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">
                        <h2 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none">Dominate the <br />economy.</h2>
                        <p className="text-slate-400 mb-14 text-xl font-light leading-relaxed max-w-2xl mx-auto">Integrate with the most advanced reward ecosystem in competitive history. Your Tier 1 status awaits.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-8">
                            <button className="bg-[#B11226] hover:bg-[#B11226]/90 text-white px-16 py-7 rounded-full font-black text-xl uppercase tracking-[0.25em] shadow-2xl shadow-[#B11226]/40 transition-all transform hover:scale-105 hover:-translate-y-1">
                                Initialize Session
                            </button>
                        </div>
                        <p className="mt-16 text-slate-700 text-[14px] uppercase tracking-[0.6em] font-black">Professional Infrastructure • End-to-End Encryption • Instant Settlement</p>
                    </div>
                </section>
            </main>
        </div>
    )
}
