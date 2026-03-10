"use client";

import Link from "next/link";
import { useState } from "react";

export default function ServicesPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = [
        { q: "Is my account safe?", a: "Yes, absolutely. We use VPNs to match your location, and our boosters play in \"offline\" mode so your friends won't see you online. We have a 0% ban rate over 5000+ orders." },
        { q: "Can I play while the boost is active?", a: "You can, but you must pause the order in your dashboard first to avoid conflicting logins. We recommend letting the booster finish for the fastest results." },
        { q: "How fast is the service?", a: "Most orders start within 15 minutes of payment. A typical rank up (e.g. Gold 1 to Gold 2) takes about 2-4 hours depending on win streaks." },
        { q: "What servers do you cover?", a: "We cover all major regions including North America (NA), Europe (EU), Asia-Pacific (APAC), and Oceania (OCE)." },
    ];

    return (
        <div className="bg-[#181112] text-white min-h-screen flex flex-col overflow-x-hidden font-[family-name:var(--font-space-grotesk)]">

            <main className="flex-1 flex flex-col">
                {/* Hero Section */}
                <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtT1jxDnxtsGIYRHSMliDraQn_yLp0tQ7G1WJ7RCBN9NdrKIRTuaGkdIUKlrOvPWikxRxk5MFhBRZjKk7hGER1bAQZpd0cuR4jwWRnD-eHOlI6Wibh51FP3RZtyZQEx0Onbt05ETSRiUQkyWD186PINwATOjSsIKbW8-9-8vg4hpw9lLtovh2yKoqwOxKHZTwisuocZjUJrBv0kjSCJBPT2IX4YE5Q4R-fB5jc1nDqjIRKmMsBObn6_FxrzBqZRmrO3dwv-CAHdgJW')` }} />
                    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#181112]/80 via-[#181112]/60 to-[#181112]" />
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#181112] via-transparent to-[#181112]" />
                    <div className="container mx-auto px-4 md:px-10 relative z-10 pt-10">
                        <div className="max-w-3xl flex flex-col gap-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 w-fit backdrop-blur-sm">
                                <span className="text-primary text-sm">🛡️</span>
                                <span className="text-primary text-xs font-bold uppercase tracking-wider">Radiant Tier Boosters</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tighter uppercase drop-shadow-lg">
                                Dominate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-400">The Lobby</span>.
                            </h1>
                            <p className="text-gray-300 text-lg md:text-xl max-w-xl font-light">
                                Premium Valorant boosting services. Safe, anonymous, and executed by the top 0.1% of players. Stop grinding, start climbing.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <Link href="/services/valorant" className="flex h-14 px-8 items-center justify-center rounded-lg bg-primary hover:bg-[#8a0e1d] text-white font-bold text-lg tracking-wide shadow-[0_0_20px_rgba(175,18,37,0.5)] transition-all transform hover:scale-105">
                                    Boost Now 🚀
                                </Link>
                                <button className="flex h-14 px-8 items-center justify-center rounded-lg bg-[#261c1d] border border-[#38292b] hover:border-primary text-white font-medium text-lg tracking-wide transition-all">
                                    View Demo ▶
                                </button>
                            </div>
                            {/* Trust Indicators */}
                            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/10">
                                <div className="flex -space-x-2">
                                    {[
                                        "https://lh3.googleusercontent.com/aida-public/AB6AXuAAK9zKjE_C32T_4_QD5Uy3UojRIed9_xbkfnD2LQN9Uil1DGlTjWXPRDabirsjeQ7F2gDPwzTrS6zuxTq7W9z4ONWr5RcR2mSP-2PjIeqDf6BLEkiFhsT5PuxncKCi8qd2ZdtCxjYsPlMV2l0XE6lqePWf1HUPr2bY3OOwtZEqXvL1xf5n-q-iLh0AN7KflU_K3kYPlaczHFhuGViud7-rs8BGUlzc2oU_YJyba_SR-eZQ0QEFhRvsYpg6k9qCLHEMZV7R9wtBipXi",
                                        "https://lh3.googleusercontent.com/aida-public/AB6AXuAW44E4BtHbQv-INHbU4AjH6yMFdO6nQTA3WO__IZ4HJ8eVdlvHikTHT09K-EeUFAQ7Lpt7qQZ_W7Gg55WVgMiq9GbOLOTU_zeHop0ce6I_OU8PcxnD4lDWU2QKP-s-xQvyUaGtcYxr4NSN2maRY_MKQTJOaChwiTglHUh6HcOv5OZGJLqx4p2kpA0dwuQe_UaBzgkxs4RbzCzUusbRR5bBEaeka4OHM3OQdeCCwwYYsQnw2yF7YubfQ_qcIDwUGzUKqT7Ek6XqfLFn",
                                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCzG7PJeoyysq_mAMJUuoHwdsFgBRLy23cI4y_8FPzg5WIaBqhmfDSbpjuy4zXuPGxFjtcC0cCMPPMwVFdlmyuKPjSAPLU-z63suVruBWFhMmoRa9yGzti_CZKn0ymlmaVYHKIe-RqzrsGt6wMU7DxfC13wPWqHBsGIn7ye7FLQxi70Fx8jsATKYsyvEmxWmUX-XHbP6RwnnQk-r3ZON7lifVNqyc0Y2pVsyiyhIpKBUatbqsfiCMncGIKyriUEzqRTSJNRrZHg4zz1",
                                    ].map((src, i) => (
                                        <img key={i} alt="User" className="w-8 h-8 rounded-full border-2 border-[#181112]" src={src} />
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-[#181112] bg-primary flex items-center justify-center text-[10px] font-bold text-white">+2k</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex text-yellow-500 text-sm">⭐⭐⭐⭐⭐</div>
                                    <span className="text-xs text-gray-400 font-medium">4.9/5 Rating from 2000+ Orders</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-0 bottom-0 md:right-10 md:bottom-10 z-0 opacity-20 md:opacity-40 pointer-events-none text-primary text-[200px] md:text-[400px] rotate-12">🎯</div>
                </section>

                {/* Service Categories */}
                <section className="py-16 bg-[#181112]">
                    <div className="container mx-auto px-4 md:px-10">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Choose Your Service</h2>
                                <p className="text-gray-400">Select the type of boost you need to dominate the ladder.</p>
                            </div>
                            <Link href="/services/valorant" className="text-primary hover:text-white transition-colors flex items-center gap-1 text-sm font-bold uppercase tracking-wider">
                                View All Services →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: "📈", title: "Rank Boosting", desc: "We play on your account to reach your desired rank. Fast & Anonymous.", color: "primary", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmQh4mUTJOso3jp3HHwlk9GzilRw62um_g1y7l2vVAWLEZLdCje5SniTT-3YYutaOksEi_dOyJkw5hEGiMbFt-eS76cIbcI5MANQIwg-fawl_nkQAtxNn4msSIc8QdxQ7BTepf8920VHNfJvc3T_Vm3PiCkeyrRW-QGUBkzjJVEplIIy19Ky5wCslcTaMVPg__Sbt6PkT7S3jzvl-kRZztdksKeBCJucsP_YxQbz48F2C9GAHK7zpg-K3vnbHjN_DzfOm0T8QdOEt2", href: "/services/valorant" },
                                { icon: "🏆", title: "Placement Matches", desc: "Guarantee a high starting rank for the new season with 5/5 wins.", color: "blue", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBNUdDuQau5JUZJkwKLtOzvls3Jry8Qq4w5CW5aN7cq8wMUJm7dM43dP90vhjP3C_PRsx_2wie-kpbxVt74U6CMYdmm2Yxgl7h6LPrgybYE35skJaEq6tqWKDtspjhNaWOjmuIuHBgEd-2s3PHs2RoMFJzApZYrK0yr4Gxrd4cjCYYt8IX90matMb0iZdJB_GrEvUDpFaEhZNGIDLS6fakyRTgM3mPvwEcRDphfEB3OuMhw057MLtMQfXtjbdF3645dfc2YXAr0UyX", href: "/services/valorant" },
                                { icon: "🎓", title: "Coaching", desc: "1-on-1 sessions with pro players. Learn macro, aim, and agent utility.", color: "green", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbVRAw9NnkVp6N26aqSVPJoKnpbTrrkR8PJekZ5hzvW1M0NnB4St-ZZAO-emJJFAZgcnPZPx3nAVlsObUt8pW30hzHtLlbH6ef0zPF4sZEVoC9Vu-IblngFj8k544hZ_PcSLxfrJUNiKMp7Xrvb8NLjLB_dESbJRPcPsUbWGYM3FjwwO7jsKGOOA5yDi_DlkDC1_RHL5WfOmqM4x9BfKv7Z191p3lM_zXFBB1JbCMsG9sRsEHsMZmfhU1RjcaY990wYWOybQQiIzGn", href: "/services/valorant" },
                            ].map((s) => (
                                <Link key={s.title} href={s.href} className="group relative bg-[#261c1d] rounded-xl overflow-hidden border border-[#38292b] hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(175,18,37,0.3)] cursor-pointer">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#181112] to-transparent opacity-80 z-10" />
                                    <div className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${s.img}')` }} />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col gap-2">
                                        <div className={`size-10 rounded-lg ${s.color === 'primary' ? 'bg-primary/20 text-primary border-primary/30' : s.color === 'blue' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'} backdrop-blur-md flex items-center justify-center mb-2 border text-xl`}>{s.icon}</div>
                                        <h3 className={`text-xl font-bold text-white group-hover:${s.color === 'primary' ? 'text-primary' : s.color === 'blue' ? 'text-blue-400' : 'text-green-400'} transition-colors`}>{s.title}</h3>
                                        <p className="text-gray-400 text-sm">{s.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Calculator */}
                <section className="py-20 bg-[#211113] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    <div className="container mx-auto px-4 md:px-10 relative z-10">
                        <div className="max-w-4xl mx-auto bg-[#261c1d] rounded-2xl border border-[#38292b] shadow-2xl overflow-hidden">
                            <div className="p-8 md:p-10">
                                <div className="flex flex-col md:flex-row gap-10">
                                    {/* Left: Controls */}
                                    <div className="flex-1 space-y-8">
                                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">🧮 Calculate Your Boost</h3>
                                        <div className="mb-6">
                                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 block">Current Rank</label>
                                            <div className="grid grid-cols-5 gap-2 mb-3">
                                                {[
                                                    { name: "Iron", color: "bg-gray-600" },
                                                    { name: "Brnz", color: "bg-orange-700" },
                                                    { name: "Silv", color: "bg-slate-400", active: true },
                                                    { name: "Gold", color: "bg-yellow-500" },
                                                    { name: "Plat", color: "bg-teal-500" },
                                                ].map((r) => (
                                                    <button key={r.name} className={`${r.active ? 'bg-primary/20 border-primary' : 'bg-[#38292b] hover:bg-primary/20 hover:border-primary border-transparent'} border rounded p-2 flex flex-col items-center justify-center gap-1 transition-all relative`}>
                                                        {r.active && <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />}
                                                        <div className={`w-6 h-6 rounded-full ${r.color}`} />
                                                        <span className={`text-[10px] ${r.active ? 'text-white font-bold' : 'text-gray-300'} uppercase`}>{r.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                            <select className="w-full bg-[#181112] border border-[#38292b] text-white rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                                                <option>Silver 2</option><option>Silver 3</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-center -my-2 relative z-10">
                                            <div className="bg-[#261c1d] p-1 rounded-full border border-[#38292b] text-gray-500">↓</div>
                                        </div>
                                        <div className="mt-4">
                                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 block">Desired Rank</label>
                                            <div className="grid grid-cols-5 gap-2 mb-3">
                                                {[
                                                    { color: "bg-gray-600", dis: true },
                                                    { color: "bg-orange-700", dis: true },
                                                    { color: "bg-slate-400", dis: true },
                                                    { name: "Gold", color: "bg-yellow-500", active: true },
                                                    { name: "Plat", color: "bg-teal-500" },
                                                ].map((r, i) => (
                                                    <button key={i} className={`${r.dis ? 'opacity-50 cursor-not-allowed' : r.active ? 'bg-primary/20 border-primary' : 'bg-[#38292b] hover:bg-primary/20 hover:border-primary border-transparent'} border border-transparent rounded p-2 flex flex-col items-center justify-center gap-1 transition-all`}>
                                                        <div className={`w-6 h-6 rounded-full ${r.color}`} />
                                                        {r.name && <span className="text-[10px] text-white font-bold uppercase">{r.name}</span>}
                                                    </button>
                                                ))}
                                            </div>
                                            <select className="w-full bg-[#181112] border border-[#38292b] text-white rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none">
                                                <option>Gold 3</option><option>Platinum 1</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-4 mt-6">
                                            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none">
                                                <input className="rounded bg-[#181112] border-[#38292b] text-primary focus:ring-primary" type="checkbox" />
                                                Duo Queue (+20%)
                                            </label>
                                            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none">
                                                <input className="rounded bg-[#181112] border-[#38292b] text-primary focus:ring-primary" type="checkbox" defaultChecked />
                                                Stream Game (Free)
                                            </label>
                                        </div>
                                    </div>
                                    {/* Right: Summary */}
                                    <div className="w-full md:w-80 bg-[#181112] rounded-xl p-6 border border-[#38292b] flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-4">Order Summary</h4>
                                            <div className="flex justify-between items-center mb-2"><span className="text-gray-400 text-sm">Boost</span><span className="text-white text-sm font-medium">Silver 2 → Gold 3</span></div>
                                            <div className="flex justify-between items-center mb-2"><span className="text-gray-400 text-sm">Server</span><span className="text-white text-sm font-medium">NA / EU</span></div>
                                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#38292b]"><span className="text-gray-400 text-sm">ETA</span><span className="text-white text-sm font-medium">~14 Hours</span></div>
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-gray-400 font-medium">Total</span>
                                                <span className="text-3xl font-bold text-primary">$24.50</span>
                                            </div>
                                        </div>
                                        <div className="mt-8 flex flex-col gap-3">
                                            <Link href="/checkout" className="w-full py-4 rounded-lg bg-primary hover:bg-[#8a0e1d] text-white font-bold text-lg shadow-lg shadow-primary/20 transition-all text-center">Purchase Boost</Link>
                                            <p className="text-[10px] text-center text-gray-500 flex items-center justify-center gap-1">🔒 Secure 256-bit SSL encrypted payment</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reviews & FAQ Grid */}
                <section className="py-16 bg-[#181112]">
                    <div className="container mx-auto px-4 md:px-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Reviews */}
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-white">Latest Reviews</h2>
                                    <div className="flex gap-2">
                                        <button className="size-8 rounded-full border border-[#38292b] flex items-center justify-center text-white hover:bg-[#261c1d]">←</button>
                                        <button className="size-8 rounded-full border border-[#38292b] flex items-center justify-center text-white hover:bg-[#261c1d]">→</button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {[
                                        { name: "ShadowPlayer99", time: "2h ago", text: "\"Absolute insanity. The booster played Reyna and dropped 30 kills every game. Went from Silver to Plat in a weekend.\"", order: "Rank Boost (Silver -> Plat)", orderColor: "text-primary", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtBJaQ3bOC78GmyswdKUJoQibXMrzT9L0F49UQ5oMHHSCdQDb8XKN65Mgz07HfhC-MpYhVqWnQwu6RfbDpDrrOeR_ow9f3jWedIpgcL04xh-Vg_LOiO-WKgUAEW1UBeJS9HEl1WUxWP3R2QA5k1Y2_7mK3UkZRqpN9jrhcQJG5QSuU2FwZG5dgLR_w-l-6mgOCo4E6zgoJbO4bQ8c4QVfym0x7p2bNTu27L__z19v6mcyleVO3tb7Hv3VhNA69deIc-ZRQ1hjodUXV" },
                                        { name: "JettMain4Life", time: "1d ago", text: "\"Coaching session was super helpful. Learned some insane lineups for Sova on Ascent.\"", order: "Coaching (2 Hours)", orderColor: "text-green-500", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-a-KPJxZH0jQdTJ9Nc11ti4PnNXgF8tB7Wh4CNUH8RmmlqSUVplwRAR6lRf3TxzhPsGJsQsr8HqENENLtVWc3a-HLO3v3cKUDvipkqJxDAQcJWhtBMRhe0oPDecuqIlHRblK5ChZ3FyyNhbN4dnnSOYkkBQcjMAoqP76svsSkzoY1Xek5xf88dIa29VgjvmcMiy5WoY9P0tW_k4AFHdT2xZpNqRnENHJMa8eg6IN_gwsmDaEXXgO7OBVsya12gyemRonO5XR8bzSL" },
                                    ].map((r) => (
                                        <div key={r.name} className="bg-[#261c1d] p-5 rounded-lg border border-[#38292b]">
                                            <div className="flex items-start gap-4">
                                                <div className="size-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden shrink-0">
                                                    <img alt={r.name} className="w-full h-full object-cover" src={r.img} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h4 className="text-white font-bold text-sm">{r.name}</h4>
                                                        <span className="text-xs text-gray-500">{r.time}</span>
                                                    </div>
                                                    <div className="flex text-primary text-sm mb-2">⭐⭐⭐⭐⭐</div>
                                                    <p className="text-gray-300 text-sm leading-relaxed">{r.text}</p>
                                                    <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#181112] border border-[#38292b]">
                                                        <span className="text-[10px] text-gray-400 uppercase font-bold">Verified Order:</span>
                                                        <span className={`text-[10px] ${r.orderColor} font-medium`}>{r.order}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ */}
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-8">Frequent Questions</h2>
                                <div className="space-y-4">
                                    {faqs.map((f, i) => (
                                        <div key={i} className="bg-[#261c1d] rounded-lg border border-[#38292b] overflow-hidden">
                                            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full cursor-pointer items-center justify-between p-4 font-medium text-white hover:bg-[#38292b]/50 transition-colors text-left">
                                                <span>{f.q}</span>
                                                <span className={`transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}>▾</span>
                                            </button>
                                            {openFaq === i && (
                                                <div className="border-t border-[#38292b] px-4 py-4 text-sm text-gray-400 leading-relaxed bg-[#211113]/50">{f.a}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-[#100b0c] border-t border-[#38292b] pt-16 pb-8">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-2 text-white mb-6">
                                <span className="text-primary text-3xl">🎮</span>
                                <h2 className="text-xl font-bold uppercase font-[family-name:var(--font-space-grotesk)]">CFNboost</h2>
                            </div>
                            <p className="text-gray-500 text-sm mb-6">The world&apos;s most trusted competitive gaming marketplace. Join thousands of players achieving their dream rank today.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Services</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><Link className="hover:text-primary transition-colors" href="/services/valorant">Valorant Boosting</Link></li>
                                <li><a className="hover:text-primary transition-colors" href="#">League of Legends</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">CS2 Boosting</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Overwatch 2</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Support</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><Link className="hover:text-primary transition-colors" href="/contact">Help Center</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="/dashboard">Track Order</Link></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Become a Booster</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Secure Payment</h4>
                            <div className="flex flex-wrap gap-2">
                                <div className="h-8 w-12 bg-white rounded flex items-center justify-center text-xs font-bold text-black">VISA</div>
                                <div className="h-8 w-12 bg-white rounded flex items-center justify-center text-xs font-bold text-black">MC</div>
                                <div className="h-8 w-12 bg-white rounded flex items-center justify-center text-xs font-bold text-black">PP</div>
                                <div className="h-8 w-12 bg-white rounded flex items-center justify-center text-xs font-bold text-black">BTC</div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-[#38292b] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600 text-xs text-center md:text-left font-[family-name:var(--font-space-grotesk)]">© 2023 CFNboost. All rights reserved. Valorant is a trademark of Riot Games, Inc. CFNboost is not endorsed by or affiliated with Riot Games.</p>
                        <div className="flex gap-6 text-gray-600 text-xs">
                            <a className="hover:text-gray-400" href="#">Privacy Policy</a>
                            <a className="hover:text-gray-400" href="#">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
