"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Favorite {
    id: string;
    serviceId: string;
    service: {
        id: string;
        name: string;
        image?: string;
        displayPrice: string;
        game: {
            name: string;
            slug: string;
        };
    };
}

export default function FavoritesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user) {
            fetchFavorites();
        } else if (status === "unauthenticated") {
            setLoading(false);
        }
    }, [session, status]);

    const fetchFavorites = async () => {
        try {
            const res = await fetch("/api/favorites");
            if (res.ok) {
                const data = await res.json();
                setFavorites(data);
            }
        } catch (error) {
            console.error("Error fetching favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (e: React.MouseEvent, serviceId: string) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const res = await fetch(`/api/favorites?serviceId=${serviceId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setFavorites(favorites.filter((fav) => fav.serviceId !== serviceId));
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    if (loading) {
        return (
            <div className="bg-[#0B0B0B] min-h-screen flex items-center justify-center">
                <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col font-cairo overflow-x-hidden">
            <main className="grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-9 pb-24">
                {/* Tactical Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-9">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <span className="text-white">Favorites</span>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
                            SAVED <span className="text-primary">ITEMS</span>
                        </h1>
                        <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.3em] max-w-xl">
                            Premium boosts and elite services saved for your next session. Ready to elevate your gameplay across all titles.
                        </p>
                    </div>
                </div>

                {/* Content Grid */}
                {status === "unauthenticated" ? (
                    <div className="py-32 text-center bg-[#111111]/50 rounded-3xl border border-dashed border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/5 opacity-20 blur-3xl pointer-events-none group-hover:opacity-40 transition-opacity"></div>
                        <span className="material-symbols-outlined text-7xl text-primary/30 mb-8 block font-light">lock</span>
                        <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-4">LOGIN REQUIRED</h2>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mb-12 max-w-md mx-auto leading-relaxed">
                            Sign in to your account to access and manage your collection of saved services.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                            <Link href="/login" className="px-10 py-4 bg-primary hover:bg-[#8a0e1d] text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-xl transition-all shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95">
                                SIGN IN
                            </Link>
                            <Link href="/register" className="px-10 py-4 bg-white/5 border border-white/10 hover:border-primary/50 text-slate-300 text-[11px] font-black uppercase tracking-[0.3em] rounded-xl transition-all">
                                CREATE ACCOUNT
                            </Link>
                        </div>
                    </div>
                ) : favorites.length === 0 ? (
                    <div className="py-40 text-center bg-[#111111]/50 rounded-3xl border border-dashed border-white/5">
                        <span className="material-symbols-outlined text-7xl text-slate-800 mb-8 block">favorite</span>
                        <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">COLLECTION EMPTY</h3>
                        <p className="text-slate-600 text-[10px] uppercase tracking-[0.5em] font-black mb-12">You haven't saved any services to your favorites yet</p>
                        <Link href="/games" className="px-8 py-3 bg-[#161616] border border-white/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all">
                            BROWSE SERVICES
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {favorites.map((fav) => (
                            <Link
                                key={fav.id}
                                href={`/services/${fav.serviceId}`}
                                className="group relative aspect-3/4 rounded-2xl overflow-hidden border border-white/5 bg-[#111111] transition-all duration-500 hover:shadow-[0_0_50px_rgba(175,18,37,0.25)] hover:-translate-y-3 hover:border-primary/40 block"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    {fav.service.image ? (
                                        <img
                                            src={fav.service.image}
                                            alt={fav.service.name}
                                            className="w-full h-full object-cover object-[center_20%] group-hover:scale-110 transition-all duration-1000 opacity-60 group-hover:opacity-100"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-linear-to-br from-primary/30 via-[#111111] to-[#0B0B0B]" />
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent" />
                                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Action Buttons Overlay */}
                                <div className="absolute top-5 right-5 z-20 flex gap-2">
                                    <button
                                        onClick={(e) => removeFavorite(e, fav.serviceId)}
                                        className="size-10 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-xl"
                                        title="Remove from favorites"
                                    >
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-10 transition-transform duration-500 group-hover:-translate-y-2">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[8px] font-black uppercase tracking-[0.2em] rounded-lg">
                                            {fav.service.game.name}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-primary transition-colors uppercase tracking-tighter leading-tight">
                                        {fav.service.name}
                                    </h3>

                                    <div className="flex flex-col gap-2 mb-8 border-l-2 border-primary/20 pl-4">
                                        <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-[0.15em]">
                                            <span className="material-symbols-outlined text-[14px] text-primary">verified_user</span>
                                            VPN P-ACTIVE
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-[0.15em]">
                                            <span className="material-symbols-outlined text-[14px] text-primary">bolt</span>
                                            INSTANT INIT
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5 group-hover:border-primary/20 transition-colors">
                                        <div>
                                            <div className="text-3xl font-black text-white tracking-tighter font-cairo">
                                                <span className="text-primary/50 text-xl font-medium mr-0.5">$</span>
                                                {fav.service.displayPrice}
                                            </div>
                                        </div>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:rotate-45 transition-all duration-500 shadow-xl">
                                            <span className="material-symbols-outlined text-lg">north_east</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative scanline */}
                                <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-white/5 to-transparent h-1 opacity-0 group-hover:animate-scanline"></div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
