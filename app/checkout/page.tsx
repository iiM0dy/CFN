"use client";

import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "crypto">("card");

    return (
        <div className="bg-[#181112] text-white min-h-screen flex flex-col font-[family-name:var(--font-space-grotesk)]">
            
            <main className="flex-grow flex justify-center py-10 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left: Order Summary */}
                    <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-6">
                        <div className="rounded-xl border border-[#38292b] bg-[#261c1d] p-6 shadow-xl sticky top-24">
                            <div className="flex items-center gap-2 mb-6 text-[#b89da1]">
                                <span className="text-xl">🛒</span>
                                <h3 className="text-sm font-semibold uppercase tracking-wider">Order Summary</h3>
                            </div>
                            <div className="flex gap-4 pb-6 border-b border-[#38292b]">
                                <div className="size-16 rounded-lg bg-gradient-to-br from-primary/20 to-black border border-primary/30 flex items-center justify-center shrink-0 text-3xl">🏆</div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="text-lg font-bold">Valorant Rank Boost</h4>
                                    <p className="text-[#b89da1] text-sm">Immortal 1 <span className="text-primary mx-1">→</span> Radiant</p>
                                </div>
                            </div>
                            <div className="py-6 flex flex-col gap-4 border-b border-[#38292b]">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#b89da1]">Base Price</span>
                                    <span className="font-medium">$120.00</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#b89da1] flex items-center gap-2">⚡ Priority Order</span>
                                    <span className="font-medium">+$15.00</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#b89da1] flex items-center gap-2">👻 Offline Mode</span>
                                    <span className="font-medium">+$10.00</span>
                                </div>
                            </div>
                            <div className="pt-6 flex flex-col gap-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-[#b89da1] font-medium">Total to pay</span>
                                    <span className="text-3xl font-bold text-white">$145.00</span>
                                </div>
                                <p className="text-xs text-[#b89da1] text-right mt-1">Includes all applicable taxes</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-[#38292b] grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-xs text-[#b89da1]">
                                    <span className="text-green-500">🛡️</span>
                                    <span>Ban-Free Guarantee</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#b89da1]">
                                    <span className="text-blue-500">🔒</span>
                                    <span>256-bit SSL Secured</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block px-4">
                            <h4 className="text-sm font-bold text-white mb-3 font-[family-name:var(--font-space-grotesk)]">Why choose CFNboost?</h4>
                            <ul className="space-y-2 text-sm text-[#b89da1]">
                                <li className="flex gap-2"><span className="text-primary">✓</span> Top 500 Challengers only</li>
                                <li className="flex gap-2"><span className="text-primary">✓</span> VPN Protection enabled</li>
                                <li className="flex gap-2"><span className="text-primary">✓</span> 24/7 Live Support</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Checkout Form */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <div className="flex flex-col gap-8">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Secure Checkout</h1>
                                <p className="text-[#b89da1]">Complete your purchase securely. Your booster will start within 15 mins.</p>
                            </div>

                            {/* Step 1: Account Details */}
                            <section className="flex flex-col gap-5">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <span className="flex items-center justify-center size-6 rounded-full bg-primary text-white text-xs">1</span>
                                    Account Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#b89da1] uppercase tracking-wider">Email Address</label>
                                        <div className="relative group">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b89da1] group-focus-within:text-white transition-colors">✉</span>
                                            <input className="w-full bg-[#261c1d] border border-[#38292b] rounded-lg py-3 pl-10 pr-4 text-white placeholder-[#b89da1]/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="name@example.com" type="email" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#b89da1] uppercase tracking-wider">Discord ID (Optional)</label>
                                        <div className="relative group">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b89da1] group-focus-within:text-white transition-colors">💬</span>
                                            <input className="w-full bg-[#261c1d] border border-[#38292b] rounded-lg py-3 pl-10 pr-4 text-white placeholder-[#b89da1]/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="username#1234" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#b89da1] uppercase tracking-wider">Riot ID / Username</label>
                                        <input className="w-full bg-[#261c1d] border border-[#38292b] rounded-lg py-3 px-4 text-white placeholder-[#b89da1]/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="PlayerOne#NA1" type="text" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#b89da1] uppercase tracking-wider">Server Region</label>
                                        <select className="w-full bg-[#261c1d] border border-[#38292b] rounded-lg py-3 px-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none transition-all cursor-pointer">
                                            <option>North America (NA)</option>
                                            <option>Europe West (EUW)</option>
                                            <option>Europe Nordic &amp; East (EUNE)</option>
                                            <option>Korea (KR)</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            <div className="h-px bg-[#38292b] w-full my-2" />

                            {/* Step 2: Payment */}
                            <section className="flex flex-col gap-6">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <span className="flex items-center justify-center size-6 rounded-full bg-primary text-white text-xs">2</span>
                                    Payment Method
                                </h2>
                                <div className="grid grid-cols-3 gap-3">
                                    {([
                                        { key: "card" as const, icon: "💳", label: "Card" },
                                        { key: "paypal" as const, icon: "👛", label: "PayPal" },
                                        { key: "crypto" as const, icon: "₿", label: "Crypto" },
                                    ]).map((m) => (
                                        <button key={m.key} onClick={() => setPaymentMethod(m.key)} className={`relative flex flex-col items-center justify-center gap-2 rounded-xl py-4 px-2 transition-all ${paymentMethod === m.key ? 'border-2 border-primary bg-primary/10 text-white' : 'border border-[#38292b] bg-[#261c1d] text-[#b89da1] hover:border-white/20 hover:text-white'}`}>
                                            {paymentMethod === m.key && <span className="absolute top-2 right-2 text-primary text-sm">✓</span>}
                                            <span className="text-3xl">{m.icon}</span>
                                            <span className={`text-sm ${paymentMethod === m.key ? 'font-bold' : 'font-medium'}`}>{m.label}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="bg-[#261c1d] border border-[#38292b] rounded-xl p-6 flex flex-col gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#b89da1] uppercase tracking-wider">Card Number</label>
                                        <div className="relative group">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b89da1]">💳</span>
                                            <input className="w-full bg-[#181112] border border-[#38292b] rounded-lg py-3 pl-10 pr-4 text-white placeholder-[#b89da1]/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono" placeholder="0000 0000 0000 0000" type="text" />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 opacity-50">
                                                <div className="w-8 h-5 bg-white/20 rounded-sm" />
                                                <div className="w-8 h-5 bg-white/20 rounded-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-[#b89da1] uppercase tracking-wider">Expiry Date</label>
                                            <input className="w-full bg-[#181112] border border-[#38292b] rounded-lg py-3 px-4 text-white placeholder-[#b89da1]/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-center" placeholder="MM / YY" type="text" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-[#b89da1] uppercase tracking-wider flex justify-between">CVC <span className="cursor-help" title="3 digits on back of card">❓</span></label>
                                            <input className="w-full bg-[#181112] border border-[#38292b] rounded-lg py-3 px-4 text-white placeholder-[#b89da1]/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-center" placeholder="123" type="text" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#b89da1] uppercase tracking-wider">Name on Card</label>
                                        <input className="w-full bg-[#181112] border border-[#38292b] rounded-lg py-3 px-4 text-white placeholder-[#b89da1]/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="J. Smith" type="text" />
                                    </div>
                                </div>
                            </section>

                            {/* Submit */}
                            <div className="mt-4">
                                <button className="w-full bg-primary hover:bg-[#8a0e1c] text-white font-bold text-lg py-4 px-6 rounded-lg transition-all shadow-[0_0_20px_rgba(175,18,37,0.4)] hover:shadow-[0_0_30px_rgba(175,18,37,0.6)] flex items-center justify-center gap-3 group">
                                    🔒 Pay $145.00 &amp; Start Boost
                                </button>
                                <p className="text-center text-xs text-[#b89da1] mt-4 flex items-center justify-center gap-1">
                                    🛡️ Payments are processed securely by Stripe.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-auto border-t border-[#38292b] bg-[#261c1d] py-8 px-6 text-center">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[#b89da1] text-sm font-[family-name:var(--font-space-grotesk)]">© 2024 CFNboost Boosting. All rights reserved.</p>
                    <div className="flex gap-6 text-sm font-medium">
                        <a className="text-[#b89da1] hover:text-white transition-colors" href="#">Terms of Service</a>
                        <a className="text-[#b89da1] hover:text-white transition-colors" href="#">Privacy Policy</a>
                        <a className="text-[#b89da1] hover:text-white transition-colors" href="#">Refund Policy</a>
                    </div>
                    <div className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center border border-white/5"><span className="text-[10px] font-bold tracking-widest">VISA</span></div>
                        <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center border border-white/5"><div className="flex -space-x-1.5"><div className="size-3 rounded-full bg-white/30" /><div className="size-3 rounded-full bg-white/30" /></div></div>
                        <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center border border-white/5"><span className="text-sm">₿</span></div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
