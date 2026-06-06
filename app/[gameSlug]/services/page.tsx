import { api } from "@/lib/api"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ServiceList } from "@/components/services/service-list"
import { Footer } from "@/components/layout/footer"
import { GameFavoriteButton } from "@/components/services/game-favorite-button"
import { Shield, Headphones, Truck, UserCheck } from "lucide-react"

export default async function GameServicesPage({ params }: { params: Promise<{ gameSlug: string }> }) {
    const { gameSlug } = await params

    const gameData = await api(`/games/${gameSlug}/services`).catch(() => null);
    const game = gameData?.data ?? gameData;

    if (!game) {
        notFound()
    }

    if (!game.services) {
        game.services = [];
    }

    const hasBg = game.bgImage && (game.bgImage.includes("://") || game.bgImage.startsWith("/"))

    return (
        <div className="bg-[#080808] text-white min-h-screen flex flex-col overflow-x-hidden">
            {/* Game banner with artwork */}
            <div className="relative h-32 sm:h-40 overflow-hidden">
                {hasBg ? (
                    <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={game.bgImage} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/30 via-[#080808]/60 to-[#080808]" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-[#080808]" />
                )}
                <div className="absolute inset-0 flex items-end">
                    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                            <div>
                                <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                    <span className="text-slate-700">/</span>
                                    <span className="text-white font-medium">{game.name}</span>
                                </nav>
                                <h1 className="font-cairo text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                                    {game.name} <span className="text-primary">Services</span>
                                </h1>
                            </div>
                            <GameFavoriteButton gameId={game.id} />
                        </div>
                    </div>
                </div>
            </div>

            <main className="grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-6 pb-12">
                <ServiceList initialServices={game.services} />

                {/* Trust bar */}
                <section className="mt-16 pt-8 border-t border-white/[0.06]">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { icon: Shield, label: "Secure Checkout" },
                            { icon: Headphones, label: "24/7 Support" },
                            { icon: Truck, label: "Order Tracking" },
                            { icon: UserCheck, label: "Verified Boosters" },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-center gap-2.5 py-4 px-3 rounded-xl bg-[#0c0c0c] border border-white/[0.06] group hover:border-primary/20 transition-colors">
                                <item.icon className="size-4 text-primary/60 group-hover:text-primary transition-colors" />
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
