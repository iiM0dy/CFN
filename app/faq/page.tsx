"use client";

import Link from "next/link";
import { useState } from "react";
import { CFNLogo } from "@/components/layout/cfnboost-logo";

const categories = [
    { id: "payments", icon: "💳", label: "Payments", desc: "Crypto, PayPal & Rates" },
    { id: "security", icon: "🛡️", label: "Security", desc: "Account Safety & VPN" },
    { id: "orders", icon: "🎮", label: "Orders", desc: "Tracking & Chat" },
    { id: "refunds", icon: "💱", label: "Refunds", desc: "Disputes & Guarantees" },
];

const faqData: Record<string, { q: string; a: string }[]> = {
    payments: [
        { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and various cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), and Litecoin (LTC). All transactions are secured with 256-bit encryption." },
        { q: "Why was my payment declined?", a: "Payments can be declined for various reasons, including insufficient funds, incorrect billing address, or bank security flags. If you are using a VPN, try disabling it during payment or contact your bank to authorize the transaction." },
        { q: "Are there any hidden fees?", a: "No. The price you see at checkout is the final price you pay. However, your payment provider or bank might charge currency conversion fees if your local currency differs from our store currency (USD)." },
    ],
    security: [
        { q: "Is my account safe during boosting?", a: 'Yes. All CFNboost boosters are required to use VPNs matching your geographic location to mimic your login patterns. We also use "Appear Offline" mode by default to ensure privacy from your friends list.' },
        { q: "Do boosters have access to my inventory?", a: "Boosters are strictly prohibited from modifying, trading, or interacting with your inventory or in-game currency unless specifically requested as part of the service. Any violation results in an immediate ban of the booster and full compensation." },
    ],
    orders: [
        { q: "How do I track my order progress?", a: "Once your order is active, you will have access to a dedicated dashboard. Here, you can see live status updates, match history, and chat directly with your assigned booster in real-time." },
        { q: "Can I pause my order?", a: "Yes, you can pause your order at any time from your dashboard if you want to play a few games yourself or if you are not available. Just remember to notify your booster beforehand to avoid scheduling conflicts." },
    ],
    refunds: [
        { q: "What is your refund policy?", a: "If a booster has not been assigned to your order yet, you are eligible for a full 100% refund. If the service has started but you wish to cancel, we will refund the remaining progress of the order." },
    ],
};

function AccordionItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className={`rounded-xl border ${open ? 'border-primary/50 bg-[#2a1d1e]' : 'border-[#533c3f] bg-[#261c1d]'} transition-colors`}>
            <button className="flex w-full cursor-pointer items-center justify-between p-6 text-left" onClick={() => setOpen(!open)}>
                <span className={`text-base font-bold ${open ? 'text-primary' : 'text-white'} transition-colors`}>{q}</span>
                <svg className={`w-6 h-6 text-[#b89da1] transition-transform duration-300 ${open ? 'rotate-180 text-primary' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {open && (
                <div className="px-6 pb-6 pt-0 text-[#b89da1] leading-relaxed border-t border-[#533c3f]/50 pt-4">
                    {a}
                </div>
            )}
        </div>
    );
}

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState("payments");

    return (
        <div className="bg-[#211113] text-white min-h-screen flex flex-col font-[family-name:var(--font-space-grotesk)]">

            <main className="flex-grow">
                {/* Hero */}
                <div className="relative w-full overflow-hidden">
                    <div className="absolute inset-0 bg-[#181112]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-20 bg-[radial-gradient(circle_at_center,rgba(175,18,37,0.4)_0%,transparent_70%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
                    </div>
                    <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
                        <span className="mb-4 inline-flex items-center rounded-full border border-[#533c3f] bg-[#261c1d] px-3 py-1 text-xs font-medium text-primary">
                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            Support Center
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-400">help you?</span>
                        </h1>
                        <p className="text-[#b89da1] text-lg max-w-2xl mb-10">
                            Search our knowledge base for answers to your questions about payments, security, orders, and more.
                        </p>
                        <div className="w-full max-w-xl group">
                            <div className="relative flex items-center">
                                <svg className="absolute left-4 w-6 h-6 text-[#b89da1] group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                <input className="block w-full pl-12 pr-4 py-4 bg-[#261c1d] border border-[#533c3f] rounded-xl text-white placeholder-[#b89da1] focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-lg" placeholder="Search for questions (e.g., 'refund policy')..." type="text" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-12 md:py-16 max-w-7xl">
                    {/* Category Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        {categories.map((c) => (
                            <button key={c.id} onClick={() => setActiveCategory(c.id)} className={`group relative overflow-hidden rounded-xl border p-6 transition-all text-left ${activeCategory === c.id ? 'border-primary/50 bg-[#261c1d] shadow-[0_0_20px_rgba(175,18,37,0.15)]' : 'border-[#533c3f] bg-[#261c1d] hover:border-primary/50 hover:shadow-[0_0_20px_rgba(175,18,37,0.15)]'}`}>
                                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg text-2xl transition-colors ${activeCategory === c.id ? 'bg-primary text-white' : 'bg-[#38292b] text-white group-hover:bg-primary group-hover:text-white'}`}>
                                    {c.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{c.label}</h3>
                                <p className="text-sm text-[#b89da1]">{c.desc}</p>
                                <div className={`absolute bottom-0 left-0 h-1 w-full bg-primary transform transition-transform origin-left ${activeCategory === c.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                            </button>
                        ))}
                    </div>

                    {/* FAQ Content */}
                    <div className="grid lg:grid-cols-[280px_1fr] gap-10">
                        {/* Sidebar */}
                        <aside className="hidden lg:block sticky top-24 h-fit">
                            <nav className="flex flex-col gap-2">
                                <p className="text-xs font-bold uppercase tracking-wider text-[#b89da1] mb-3 pl-4">Categories</p>
                                {categories.map((c) => (
                                    <button key={c.id} onClick={() => setActiveCategory(c.id)} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-all border-l-4 ${activeCategory === c.id ? 'bg-primary/10 border-primary text-white font-medium' : 'border-transparent text-[#b89da1] hover:bg-[#261c1d] hover:text-white'}`}>
                                        <span className="text-lg">{c.icon}</span>
                                        {c.label}
                                    </button>
                                ))}
                            </nav>
                            <div className="mt-10 p-6 rounded-xl bg-gradient-to-br from-[#261c1d] to-[#181112] border border-[#533c3f] text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#533c3f] text-white text-2xl">🎧</div>
                                <h4 className="font-bold text-white mb-2">Still need help?</h4>
                                <p className="text-sm text-[#b89da1] mb-4">Our support team is available 24/7 to assist you.</p>
                                <Link href="/contact" className="block w-full rounded-lg bg-white py-2 text-sm font-bold text-black hover:bg-gray-200 transition-colors text-center">Contact Support</Link>
                            </div>
                        </aside>

                        {/* Accordions */}
                        <div className="flex flex-col gap-12">
                            {Object.entries(faqData).map(([sectionId, items]) => (
                                <section key={sectionId} className={`scroll-mt-24 ${activeCategory !== sectionId && 'lg:hidden'}`} id={sectionId}>
                                    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-[#533c3f]">
                                        <span className="text-2xl">{categories.find(c => c.id === sectionId)?.icon}</span>
                                        <h2 className="text-2xl font-bold tracking-tight">{categories.find(c => c.id === sectionId)?.label}</h2>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {items.map((item, i) => (
                                            <AccordionItem key={i} q={item.q} a={item.a} defaultOpen={i === 0 && sectionId === "payments"} />
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-[#533c3f] bg-[#080808] py-12 px-6">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="flex flex-col gap-4 max-w-sm">
                        <div className="flex items-center gap-3 text-white">
                            <CFNLogo className="size-8" />
                            <span className="text-xl font-bold font-[family-name:var(--font-space-grotesk)]">CFNboost</span>
                        </div>
                        <p className="text-[#b89da1] text-sm">The premium marketplace for competitive gaming. Boost your rank, learn from the best, and dominate the leaderboards.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
                        <div className="flex flex-col gap-3">
                            <h4 className="font-bold text-white">Platform</h4>
                            <Link className="text-[#b89da1] hover:text-primary transition-colors" href="/games">Browse Games</Link>
                            <a className="text-[#b89da1] hover:text-primary transition-colors" href="#">Become a Booster</a>
                            <a className="text-[#b89da1] hover:text-primary transition-colors" href="#">Pricing</a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="font-bold text-white">Support</h4>
                            <Link className="text-[#b89da1] hover:text-primary transition-colors" href="/faq">Help Center</Link>
                            <Link className="text-[#b89da1] hover:text-primary transition-colors" href="/contact">Contact Us</Link>
                            <a className="text-[#b89da1] hover:text-primary transition-colors" href="#">Terms of Service</a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="font-bold text-white">Community</h4>
                            <a className="text-[#b89da1] hover:text-primary transition-colors" href="#">Discord</a>
                            <a className="text-[#b89da1] hover:text-primary transition-colors" href="#">Twitter</a>
                            <a className="text-[#b89da1] hover:text-primary transition-colors" href="#">Blog</a>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto mt-12 pt-8 border-t border-[#533c3f] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#b89da1]">
                    <p className="font-[family-name:var(--font-space-grotesk)]">© 2024 CFNboost Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-white transition-colors" href="#">Cookie Policy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
