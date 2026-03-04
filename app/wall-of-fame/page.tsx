"use client";

import Link from "next/link";

const reviews = [
    { initials: "VM", name: "Viper_Main", time: "2 hours ago", game: "League of Legends", service: "Rank Boost", booster: "Shadow_99", stars: 5, text: '"Incredible speed. The booster was super chill and we won 8 games in a row. Highly recommend for anyone stuck in Emerald. Will definitely order again next season."', gradient: "from-gray-700 to-gray-900" },
    { initials: "JL", name: "Jett_Lagged", time: "5 hours ago", game: "Valorant", service: "Coaching", booster: "ValGod", stars: 5, text: '"The coaching session was eye-opening. Helped me fix my crosshair placement and utility usage on Ascent. Went from Gold 2 to Plat 1 in a week."', gradient: "from-blue-700 to-blue-900" },
    { initials: "K", name: "KrakenSlayer", time: "1 day ago", game: "Apex Legends", service: "Badges", booster: "Pred_Hunter", stars: 4, text: '"Got the 4k damage badge as promised. Took a bit longer than estimated because of server issues, but the support team kept me updated. Good service overall."', gradient: "from-primary to-[#500000]" },
    { initials: "TM", name: "TankMain_01", time: "2 days ago", game: "Overwatch 2", service: "Placement", booster: "OWL_Pro", stars: 5, text: '"Flawless placements. 5 wins, 0 losses. Placed higher than I expected. The streaming option was great too, learned a lot watching them play."', gradient: "from-purple-700 to-purple-900" },
    { initials: "", name: "Anonymous", time: "3 days ago", game: "League of Legends", service: "Duo Boost", booster: "Challenger_KR", stars: 5, text: '"Safe, secure, and fast. I was worried about account safety but the VPN usage and offline mode made it completely stealthy. Solid experience."', gradient: "" },
    { initials: "SW", name: "Silent_W", time: "4 days ago", game: "WoW", service: "Raid Carry", booster: "Method_Alt", stars: 5, text: '"Mythic raid cleared in one go. Loot funneling was as described. I got my mount and full gear set. Professional team, good comms."', gradient: "from-green-700 to-green-900" },
];

function StarIcons({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5 text-primary">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < count ? 'fill-current' : 'text-gray-600 fill-current'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export default function WallOfFamePage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#181112] text-white font-[family-name:var(--font-space-grotesk)]">
            
            <main className="flex-1 flex flex-col items-center w-full px-6 py-8 md:py-12">
                <div className="w-full max-w-7xl flex flex-col gap-10">
                    {/* Hero Section */}
                    <section className="relative overflow-hidden rounded-2xl bg-[#251a1c] border border-[#38292b]">
                        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#181112] via-[#181112]/90 to-transparent" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
                            <div className="flex flex-col gap-4 max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className="text-primary text-xs font-bold uppercase tracking-wider">Verified Reviews</span>
                                </div>
                                <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight tracking-[-0.02em]" style={{ textShadow: '0 0 20px rgba(175, 18, 37, 0.5)' }}>
                                    Customer <br className="hidden md:block" />Wall of Fame
                                </h1>
                                <p className="text-gray-300 text-lg md:text-xl font-normal leading-relaxed max-w-lg">
                                    See why 50,000+ gamers trust Airwick for their competitive edge. Real results from real players.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4 w-full md:w-auto justify-start md:justify-end">
                                <div className="flex flex-col gap-1 p-5 rounded-xl bg-[#181112]/80 backdrop-blur border border-[#38292b] min-w-[140px]">
                                    <span className="text-gray-400 text-sm font-medium">Average Rating</span>
                                    <div className="flex items-end gap-2">
                                        <span className="text-3xl font-bold text-white">4.9</span>
                                        <span className="text-sm text-gray-500 mb-1">/ 5.0</span>
                                    </div>
                                    <StarIcons count={5} />
                                </div>
                                <div className="flex flex-col gap-1 p-5 rounded-xl bg-[#181112]/80 backdrop-blur border border-[#38292b] min-w-[140px]">
                                    <span className="text-gray-400 text-sm font-medium">Orders Completed</span>
                                    <span className="text-3xl font-bold text-white">12k+</span>
                                    <span className="text-xs text-green-500 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                        +14% this week
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div className="flex flex-wrap gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#251a1c] border border-[#38292b] hover:border-primary/50 text-white text-sm font-medium transition-colors">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                                All Games
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-bold">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                5 Star Only
                            </button>
                        </div>
                        <div className="flex w-full md:w-auto gap-3">
                            <div className="relative flex-1 md:w-64">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                <input className="w-full bg-[#251a1c] border border-[#38292b] rounded-lg py-2.5 pl-10 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Search reviews..." type="text" />
                            </div>
                        </div>
                    </div>

                    {/* Reviews Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((r, i) => (
                            <div key={i} className="flex flex-col p-6 rounded-xl bg-[#251a1c] border border-[#38292b] hover:border-primary/40 hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`size-10 rounded-full ${r.gradient ? `bg-gradient-to-br ${r.gradient}` : 'bg-gray-800'} flex items-center justify-center text-white font-bold border border-[#38292b] text-sm`}>
                                            {r.initials || (
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-white text-base font-bold leading-none">{r.name}</h3>
                                            <p className="text-gray-500 text-xs mt-1">{r.time}</p>
                                        </div>
                                    </div>
                                    <StarIcons count={r.stars} />
                                </div>
                                <div className="mb-4">
                                    <div className="inline-flex flex-wrap gap-2 mb-3">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/20">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Verified
                                        </span>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#38292b] text-gray-300 border border-gray-700">{r.game}</span>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#38292b] text-gray-300 border border-gray-700">{r.service}</span>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed">{r.text}</p>
                                </div>
                                <div className="mt-auto pt-4 border-t border-[#38292b] flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Booster: <span className="text-white font-medium">{r.booster}</span></span>
                                    <button className="text-gray-500 hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="flex justify-center mt-8">
                        <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#251a1c] border border-[#38292b] hover:bg-[#38292b] hover:border-primary/30 text-white font-bold transition-all group">
                            Load More Reviews
                            <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                    </div>
                </div>
            </main>

            <footer className="bg-[#181112] border-t border-[#38292b] py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-white">
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 48 48"><path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" /></svg>
                        <span className="text-sm font-bold text-gray-400">© 2023 Airwick. All rights reserved.</span>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
                        <Link className="hover:text-white transition-colors" href="/contact">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
