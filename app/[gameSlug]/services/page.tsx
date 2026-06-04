import { api } from "@/lib/api"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ServiceList } from "@/components/services/service-list"
import { Footer } from "@/components/layout/footer"
import { GameFavoriteButton } from "@/components/services/game-favorite-button"


export default async function GameServicesPage({ params }: { params: Promise<{ gameSlug: string }> }) {
    const { gameSlug } = await params

    // Fetch game with services from the Laravel API
    const gameData = await api(`/games/${gameSlug}/services`).catch(() => null);

    const game = gameData?.data ?? gameData;

    if (!game) {
        notFound()
    }

    // The API returns services with options, displayPrice already computed server-side.
    // If services come nested under game.services, use them directly.
    // Otherwise, if the API returns a flat services array, attach them.
    if (!game.services) {
        game.services = [];
    }

    return (
        <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col font-cairo overflow-x-hidden">
            <main className="grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-9 pb-12">
                {/* Tactical Breadcrumbs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-2 text-[14px] font-black uppercase tracking-[0.2em] text-slate-500">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-white">{game.name}</span>
                    </div>

                    <GameFavoriteButton gameId={game.id} />
                </div>

                <ServiceList initialServices={game.services} />

                {/* Performance Analytics Row */}
                <section className="mt-20 py-16 border-t border-white/5 w-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { label: 'Deployments Finished', value: '50,000+' },
                            { label: 'Asset Rating', value: '4.9/5' },
                            { label: 'Field Experts', value: '500+' },
                            { label: 'HQ Monitoring', value: '24/7' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center group relative">
                                <div className="text-4xl md:text-5xl font-black text-white group-hover:text-primary transition-all duration-500 mb-2 tracking-tighter italic">
                                    {stat.value}
                                </div>
                                <div className="text-slate-500 text-[14px] font-black uppercase tracking-[0.2em] group-hover:text-primary/50 transition-colors">
                                    {stat.label}
                                </div>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary/0 group-hover:bg-primary/50 transition-all duration-500"></div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

