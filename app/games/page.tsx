import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { GameGrid } from "@/components/games/game-grid"
import { CFNLogo } from "@/components/layout/cfnboost-logo"

export default async function GamesPage() {
    // Use raw query to get ALL games (both active and inactive)
    const games = await prisma.$queryRaw<any[]>`
        SELECT * FROM "GameService" ORDER BY name ASC
    `

    // Extract unique categories from the database games
    // In a more robust setup, you might have a separate Category model
    const dbCategories = Array.from(new Set(games.map(g => "All Games"))) // Default for now

    // We can define static categories or derive them if you add a category field to GameService
    const categories = ["All Games", "FPS", "MOBA", "MMO", "Action"];

    return (
        <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col font-sans overflow-x-hidden">
            <main className="grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
                {/* Cinematic Hero Section */}
                <section className="relative mb-12 rounded-xl overflow-hidden w-full shadow-[0_0_50px_-10px_rgba(175,18,37,0.3)]">
                    <div className="relative flex min-h-[500px] flex-col items-center justify-center p-8 text-center bg-cover bg-center"
                        style={{ backgroundImage: `linear-gradient(to bottom, rgba(11, 11, 11, 0.6), rgba(11, 11, 11, 0.95)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwy7WyGmG3fseRw8CRbOv9Gg0GFzlSVuiHky7YhOhccQyRMNWYkv6eVynrUoyk2R9b_acVsPPcN__JBEs0PkIN85Cq6uiotQg5i2XE1S7UQ0UD78h9jpn5z-wbbDJczEmMJh0IUeIkcwg8FYDcnlkK_B80MU3pjrKs4MiaMQCmxUbh_Rs5NIfMQfBHAzacnWVjaruiZczTox9rhcRbpeMXXZAAlXOVgzhII8GvndG4aRV-sxwuEkSzwm3hStWhTlF3r4OhHDzf-NiC')` }}>
                        <div className="z-10 max-w-3xl">
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest">
                                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                                Est. 2018 | Professional Standards
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-100 mb-4 uppercase font-cairo">
                                <span className="text-primary">CFN</span><span className="text-white">BOOST</span> <span className="text-primary">EMPIRE</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
                                Experience the gold standard in competitive gaming. Secure, elite-tier rank boosting and
                                professional coaching services tailored for champions.
                            </p>
                        </div>
                        {/* Subtle Red Glow Elements */}
                        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[120px]"></div>
                        <div className="absolute top-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[120px]"></div>
                    </div>
                </section>

                <GameGrid initialGames={games} categories={categories} />

                {/* Trust Metrics */}
                <section className="mt-20 py-12 border-t border-white/5 w-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-100 mb-1">50,000+</div>
                            <div className="text-primary text-xs font-bold uppercase tracking-widest">Orders Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-100 mb-1">4.9/5</div>
                            <div className="text-primary text-xs font-bold uppercase tracking-widest">Trustpilot Rating</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-100 mb-1">500+</div>
                            <div className="text-primary text-xs font-bold uppercase tracking-widest">Elite Boosters</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-100 mb-1">24/7</div>
                            <div className="text-primary text-xs font-bold uppercase tracking-widest">Active Support</div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-[#1A1A1A] bg-[#0B0B0B] py-12">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between gap-10">
                    <div className="flex flex-col gap-4 max-w-sm">
                        <div className="flex items-center gap-3 text-white">
                            <CFNLogo className="size-8" />
                            <span className="text-xl font-black tracking-tight uppercase font-cairo">
                                <span className="text-primary">CFN</span>
                                <span className="text-white">BOOST</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">The premier marketplace for competitive gaming services. Connect with elite players and elevate your rank today.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-bold uppercase text-sm tracking-wider">Services</h4>
                            <a className="text-gray-400 hover:text-primary text-sm transition-colors" href="#">Rank Boosting</a>
                            <a className="text-gray-400 hover:text-primary text-sm transition-colors" href="#">Coaching</a>
                            <a className="text-gray-400 hover:text-primary text-sm transition-colors" href="#">Accounts</a>
                            <a className="text-gray-400 hover:text-primary text-sm transition-colors" href="#">Duo Queue</a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-bold uppercase text-sm tracking-wider">Company</h4>
                            <Link className="text-gray-400 hover:text-primary text-sm transition-colors" href="/story">About Us</Link>
                            <a className="text-gray-400 hover:text-primary text-sm transition-colors" href="#">Careers</a>
                            <a className="text-gray-400 hover:text-primary text-sm transition-colors" href="#">Blog</a>
                            <Link className="text-gray-400 hover:text-primary text-sm transition-colors" href="/contact">Contact</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-bold uppercase text-sm tracking-wider">Legal</h4>
                            <a className="text-gray-400 hover:text-primary text-sm transition-colors" href="#">Terms of Service</a>
                            <a className="text-gray-400 hover:text-primary text-sm transition-colors" href="#">Privacy Policy</a>
                            <a className="text-gray-400 hover:text-primary text-sm transition-colors" href="#">Refund Policy</a>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mt-12 pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs font-black tracking-widest uppercase font-cairo">
                        © 2024 <span className="text-primary">CFN</span><span className="text-white">BOOST</span>. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-gray-400 text-xs">All Systems Operational</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
