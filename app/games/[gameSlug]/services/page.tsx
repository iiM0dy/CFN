import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ServiceList } from "@/components/services/service-list"


export default async function GameServicesPage({ params }: { params: Promise<{ gameSlug: string }> }) {
    const { gameSlug } = await params

    // Use a raw query as a fallback if the Prisma client types are out of sync with the DB
    // This avoids the PrismaClientValidationError for the missing 'slug' field
    const games = await prisma.$queryRaw<any[]>`
        SELECT * FROM "GameService" WHERE "slug" = ${gameSlug} LIMIT 1
    `
    const game = games[0]

    if (game) {
        // Fetch services with options using raw query
        const services = await prisma.$queryRaw<any[]>`
            SELECT s.*, 
                   json_agg(
                       json_build_object(
                           'id', so.id,
                           'label', so.label,
                           'type', so.type,
                           'minValue', so."minValue",
                           'maxValue', so."maxValue"
                       )
                   ) FILTER (WHERE so.id IS NOT NULL) as options
            FROM "Service" s
            LEFT JOIN "ServiceOption" so ON so."serviceId" = s.id
            WHERE s."gameId" = ${game.id}
            GROUP BY s.id
        `

        // Calculate display price for each service
        game.services = services.map(service => {
            let displayPrice = Number(service.basePrice);

            // For Coins service, calculate minimum purchasable amount
            if (service.name?.toLowerCase().includes('coin') && service.options && service.options.length > 0) {
                const coinOption = service.options.find((opt: any) => opt.type === 'number');
                if (coinOption && coinOption.minValue) {
                    displayPrice = (Number(service.basePrice) * coinOption.minValue) / 1000;
                }
            }

            return {
                ...service,
                displayPrice: displayPrice.toFixed(2)
            };
        });
    }

    if (!game) {
        notFound()
    }

    return (
        <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col font-sans overflow-x-hidden">
            <main className="grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#555] mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <Link href="/games" className="hover:text-primary transition-colors">Games</Link>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <span className="text-white">{game.name}</span>
                </div>

                {/* Cinematic Hero Section */}
                <section className="relative mb-12 rounded-xl overflow-hidden w-full shadow-[0_0_50px_-10px_rgba(175,18,37,0.3)]">
                    <div className="relative flex min-h-[400px] flex-col items-center justify-center p-8 text-center bg-cover bg-center"
                        style={{ backgroundImage: `linear-gradient(to bottom, rgba(11, 11, 11, 0.7), rgba(11, 11, 11, 0.95)), url('${game.bgImage}')` }}>
                        <div className="z-10 max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest">
                                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                                Elite {game.name} Services
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4 uppercase font-cairo">
                                <span className="text-primary">{game.name}</span> <span className="text-white">COMMAND</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
                                {game.description || `Secure your legacy in ${game.name}. Elite-tier progression and 
                                professional coaching services tailored for future champions.`}
                            </p>
                        </div>
                        {/* Subtle Glows */}
                        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[120px]"></div>
                        <div className="absolute top-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[120px]"></div>
                    </div>
                </section>

                <ServiceList initialServices={game.services} />

                {/* Trust Pillar Row */}
                <section className="mt-12 py-12 border-t border-white/5 w-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center group">
                            <div className="text-3xl font-black text-white group-hover:text-primary transition-colors mb-1 tracking-tighter">50,000+</div>
                            <div className="text-primary text-[10px] font-bold uppercase tracking-widest">Deployments Finished</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-3xl font-black text-white group-hover:text-primary transition-colors mb-1 tracking-tighter">4.9/5</div>
                            <div className="text-primary text-[10px] font-bold uppercase tracking-widest">Asset Rating</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-3xl font-black text-white group-hover:text-primary transition-colors mb-1 tracking-tighter">500+</div>
                            <div className="text-primary text-[10px] font-bold uppercase tracking-widest">Field Experts</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-3xl font-black text-white group-hover:text-primary transition-colors mb-1 tracking-tighter">24/7</div>
                            <div className="text-primary text-[10px] font-bold uppercase tracking-widest">HQ Monitoring</div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
