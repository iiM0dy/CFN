"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface GameFavoriteButtonProps {
    gameId: string;
}

export function GameFavoriteButton({ gameId }: GameFavoriteButtonProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user && gameId) {
            checkFavorite();
        } else {
            setLoading(false);
        }
    }, [session, gameId]);

    const checkFavorite = async () => {
        try {
            const res = await fetch("/api/favorites");
            if (res.ok) {
                const data = await res.json();
                setIsFavorite(data.games?.some((fav: any) => fav.gameId === gameId));
            }
        } catch (error) {
            console.error("Error checking game favorite:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!session?.user) {
            router.push("/login?callbackUrl=" + encodeURIComponent(window.location.href));
            return;
        }

        setLoading(true);
        try {
            if (isFavorite) {
                const res = await fetch(`/api/favorites?gameId=${gameId}`, {
                    method: "DELETE",
                });
                if (res.ok) setIsFavorite(false);
            } else {
                const res = await fetch("/api/favorites", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ gameId }),
                });
                if (res.ok) setIsFavorite(true);
            }
        } catch (error) {
            console.error("Error toggling game favorite:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
       <div className="h-10 w-28 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
    );

    return (
        <button
            onClick={toggleFavorite}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                isFavorite
                    ? "border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(175,18,37,0.2)]"
                    : "border-white/5 bg-white/5 text-slate-500 hover:border-primary/50 hover:text-white"
            }`}
        >
            <span className={`material-symbols-outlined text-lg ${isFavorite ? "fill-1" : ""}`}>
                favorite
            </span>
            <span className="text-[14px] font-black uppercase tracking-widest">
                {isFavorite ? "Saved" : "Add to Favorites"}
            </span>
        </button>
    );
}
