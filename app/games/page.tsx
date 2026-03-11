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
            <main className="flex-grow flex flex-col items-center w-full px-6 py-8">
                {/* Hero Section */}
                <section className="w-full max-w-7xl flex flex-col gap-6 items-center text-center py-12 md:py-20 relative">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-[#0B0B0B] to-[#0B0B0B] opacity-70" />
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Live Directory
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter uppercase">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-500">Battleground</span>
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl font-light">
                        Browse our curated list of supported competitive titles. Select a game to view available boosting services, coaching sessions, and elite account options.
                    </p>
                </section>

                {/* Search & Filter - Now handled by the Client Component */}
                <GameGrid initialGames={games} categories={categories} />
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-[#1A1A1A] bg-[#0B0B0B] py-12 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
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
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs font-cairo font-black tracking-widest uppercase">© 2024 CFNBOOST. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-gray-400 text-xs">All Systems Operational</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
