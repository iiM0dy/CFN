"use client"

export function HowItWorks() {
    return (
        <section className="py-24 bg-[#050505]">
            <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
                {/* Header Section - Matched to PopularGames/Pricing */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div className="max-w-xl">
                        <div className="h-px w-12 bg-primary mb-5" />
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
                            Operational <span className="text-primary">Sequence</span>
                        </h2>
                        <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                            Our battle-tested protocol ensures maximum security and elite performance for every deployment.
                        </p>
                    </div>
                </div>

                {/* Steps Sequence - Matched to Pricing Feature Cards style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Step 01 */}
                    <div className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-300">
                        <div className="flex justify-between items-start mb-8">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[24px]">search_check</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">P-01</span>
                        </div>
                        <h3 className="text-white font-black text-lg uppercase tracking-tight mb-3">Select Mission</h3>
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
                            Browse our verified catalog of gaming services across all major competitive titles.
                        </p>
                    </div>

                    {/* Step 02 */}
                    <div className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-300">
                        <div className="flex justify-between items-start mb-8">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[24px]">tune</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">P-02</span>
                        </div>
                        <h3 className="text-white font-black text-lg uppercase tracking-tight mb-3">Calibrate</h3>
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
                            Customize your parameters using our smart estimator for precise results and regional VPN matching.
                        </p>
                    </div>

                    {/* Step 03 */}
                    <div className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-300">
                        <div className="flex justify-between items-start mb-8">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[24px]">bolt</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">P-03</span>
                        </div>
                        <h3 className="text-white font-black text-lg uppercase tracking-tight mb-3">Execution</h3>
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
                            Our boosters begin mission within 15 minutes. Track your progress live in real-time.
                        </p>
                    </div>
                </div>

                {/* Integrated Trust Footer */}
                <div className="mt-20 pt-10 border-t border-white/5">
                    <div className="flex flex-wrap justify-between gap-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-emerald-500 text-[18px]">verified</span>
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">SSL SECURED</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-emerald-500 text-[18px]">vpn_lock</span>
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">VPN PROTECTED</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-emerald-500 text-[18px]">shield_person</span>
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">ENCRYPTED DATA</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-emerald-500 text-[18px]">support_agent</span>
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">24/7 LIVE OPS</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
