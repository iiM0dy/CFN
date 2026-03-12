"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function BecomeProPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [selectedGames, setSelectedGames] = useState<string[]>([])

    const toggleGame = (game: string) => {
        setSelectedGames(prev =>
            prev.includes(game) ? prev.filter(g => g !== game) : [...prev, game]
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsSubmitting(false)
        setIsSuccess(true)
    }

    const requirements = [
        { label: "Elite Rank", value: "Radiant / Challenger / GE" },
        { label: "Commitment", value: "4+ Hours / Day Consistency" },
        { label: "Identity", value: "Verified Discord Account" },
        { label: "Support", value: "Clear English Communication" }
    ]

    const stats = [
        { label: "Avg. Monthly Pay", value: "$1.8k - $4.5k" },
        { label: "Orders / Day", value: "1,200+" },
        { label: "Booster Rating", value: "4.9/5.0" },
        { label: "Payment Time", value: "Instant" }
    ]

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            {/* Professional Navigation Buffer */}
            <div className="h-20" />

            {/* Premium Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden border-b border-white/5">
                <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[180px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-[1440px] mx-auto relative z-10 text-center md:text-left">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
                        <div className="max-w-3xl">
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter uppercase mb-8">
                                Monitize Your<br />
                                <span className="text-primary italic-none">Dominance.</span>
                            </h1>
                            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-12">
                                Join the network that powers the world's most elite competitive players. We handle the logistics; you execute the mission.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a href="#join-network" className="px-10 py-5 bg-primary hover:bg-[#8a0e1d] text-white font-black uppercase tracking-[0.3em] rounded-2xl transition-all shadow-2xl shadow-primary/30 text-sm">
                                    Initialize Application
                                </a>
                                <div className="flex items-center gap-4 px-8 py-5 rounded-2xl border border-white/10 bg-white/2">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">Payout methods:</span>
                                    <div className="flex gap-4 opacity-70">
                                        <span className="material-symbols-outlined text-xl">payments</span>
                                        <span className="material-symbols-outlined text-xl">currency_bitcoin</span>
                                        <span className="material-symbols-outlined text-xl">account_balance</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Requirements Card */}
                        <div className="w-full lg:w-[400px] bg-[#0A0A0A] border border-white/10 rounded-[40px] p-10 shadow-3xl">
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-8 border-b border-white/5 pb-4">Minimum Standards</h4>
                            <div className="space-y-6">
                                {requirements.map((req, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-slate-400">{req.label}</span>
                                        <span className="text-sm font-black text-white text-right">{req.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                                <div className="text-3xl font-black text-white mb-1">98.4%</div>
                                <div className="text-[10px] font-black text-primary uppercase tracking-widest">Internal Retention Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Performance Metrics Section */}
            <section className="py-24 border-b border-white/5">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Benefits: Functional & Professional */}
            <section className="py-32 px-6">
                <div className="max-w-[1440px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                                    Why Pros Choose <br />
                                    <span className="text-primary text-6xl md:text-7xl">CFNboost</span>
                                </h2>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    We aren't just a platform; we're an infrastructure. Our dashboard is designed by boosters, for boosters, focusing on efficiency and security.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">schedule</span>
                                    </div>
                                    <h5 className="font-black uppercase text-sm tracking-wider">Dynamic Scheduling</h5>
                                    <p className="text-slate-500 text-xs leading-relaxed font-medium">Claim orders at your own pace. No mandatory hours, just performance-based allocation.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">lock_reset</span>
                                    </div>
                                    <h5 className="font-black uppercase text-sm tracking-wider">Protocol Safety</h5>
                                    <p className="text-slate-500 text-xs leading-relaxed font-medium">Automatic VPN matching and hardware id spoofing integrated into our private client.</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive FAQ / Knowledge Bits */}
                        <div className="bg-[#0A0A0A] rounded-[48px] p-8 md:p-12 border border-white/5">
                            <h3 className="text-xl font-black uppercase tracking-widest mb-10 text-center">Operational FAQ</h3>
                            <div className="space-y-6">
                                {[
                                    { q: "How fast are payouts processed?", a: "Instantly upon mission verification via Crypto or PayPal." },
                                    { q: "Are there any service fees?", a: "We take an industry-low 20% flat commission. You keep the rest." },
                                    { q: "Do I need to speak to customers?", a: "No. Our dedicated support team handles all client communications." }
                                ].map((item, i) => (
                                    <div key={i} className="pb-6 border-b border-white/5 last:border-0">
                                        <h6 className="text-sm font-black text-white uppercase mb-2">Q: {item.q}</h6>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Engine */}
            <section id="join-network" className="py-32 bg-[#080808] border-y border-white/5">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div className="flex flex-col justify-center">
                            <div className="inline-block h-px w-24 bg-primary mb-10" />
                            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-8 leading-[0.9]">
                                Initiate<br />
                                <span className="text-primary">Dossier</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-medium mb-12">
                                Prepare your competitive history. We review all applications within 48 hours. Professionalism is non-negotiable.
                            </p>

                            <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/2 border border-white/5">
                                <span className="material-symbols-outlined text-4xl text-primary">contact_support</span>
                                <div>
                                    <h4 className="text-white font-black text-xs uppercase tracking-widest mb-1">Deployment Support</h4>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase">hiring@cfnboost.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            {/* Form Success State */}
                            <AnimatePresence>
                                {isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full bg-black/40 p-8 md:p-16 rounded-[48px] border border-white/10 backdrop-blur-3xl flex flex-col items-center justify-center text-center"
                                    >
                                        <div className="size-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-8">
                                            <span className="material-symbols-outlined text-4xl">check_circle</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 text-primary">Transmission Received</h3>
                                        <p className="text-slate-400 font-medium mb-10">Your dossier has been encrypted and sent to HR. Monitor your Discord for contact.</p>
                                        <button onClick={() => setIsSuccess(false)} className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] hover:text-white transition-colors">Start New Session</button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-black/40 p-8 md:p-12 rounded-[48px] border border-white/10 backdrop-blur-3xl"
                                    >
                                        <form className="space-y-8" onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Full Name / Alias</label>
                                                    <input required type="text" className="w-full bg-white/3 border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-primary transition-all outline-none font-bold text-sm" placeholder="e.g. Ghost_X" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Discord ID</label>
                                                    <input required type="text" className="w-full bg-white/3 border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-primary transition-all outline-none font-bold text-sm" placeholder="username#0000" />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1 block">Active Disciplines</label>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                    {["Valorant", "League", "CS2", "Dota 2"].map((game) => (
                                                        <div
                                                            key={game}
                                                            onClick={() => toggleGame(game)}
                                                            className={`flex items-center justify-center py-4 rounded-xl border transition-all cursor-pointer font-black text-[10px] uppercase tracking-widest ${selectedGames.includes(game) ? 'bg-primary border-primary text-white' : 'bg-white/2 border-white/5 text-slate-500 hover:border-white/20'}`}
                                                        >
                                                            {game}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Experience Summary</label>
                                                <textarea required className="w-full bg-white/3 border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-primary transition-all outline-none font-bold text-sm min-h-[140px]" placeholder="List your peak ranks and past professional team experience..." />
                                            </div>

                                            <button
                                                disabled={isSubmitting}
                                                className="w-full bg-primary disabled:opacity-50 hover:bg-[#8a0e1d] text-white py-6 rounded-2xl font-black uppercase tracking-[0.4em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/40 flex items-center justify-center gap-4 group"
                                            >
                                                {isSubmitting ? (
                                                    <span className="size-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                                                ) : (
                                                    <>
                                                        Submit Dossier
                                                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                                                    </>
                                                )}
                                            </button>

                                            <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-slate-700 uppercase tracking-widest">
                                                <span className="material-symbols-outlined text-[14px]">lock</span>
                                                End-to-end encrypted submission
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
