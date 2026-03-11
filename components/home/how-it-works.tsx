"use client"

export function HowItWorks() {
    return (
        <section className="py-24 bg-[#050505] border-b border-white/5">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
                <div className="text-center mb-14">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
                        Ironclad Security
                    </span>
                    <h2 className="mt-4 text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
                        Trusted by the Community
                    </h2>
                </div>

                {/* Logos / trust row */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 items-center opacity-40 hover:opacity-100 transition-opacity text-[11px] font-semibold">
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2 text-gray-300">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 11h16M4 15h10" />
                            </svg>
                            <span>Encrypted gateway</span>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2 text-gray-300">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l1.5 9h15L21 10H3z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10V7a4 4 0 118 0v3" />
                            </svg>
                            <span>Secure checkout</span>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2 text-gray-300">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l8 4v5c0 5-3 7-8 9-5-2-8-4-8-9V7l8-4z" />
                            </svg>
                            <span>Fraud protection</span>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2 text-gray-300">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 014-4h10a4 4 0 110 8H7a4 4 0 01-4-4z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11a4 4 0 117.8-1" />
                            </svg>
                            <span>Privacy first</span>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2 text-gray-300">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21h8M12 3v12m0 0l-4-4m4 4l4-4" />
                            </svg>
                            <span>Chargeback shield</span>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2 font-black text-xs text-gray-300">
                            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            SSL Secured
                        </div>
                    </div>
                </div>

                {/* Three trust pillars */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-5 hover:bg-white/[0.04] transition-colors">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary text-xl">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5l7 4v6.5l-7 4-7-4v-6.5z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-white font-bold uppercase text-sm mb-2 tracking-tight">Anonymity Protocol</h3>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                Advanced routing and offline mode ensure game servers never flag account activity.
                            </p>
                        </div>
                    </div>
                    <div className="p-8 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-5 hover:bg-white/[0.04] transition-colors">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary text-xl">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-white font-bold uppercase text-sm mb-2 tracking-tight">Identity Protection</h3>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                No personal data is stored on our servers or shared with boosters—ever.
                            </p>
                        </div>
                    </div>
                    <div className="p-8 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-5 hover:bg-white/[0.04] transition-colors">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary text-xl">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2v6h6v-6c0-1.105-1.343-2-3-2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10a7 7 0 0114 0v6a2 2 0 01-2 2H7a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-white font-bold uppercase text-sm mb-2 tracking-tight">Zero-Risk Guarantee</h3>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                Full insurance on every order. 100% refund if agreed goals are not achieved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
