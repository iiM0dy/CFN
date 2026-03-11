"use client"

import Link from "next/link"
import { useState } from "react"

function FAQItem({ q, a }: { q: string, a: string }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-[#161616] border border-[#2a1215] rounded-lg overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors text-left"
            >
                <span className="font-bold">{q}</span>
                <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-6 pb-6 pt-4 text-slate-400 text-sm leading-relaxed border-t border-white/5">
                    {a}
                </div>
            </div>
        </div>
    )
}

export default function LegitPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden border-b border-border-dark">
                <div
                    className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(8, 8, 8, 0.6), #080808), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAg9f56uQRf7VqwZj6gBBsbWpfzNDCmxZxZhuM0JvqjWGZWaLs_jmEPYZ-rUpdsp1FBADGGZuwYE3iLYeQfDUE9Ud0q7yGIK8ei4Q5HHQKL29I1uJ8AT1qq4EcjGQ23DEIfw_GmN8layxIzXlLxQLOHa5LThHuGl-mH9aXsj9w_1bTT2bwW-TTjFt3OJuLu260Otx8GmXA7cLCElVp4MNRzcOuVXHBfMl9TocebhWvZyL7XxCG7NHO9Lf4JQ9BaRJt-KczybZPuSzKX")`
                    }}
                ></div>

                <div className="relative z-10 max-w-5xl px-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1 mb-8">
                        <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
                        <span className="text-xs font-bold tracking-widest uppercase text-primary">100% Ban-Free Guarantee</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 uppercase">
                        Why CFNboost is <span className="text-primary">Legit</span>
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
                        <div className="flex items-center gap-4 bg-[#161616]/80 backdrop-blur-md border border-[#2a1215] p-4 rounded-xl shadow-[0_0_20px_rgba(175,18,37,0.15)]">
                            <div className="flex flex-col items-start">
                                <div className="flex text-primary">
                                    <span className="material-symbols-outlined fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined fill-1" style={{ fontVariationSettings: "'FILL' 0.5" }}>star_half</span>
                                </div>
                                <p className="text-sm font-medium text-slate-400">4.9/5 stars from 10,000+ reviews</p>
                            </div>
                            <div className="h-10 w-[1px] bg-[#2a1215]"></div>
                            <img alt="Trustpilot Logo" className="h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkLHyJucL8Y4gNH3Ud3Ab1DjO-ufREWV3hFrUL0qEEUR3SWcxmV7NLirI0qTjNuGKbsMH1cec-NQ2NsEgy8Va81UYi3jo113lRTDbw7o1RqGhFWD18rK7992nkMeb1mE9nmdNqRdBDk81nyZ_vDVXEucAAtA_8vYSb6aKdRo_HsQOzq6Z8UEvCqaPgUCJcdA7RyPoOnKwQcVcT5Wru-NquCaDM_94WYvsvOiI7xciVJLpQzCuL26ZhYE6qJSEo-TqYZtT7H5-02Vm2" />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/wall-of-fame" className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105">
                            VIEW TRUSTPILOT REVIEWS
                        </Link>
                        <button className="bg-[#161616] border border-[#2a1215] hover:bg-[#161616]/80 text-white font-bold py-4 px-8 rounded-lg transition-all">
                            OUR SECURITY PROMISE
                        </button>
                    </div>
                </div>
            </section>

            {/* Ironclad Security Protocols */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold uppercase tracking-tight mb-4">Ironclad Security Protocols</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">We utilize military-grade encryption and tactical operational security to ensure your account remains invisible to anti-cheat systems.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Protocol Card 1 */}
                    <div className="bg-[#161616] border border-[#2a1215] p-8 rounded-xl hover:shadow-[0_0_30px_rgba(175,18,37,0.3)] transition-all group">
                        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined text-primary text-3xl">enhanced_encryption</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">AES-256 SSL</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">End-to-end military-grade encryption for every data byte transferred during your session.</p>
                    </div>

                    {/* Protocol Card 2 */}
                    <div className="bg-[#161616] border border-[#2a1215] p-8 rounded-xl hover:shadow-[0_0_30px_rgba(175,18,37,0.3)] transition-all group">
                        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined text-primary text-3xl">vpn_lock</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Premium VPN</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Our boosters match your exact IP location using residential proxies to bypass regional detection.</p>
                    </div>

                    {/* Protocol Card 3 */}
                    <div className="bg-[#161616] border border-[#2a1215] p-8 rounded-xl hover:shadow-[0_0_30px_rgba(175,18,37,0.3)] transition-all group">
                        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined text-primary text-3xl">chat_bubble</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Encrypted Comms</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Direct communication via secure, self-destructing Discord or WhatsApp channels only.</p>
                    </div>

                    {/* Protocol Card 4 */}
                    <div className="bg-[#161616] border border-[#2a1215] p-8 rounded-xl hover:shadow-[0_0_30px_rgba(175,18,37,0.3)] transition-all group">
                        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined text-primary text-3xl">visibility_off</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Full Anonymity</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Boosters never see your login credentials; our proprietary launcher handles authentication.</p>
                    </div>
                </div>
            </section>

            {/* Our Ironclad Guarantees */}
            <section className="py-20 bg-primary/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-start gap-6 p-6 rounded-xl border border-primary/20 bg-[#161616]">
                            <span className="material-symbols-outlined text-primary text-4xl">currency_exchange</span>
                            <div>
                                <h4 className="text-lg font-bold mb-1 uppercase">Money-Back</h4>
                                <p className="text-sm text-slate-400">Instant, full refund if your service hasn't started within the guaranteed timeframe.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6 p-6 rounded-xl border border-primary/20 bg-[#161616]">
                            <span className="material-symbols-outlined text-primary text-4xl">sentiment_very_satisfied</span>
                            <div>
                                <h4 className="text-lg font-bold mb-1 uppercase">Satisfaction</h4>
                                <p className="text-sm text-slate-400">We don't mark a job as complete until you are 100% happy with the results.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6 p-6 rounded-xl border border-primary/20 bg-[#161616]">
                            <span className="material-symbols-outlined text-primary text-4xl">security</span>
                            <div>
                                <h4 className="text-lg font-bold mb-1 uppercase">Safety Insurance</h4>
                                <p className="text-sm text-slate-400">All accounts are covered by our $50,000 corporate bond for total peace of mind.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Elite Booster Verification */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
                        <div className="relative rounded-xl overflow-hidden border border-[#2a1215] aspect-video bg-[#161616] shadow-2xl">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkKuxfRRHARi_kLy2_OR3zyhh2v1o3e4nt8Hc9Pzuwds--39kICms7PTruaGQJSITB7ZOk9jHH7ynC8uaSiCYrP17WadJMFA1mFnsoojFR_DH7d88FoTX-Iw0Q8uzIFu_WFJk6mK23yJy_P5Nfa_q0H-WLD7SXGMJw2-2NkDatQoa0vIsLi85Z5zZnVCzj7xLnKe0ujFpw9_6MzV8bd5lD8eF0XXx0d8r67NttnSLbneZunK0IVks2pv6EFoRYCN2pY1uFEIF1etGu" alt="High-end gaming setup" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-primary p-6 rounded-xl hidden md:block">
                            <p className="text-3xl font-bold">Top 0.1%</p>
                            <p className="text-xs font-medium uppercase tracking-widest opacity-80">Global Player Pool</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold uppercase mb-8">Booster Vetting Process</h2>
                        <div className="space-y-8">
                            {[
                                { step: 1, title: "Identity Verification", desc: "Strict KYC (Know Your Customer) process including government-issued ID checks." },
                                { step: 2, title: "Skill Assessment", desc: "Mandatory live gameplay tests against our Pro-tier boosters to verify claimed ranks." },
                                { step: 3, title: "Security Training", desc: "Exhaustive course on operational security, VPN management, and anonymity protocols." },
                                { step: 4, title: "Hardware & Network Check", desc: "Validation of PC specs and high-speed fiber connection stability requirements." },
                                { step: 5, title: "Probation Period", desc: "30-day monitored trial with restricted access before reaching full Elite status." }
                            ].map((item) => (
                                <div key={item.step} className="flex gap-6">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center font-bold text-sm">{item.step}</div>
                                    <div>
                                        <h5 className="font-bold mb-1">{item.title}</h5>
                                        <p className="text-sm text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Secure Payment Infrastructure - Updated with Home Page style icons */}
            <section className="py-24 border-y border-border-dark bg-[#050505]">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-12">Secure Payment Infrastructure</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-40 hover:opacity-100 transition-opacity">
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 11h16M4 15h10" />
                                </svg>
                            </div>
                            <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">Encrypted gateway</span>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l1.5 9h15L21 10H3z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10V7a4 4 0 118 0v3" />
                                </svg>
                            </div>
                            <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">Secure checkout</span>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l8 4v5c0 5-3 7-8 9-5-2-8-4-8-9V7l8-4z" />
                                </svg>
                            </div>
                            <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">Fraud protection</span>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 014-4h10a4 4 0 110 8H7a4 4 0 01-4-4z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11a4 4 0 117.8-1" />
                                </svg>
                            </div>
                            <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">Privacy first</span>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21h8M12 3v12m0 0l-4-4m4 4l4-4" />
                                </svg>
                            </div>
                            <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">Chargeback shield</span>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-[11px] font-black text-gray-300 uppercase tracking-wider">SSL Secured</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section - Updated with smooth Opening Effect and Padding */}
            <section className="py-24 max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-bold uppercase text-center mb-16 underline decoration-primary/30 underline-offset-8">Trust & Reliability FAQ</h2>
                <div className="space-y-4">
                    {[
                        { q: "Can I get banned for using your services?", a: "Zero customers have been banned for our boosting services in the last 24 months. We use premium residential VPNs and mimic your human behavior patterns (including break times and movement variance) to ensure anti-cheat systems cannot flag the activity." },
                        { q: "Who has access to my account details?", a: "Our platform uses a secure API-based authentication. Your actual password is encrypted and only ever visible to our lead security officer if manual intervention is required. The booster uses a \"one-click\" launcher that does not reveal your credentials to them." },
                        { q: "What happens if my account is compromised?", a: "In the extremely unlikely event of an account issue, our Safety Insurance policy covers the full market value of your account plus a 200% service credit. We maintain a $50,000 cash reserve specifically for customer protection." },
                        { q: "Can I play other games while boosting is in progress?", a: "Yes, as long as you are not logging into the same platform (e.g., Steam or Battle.net) simultaneously. We coordinate schedules via our dashboard to ensure no overlapping logins occur." }
                    ].map((faq, i) => (
                        <FAQItem key={i} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-gradient-to-t from-primary/20 to-transparent">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6">Ready to boost with confidence?</h2>
                    <p className="text-slate-400 mb-10 text-lg">Join 50,000+ satisfied gamers who trust CFNboost for their competitive edge.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/games" className="bg-primary hover:bg-primary/90 text-white font-bold py-5 px-10 rounded-lg transition-all shadow-[0_0_20px_rgba(175,18,37,0.4)] transform hover:scale-105">
                            START YOUR ORDER
                        </Link>
                        <Link href="/contact" className="bg-transparent border border-white/20 hover:border-white/40 text-white font-bold py-5 px-10 rounded-lg transition-all flex items-center gap-2 group">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors">headset_mic</span>
                            TALK TO SUPPORT
                        </Link>
                    </div>
                    <p className="mt-8 text-xs text-slate-500 uppercase tracking-widest">Average support response time: 45 seconds</p>
                </div>
            </section>
        </div>
    )
}
