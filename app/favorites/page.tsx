"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/context/currency-context";
import { Heart, X, ArrowRight, Lock } from "lucide-react";

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

const GRADIENT_PRESETS = [
    "from-[#1a0a2e] to-[#0d0515]",
    "from-[#0a1a2e] to-[#050d15]",
    "from-[#1a0a0a] to-[#0d0505]",
    "from-[#0a1a12] to-[#050d08]",
    "from-[#1a150a] to-[#0d0a05]",
]

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
            const res = await fetch(`/api/favorites?serviceId=${serviceId}`, { method: "DELETE" });
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
            const res = await fetch(`/api/favorites?gameId=${gameId}`, { method: "DELETE" });
            if (res.ok) {
                setGameFavorites(gameFavorites.filter((fav) => fav.gameId !== gameId));
            }
        } catch (error) {
            console.error("Error removing game favorite:", error);
        }
    };

    if (loading) {
        return (
            <div className="bg-[#070707] min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="size-8 rounded-full border-2 border-white/[0.06] border-t-primary animate-spin" />
                    <p className="text-xs text-slate-500">Loading favorites...</p>
                </div>
            </div>
        );
    }

    const hasFavorites = serviceFavorites.length > 0 || gameFavorites.length > 0;

    return (
        <div className="bg-noise min-h-screen flex flex-col overflow-x-hidden" style={{ background: "linear-gradient(180deg, #080808 0%, #060607 50%, #080808 100%)" }}>
            <main className="relative z-10 grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 pb-16 text-white">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <span className="text-slate-700">/</span>
                    <span className="text-slate-300 font-medium">Favorites</span>
                </nav>

                {/* Header */}
                <div className="mb-10">
                    <div className="h-px w-12 bg-primary mb-4" />
                    <h1 className="font-cairo text-3xl md:text-4xl font-bold text-white tracking-tight uppercase mb-2">
                        Your <span className="text-primary">Collection</span>
                    </h1>
                    <p className="text-sm text-slate-400 max-w-lg">
                        Your saved games and services in one place. Pick up where you left off.
                    </p>
                </div>

                {status === "unauthenticated" ? (
                    <div className="py-20 text-center rounded-xl border border-white/[0.06] bg-[#0a0a0a]">
                        <div className="size-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-4">
                            <Lock className="size-5 text-primary/50" />
                        </div>
                        <h2 className="font-cairo text-lg font-bold text-white uppercase tracking-tight mb-1.5">Sign in Required</h2>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                            Log in to access and manage your saved games and services.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link href="/login" className="min-h-[44px] px-6 flex items-center justify-center bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg transition-colors">
                                Log In
                            </Link>
                            <Link href="/login" className="min-h-[44px] px-6 flex items-center justify-center bg-white/[0.04] border border-white/[0.06] text-white text-sm font-medium rounded-lg hover:bg-white/[0.07] transition-colors">
                                Create Account
                            </Link>
                        </div>
                    </div>
                ) : !hasFavorites ? (
                    <div className="py-20 text-center rounded-xl border border-white/[0.06] bg-[#0a0a0a]">
                        <div className="size-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                            <Heart className="size-5 text-slate-600" />
                        </div>
                        <h3 className="font-cairo text-lg font-bold text-white uppercase tracking-tight mb-1.5">No Saved Items</h3>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                            Browse games and services to save your favorites here for quick access.
                        </p>
                        <Link href="/#games" className="inline-flex items-center gap-1.5 min-h-[44px] px-5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg transition-colors">
                            Browse Games
                            <ArrowRight className="size-3.5" />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-14">
                        {/* ── SAVED GAMES ── */}
                        {gameFavorites.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="font-cairo text-base font-bold text-white uppercase tracking-wide flex items-center gap-2.5">
                                        <span className="w-0.5 h-4 bg-primary rounded-full" />
                                        Saved Games
                                    </h2>
                                    <span className="text-[11px] font-medium text-slate-600 uppercase tracking-wider">{gameFavorites.length} game{gameFavorites.length !== 1 ? "s" : ""}</span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                    {gameFavorites.map((fav, i) => {
                                        const hasImage = fav.game.bgImage && (fav.game.bgImage.includes("://") || fav.game.bgImage.startsWith("/"));
                                        const initials = fav.game.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
                                        return (
                                            <Link
                                                key={fav.id}
                                                href={`/${fav.game.slug}/services`}
                                                className="card-lift group relative flex aspect-[3/2] items-end overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0a0a] transition-all duration-300 hover:border-primary/35 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                            >
                                                <div className="absolute inset-0">
                                                    {hasImage ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={fav.game.bgImage}
                                                            alt=""
                                                            aria-hidden="true"
                                                            className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                                                        />
                                                    ) : (
                                                        <div className={`w-full h-full bg-gradient-to-br ${GRADIENT_PRESETS[i % GRADIENT_PRESETS.length]} flex items-center justify-center`}>
                                                            <span className="font-cairo text-4xl font-bold text-white/[0.06] group-hover:text-white/[0.09] transition-colors duration-500">{initials}</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                                                </div>

                                                <button
                                                    onClick={(e) => removeGameFavorite(e, fav.gameId)}
                                                    className="absolute top-2 right-2 z-20 size-7 rounded-md bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                                                    aria-label={`Remove ${fav.game.name} from favorites`}
                                                >
                                                    <X className="size-3" />
                                                </button>

                                                <div className="relative z-10 p-3 w-full">
                                                    <h3 className="font-cairo text-sm font-bold text-white uppercase tracking-tight leading-tight mb-0.5 group-hover:text-primary transition-colors">
                                                        {fav.game.name}
                                                    </h3>
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary transition-all duration-300 sm:opacity-0 sm:translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:group-focus-visible:opacity-100 sm:group-focus-visible:translate-y-0">
                                                        View Services <ArrowRight className="size-3" />
                                                    </span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* ── SAVED SERVICES ── */}
                        {serviceFavorites.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="font-cairo text-base font-bold text-white uppercase tracking-wide flex items-center gap-2.5">
                                        <span className="w-0.5 h-4 bg-primary rounded-full" />
                                        Saved Services
                                    </h2>
                                    <span className="text-[11px] font-medium text-slate-600 uppercase tracking-wider">{serviceFavorites.length} service{serviceFavorites.length !== 1 ? "s" : ""}</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {serviceFavorites.map((fav, i) => {
                                        const hasImage = fav.service.image && (fav.service.image.includes("://") || fav.service.image.startsWith("/"));
                                        const initials = fav.service.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
                                        const hasPrice = fav.service.displayPrice && !isNaN(Number(fav.service.displayPrice));

                                        return (
                                            <Link
                                                key={fav.id}
                                                href={`/services/${fav.service.slug}`}
                                                className="card-lift group flex flex-col overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/[0.06] hover:border-primary/35 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                            >
                                                {/* Thumbnail */}
                                                <div className="relative h-[144px] w-full overflow-hidden bg-[#0e0e0e]">
                                                    {hasImage ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={fav.service.image!}
                                                            alt=""
                                                            aria-hidden="true"
                                                            className="absolute inset-0 w-full h-full object-cover object-center opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                                                        />
                                                    ) : (
                                                        <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_PRESETS[i % GRADIENT_PRESETS.length]} flex items-center justify-center`}>
                                                            <span className="font-cairo text-4xl font-bold text-white/[0.05] select-none">{initials}</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />

                                                    <button
                                                        onClick={(e) => removeServiceFavorite(e, fav.serviceId)}
                                                        className="absolute top-2.5 right-2.5 z-20 size-8 rounded-md bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                                                        aria-label={`Remove ${fav.service.name} from favorites`}
                                                    >
                                                        <X className="size-3.5" />
                                                    </button>
                                                </div>

                                                {/* Content */}
                                                <div className="p-4 flex flex-col flex-1">
                                                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1">
                                                        {fav.service.game.name}
                                                    </span>
                                                    <h3 className="font-cairo text-[14px] font-bold text-white uppercase tracking-tight leading-snug line-clamp-2 min-h-[36px] mb-3 group-hover:text-primary transition-colors" title={fav.service.name}>
                                                        {fav.service.name}
                                                    </h3>

                                                    <div className="mt-auto pt-3 border-t border-white/[0.06]">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <span className="text-[10px] text-slate-600 uppercase tracking-wider font-medium">From</span>
                                                                <div className="text-lg font-bold text-white tracking-tight">
                                                                    {hasPrice ? formatPrice(Number(fav.service.displayPrice)) : "--.--"}
                                                                </div>
                                                            </div>
                                                            <div className="min-h-[36px] px-3.5 flex items-center rounded-lg bg-white/[0.05] group-hover:bg-primary group-focus-visible:bg-primary border border-white/[0.06] group-hover:border-primary group-focus-visible:border-primary text-xs font-semibold text-slate-300 group-hover:text-white group-focus-visible:text-white transition-all duration-300 gap-1">
                                                                View
                                                                <ArrowRight className="size-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
