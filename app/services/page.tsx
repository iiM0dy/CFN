"use client";

import Link from "next/link";
import { useState } from "react";
import { useCurrency } from "@/context/currency-context";

export default function ServicesPage() {
    const { formatPrice } = useCurrency();
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = [
        { q: "Is my account safe?", a: "Yes, absolutely. We use VPNs to match your location, and our boosters play in \"offline\" mode so your friends won't see you online. We have a 0% ban rate over 5000+ orders." },
        { q: "Can I play while the boost is active?", a: "You can, but you must pause the order in your dashboard first to avoid conflicting logins. We recommend letting the booster finish for the fastest results." },
        { q: "How fast is the service?", a: "Most orders start within 15 minutes of payment. A typical rank up (e.g. Gold 1 to Gold 2) takes about 2-4 hours depending on win streaks." },
        { q: "What servers do you cover?", a: "We cover all major regions including North America (NA), Europe (EU), Asia-Pacific (APAC), and Oceania (OCE)." },
    ];

    return (
        <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col font-cairo overflow-x-hidden">
            <main className="grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-9 pb-8">
                {/* Tactical Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-9">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <span className="text-white">Services</span>
                </div>

                {/* Cinematic Hero Section */}
                <section className="relative mb-12 rounded-xl overflow-hidden w-full shadow-[0_0_50px_-10px_rgba(175,18,37,0.3)]">
                    <div className="relative flex min-h-[500px] flex-col items-center justify-center p-8 text-center bg-cover bg-center"
                        style={{ backgroundImage: `linear-gradient(to bottom, rgba(11, 11, 11, 0.7), rgba(11, 11, 11, 0.95)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtT1jxDnxtsGIYRHSMliDraQn_yLp0tQ7G1WJ7RCBN9NdrKIRTuaGkdIUKlrOvPWikxRxk5MFhBRZjKk7hGER1bAQZpd0cuR4jwWRnD-eHOlI6Wibh51FP3RZtyZQEx0Onbt05ETSRiUQkyWD186PINwATOjSsIKbW8-9-8vg4hpw9lLtovh2yKoqwOxKHZTwisuocZjUJrBv0kjSCJBPT2IX4YE5Q4R-fB5jc1nDqjIRKmMsBObn6_FxrzBqZRmrO3dwv-CAHdgJW')` }}>
                        <div className="z-10 max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                                <span className="material-symbols-outlined text-xs">bolt</span>
                                Service Detail
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 uppercase font-cairo leading-tight">
                                ELITE <span className="text-primary">SERVICES</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
                                Deploy precision-engineered gaming solutions. From rank augmentation to elite tactical training,
                                our operatives deliver results where others fail.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                                <Link href="/games" className="px-8 py-4 bg-primary hover:bg-[#8a0e1d] text-white font-black text-sm uppercase tracking-[0.2em] rounded-lg shadow-lg shadow-primary/20 transition-all transform hover:scale-105 flex items-center gap-2">
                                    DEPLOY NOW <span className="material-symbols-outlined text-sm">rocket_launch</span>
                                </Link>
                                <button className="px-8 py-4 bg-[#161616] border border-white/5 hover:border-primary/50 text-white font-black text-sm uppercase tracking-[0.2em] rounded-lg transition-all flex items-center gap-2 group">
                                    HQ BROADCAST <span className="material-symbols-outlined text-sm group-hover:text-primary transition-colors">play_circle</span>
                                </button>
                            </div>
                        </div>
                        {/* Dramatic Glows - Balanced */}
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[140px]"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>
                    </div>
                </section>

                {/* Service Categories */}
                <section className="py-12 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                <span className="h-8 w-1 bg-primary rounded-full"></span>
                                Tactical Categories
                            </h2>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Select your specialized deployment objective</p>
                        </div>
                        <Link href="/games" className="text-primary hover:text-white transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] border-b border-primary/0 hover:border-primary pb-1">
                            VIEW ALL OPERATIONS <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: "trending_up", title: "Rank Augmentation", desc: "Surgical execution to your desired competitive tier. Fast, anonymous, and elite.", color: "primary", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmQh4mUTJOso3jp3HHWlk9GzilRw62um_g1y7l2vVAWLEZLdCje5SniTT-3YYutaOksEi_dOyJkw5hEGiMbFt-eS76cIbcI5MANQIwg-fawl_nkQAtxNn4msSIc8QdxQ7BTepf8920VHNfJvc3T_Vm3PiCkeyrRW-QGUBkzjJVEplIIy19Ky5wCslcTaMVPg__Sbt6PkT7S3jzvl-kRZztdksKeBCJucsP_YxQbz48F2C9GAHK7zpg-K3vnbHjN_DzfOm0T8QdOEt2", href: "/games" },
                            { icon: "verified", title: "Tier Placements", desc: "Secure a dominant season start. 100% win-rate guarantee on calibration matches.", color: "blue", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBNUdDuQau5JUZJkwKLtOzvls3Jry8Qq4w5CW5aN7cq8wMUJm7dM43dP90vhjP3C_PRsx_2wie-kpbxVt74U6CMYdmm2Yxgl7h6LPrgybYE35skJaEq6tqWKDtspjhNaWOjmuIuHBgEd-2s3PHs2RoMFJzApZYrK0yr4Gxrd4cjCYYt8IX90matMb0iZdJB_GrEvUDpFaEhZNGIDLS6fakyRTgM3mPvwEcRDphfEB3OuMhw057MLtMQfXtjbdF3645dfc2YXAr0UyX", href: "/games" },
                            { icon: "school", title: "Field Coaching", desc: "1-on-1 strategic insight from top-tier operatives. Mastering macro and mechanics.", color: "green", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbVRAw9NnkVp6N26aqSVPJoKnpbTrrkR8PJekZ5hzvW1M0NnB4St-ZZAO-emJJFAZgcnPZPx3nAVlsObUt8pW30hzHtLlbH6ef0zPF4sZEVoC9Vu-IblngFj8k544hZ_PcSLxfrJUNiKMp7Xrvb8NLjLB_dESbJRPcPsUbWGYM3FjwwO7jsKGOOA5yDi_DlkDC1_RHL5WfOmqM4x9BfKv7Z191p3lM_zXFBB1JbCMsG9sRsEHsMZmfhU1RjcaY990wYWOybQQiIzGn", href: "/games" },
                        ].map((s) => (
                            <Link key={s.title} href={s.href} className="group relative aspect-video md:aspect-4/3 rounded-xl overflow-hidden border border-white/5 bg-[#161616] transition-all duration-300 hover:shadow-[0_0_30px_rgba(175,18,37,0.3)] hover:-translate-y-2 hover:border-primary">
                                <div className="absolute inset-0 bg-linear-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent z-10" />
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${s.img}')` }} />
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex flex-col gap-2">
                                    <div className="size-12 rounded-lg bg-primary/10 border border-primary/20 backdrop-blur-md flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                                        <span className="material-symbols-outlined text-xl">{s.icon}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight">{s.title}</h3>
                                    <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-sm">{s.desc}</p>
                                </div>
                            </Link>
                        ))}
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
                                                <span className="text-3xl font-bold text-primary">{formatPrice(24.50)}</span>
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
                                <span className="text-xl font-black tracking-tight uppercase font-cairo">
                                    <span className="text-primary">CFN</span>
                                    <span className="text-white">BOOST</span>
                                </span>
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
                        <p className="text-gray-600 text-xs text-center md:text-left font-cairo font-black tracking-widest uppercase">© 2024 CFNBOOST. All rights reserved. Valorant is a trademark of Riot Games, Inc. <span className="font-cairo font-black">CFNboost</span> is not endorsed by or affiliated with Riot Games.</p>
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
