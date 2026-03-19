"use client"

import { useState, useMemo } from "react"

export function BlogSearch({ posts }: { posts: any[] }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedGame, setSelectedGame] = useState("All Games")

    // Extract unique game categories from posts
    const games = useMemo(() => {
        const uniqueGames = new Set(posts.map(post => post.category).filter(Boolean))
        return ["All Games", ...Array.from(uniqueGames)]
    }, [posts])

    const filteredPosts = posts.filter(post => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesGame = selectedGame === "All Games" || post.category === selectedGame

        return matchesSearch && matchesGame
    })

    return (
        <div className="space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                {/* Minimalist Search Bar */}
                <div className="relative group w-full lg:max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-sm text-slate-500 group-focus-within:text-primary transition-colors">search</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-[14px] font-black uppercase tracking-widest focus:outline-hidden focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    )}
                </div>

                {/* Game Filters - Scrollable for many games */}
                <div className="flex-1 overflow-x-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2 lg:pb-0">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        {games.map((game) => (
                            <button
                                key={game}
                                onClick={() => setSelectedGame(game)}
                                className={`px-5 py-2.5 rounded-xl text-[14px] font-black uppercase tracking-widest transition-all border shrink-0 ${selectedGame === game
                                    ? "bg-primary border-primary text-white shadow-[0_10px_20px_-5px_rgba(175,18,37,0.4)]"
                                    : "bg-white/5 border-white/5 text-slate-500 hover:border-white/10 hover:text-white"
                                    }`}
                            >
                                {game}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Post Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <a
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col bg-surface/20 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/20 hover:bg-surface/40 transition-all duration-500"
                        >
                            <div className="relative aspect-4/3 overflow-hidden m-3 rounded-2xl">
                                <img
                                    src={post.image || "/assets/blog/setup.png"}
                                    alt={post.title}
                                    className="object-cover w-full h-full grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-2.5 py-1 rounded bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 text-[14px] font-black uppercase tracking-widest">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="px-8 pb-8 pt-4 flex flex-col flex-1">
                                <h3 className="text-xl font-black uppercase tracking-tight mb-4 group-hover:text-primary transition-all duration-300 line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-slate-500 text-[14px] font-medium leading-relaxed mb-6 line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[14px] font-black text-slate-600 uppercase tracking-widest">{post.author}</span>
                                    <span className="material-symbols-outlined text-sm text-slate-600 group-hover:text-primary transition-colors">arrow_outward</span>
                                </div>
                            </div>
                        </a>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/5">
                        <span className="material-symbols-outlined text-4xl text-slate-700 mb-4 block">sentiment_dissatisfied</span>
                        <p className="text-slate-500 text-[14px] font-black uppercase tracking-[0.2em]">No posts found matching your filters</p>
                    </div>
                )}
            </div>
        </div>
    )
}
