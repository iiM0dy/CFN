"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/context/currency-context";

interface ServiceFavorite {
    id: string;
    serviceId: string;
    service: {
        id: string;
        name: string;
        slug: string;
        image?: string;
        displayPrice: string;
        game: {
            name: string;
            slug: string;
        };
    };
}

interface GameFavorite {
    id: string;
    gameId: string;
    game: {
        id: string;
        name: string;
        slug: string;
        bgImage: string;
    };
}

export default function FavoritesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { formatPrice } = useCurrency();
    const [serviceFavorites, setServiceFavorites] = useState<ServiceFavorite[]>([]);
    const [gameFavorites, setGameFavorites] = useState<GameFavorite[]>([]);
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
                setServiceFavorites(data.services || []);
                setGameFavorites(data.games || []);
            }
        } catch (error) {
            console.error("Error fetching favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeServiceFavorite = async (e: React.MouseEvent, serviceId: string) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const res = await fetch(`/api/favorites?serviceId=${serviceId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setServiceFavorites(serviceFavorites.filter((fav) => fav.serviceId !== serviceId));
            }
        } catch (error) {
            console.error("Error removing service favorite:", error);
        }
    };

    const removeGameFavorite = async (e: React.MouseEvent, gameId: string) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const res = await fetch(`/api/favorites?gameId=${gameId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setGameFavorites(gameFavorites.filter((fav) => fav.gameId !== gameId));
            }
        } catch (error) {
            console.error("Error removing game favorite:", error);
        }
    };

    if (loading) {
        return (
            <div className="bg-[#0B0B0B] min-h-screen flex items-center justify-center">
                <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    const hasFavorites = serviceFavorites.length > 0 || gameFavorites.length > 0;

    return (
        <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col font-cairo overflow-x-hidden">
            <main className="grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-9 pb-24">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-[14px] font-bold text-slate-500 mb-9">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <span className="text-white">Favorites</span>
                </div>

                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-4">
                        Your <span className="text-primary">Collection</span>
                    </h1>
                    <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                        Easily access your preferred games and services. Everything you've saved to help you level up and dominate is right here.
                    </p>
                </div>

                {status === "unauthenticated" ? (
                    <div className="py-32 text-center bg-[#111] rounded-3xl border border-dashed border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5 opacity-20 blur-3xl pointer-events-none"></div>
                        <span className="material-symbols-outlined text-7xl text-primary/30 mb-8 block font-light">lock</span>
                        <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-4">Login Required</h2>
                        <p className="text-slate-500 text-[14px] font-bold uppercase tracking-[0.2em] mb-12 max-w-md mx-auto leading-relaxed">
                            Sign in to your account to access and manage your collection of saved items.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                            <Link href="/login" className="px-10 py-4 bg-primary hover:bg-[#8a0e1d] text-white text-[14px] font-black  tracking-[0.3em] rounded-xl transition-all shadow-xl shadow-primary/20">
                                LogIn
                            </Link>
                            <Link href="/register" className="px-10 py-4 bg-white/5 border border-white/10 text-white text-[14px] font-black  tracking-[0.3em] rounded-xl transition-all">
                                Create Account
                            </Link>
                        </div>
                    </div>
                ) : !hasFavorites ? (
                    <div className="py-40 text-center bg-[#111] rounded-3xl border border-dashed border-white/5">
                        <span className="material-symbols-outlined text-7xl text-slate-800 mb-8 block">favorite</span>
                        <h3 className="text-2xl font-black text-white tracking-tight mb-2">Collection Empty</h3>
                        <p className="text-slate-600 text-sm font-medium mb-12">You haven't saved any games or services to your favorites yet.</p>
                        <Link href="/#games" className="px-10 py-4 bg-primary text-white text-[14px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-[#8a0e1d] transition-all">
                            Browse Services
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-24">
                        {/* Saved Games Section */}
                        {gameFavorites.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="h-8 w-1.5 bg-primary rounded-full" />
                                        <h2 className="text-2xl font-black text-white tracking-tight">Saved Games</h2>
                                    </div>
                                    <span className="text-[14px] font-black text-slate-600 uppercase tracking-widest">{gameFavorites.length} Games</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                                    {gameFavorites.map((fav) => (
                                        <Link
                                            key={fav.id}
                                            href={`/${fav.game.slug}/services`}
                                            className="group relative flex h-[140px] items-end overflow-hidden rounded-2xl border border-white/5 bg-[#151515] transition-all duration-300 hover:border-primary/40 hover:-translate-y-1"
                                        >
                                            <div className="absolute inset-0 z-0">
                                                <img
                                                    src={fav.game.bgImage}
                                                    alt={fav.game.name}
                                                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-500"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                                            </div>

                                            <button
                                                onClick={(e) => removeGameFavorite(e, fav.gameId)}
                                                className="absolute top-4 right-4 z-20 size-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <span className="material-symbols-outlined text-sm">close</span>
                                            </button>

                                            <div className="relative z-10 p-4">
                                                <h3 className="font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight leading-none mb-1">
                                                    {fav.game.name}
                                                </h3>
                                                <div className="text-[14px] text-slate-500 font-bold uppercase tracking-widest">Active Services</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Saved Offers (Services) Section */}
                        {serviceFavorites.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="h-8 w-1.5 bg-primary rounded-full" />
                                        <h2 className="text-2xl font-black text-white tracking-tight">Saved Offers</h2>
                                    </div>
                                    <span className="text-[14px] font-black text-slate-600 uppercase tracking-widest">{serviceFavorites.length} Services</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {serviceFavorites.map((fav) => (
                                        <Link
                                            key={fav.id}
                                            href={`/services/${fav.service.slug}`}
                                            className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/5 bg-[#0A0A0A] hover:border-primary/20 transition-all duration-500"
                                        >
                                            {/* Thumbnail */}
                                            <div className="relative h-48 w-full overflow-hidden border-b border-white/5">
                                                {fav.service.image ? (
                                                    <img
                                                        src={fav.service.image}
                                                        alt={fav.service.name}
                                                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 bg-[#111]" />
                                                )}

                                                <button
                                                    onClick={(e) => removeServiceFavorite(e, fav.serviceId)}
                                                    className="absolute top-4 right-4 z-20 size-10 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <span className="material-symbols-outlined text-lg">close</span>
                                                </button>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <div className="text-[14px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                                                    {fav.service.game.name}
                                                </div>
                                                <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors leading-tight mb-6">
                                                    {fav.service.name}
                                                </h3>

                                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                                    <div className="flex flex-col">
                                                        <span className="text-[14px] font-black text-slate-600 uppercase tracking-[0.3em] mb-1">Starting at</span>
                                                        <div className="text-2xl font-black text-white tracking-tighter">
                                                            {formatPrice(Number(fav.service.displayPrice))}
                                                        </div>
                                                    </div>
                                                    <div className="px-5 py-3 bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary rounded-xl transition-all duration-300">
                                                        <span className="text-[14px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                                            View
                                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
