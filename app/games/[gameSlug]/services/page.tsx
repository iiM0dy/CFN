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
        // Fetch services with options and values using raw query
        const services = await prisma.$queryRaw<any[]>`
            SELECT s.*, 
                   (
                       SELECT json_agg(
                           json_build_object(
                               'id', so.id,
                               'label', so.label,
                               'type', so.type,
                               'required', so.required,
                               'minValue', so."minValue",
                               'maxValue', so."maxValue",
                               'values', (
                                   SELECT json_agg(
                                       json_build_object(
                                           'id', sov.id,
                                           'label', sov.label,
                                           'value', sov.value,
                                           'priceModifier', sov."priceModifier"
                                       )
                                   ) FROM "ServiceOptionValue" sov WHERE sov."optionId" = so.id
                               )
                           )
                       ) FROM "ServiceOption" so WHERE so."serviceId" = s.id
                   ) as options
            FROM "Service" s
            WHERE s."gameId" = ${game.id}
        `

        // Calculate display price for each service and ensure serializability
        game.services = services.map(service => {
            let basePrice = Number(service.basePrice);
            let minAdditionalPrice = 0;

            if (service.options && service.options.length > 0) {
                service.options.forEach((opt: any) => {
                    // For number/range options (like coins), find price for minimum amount
                    if (opt.type === 'number' || opt.type === 'range') {
                        if (opt.minValue && opt.minValue > 0) {
                            // If it's a "per 1000" style price (common in coins)
                            if (service.name?.toLowerCase().includes('coin')) {
                                basePrice = (basePrice * opt.minValue) / 1000;
                            } else {
                                // Simple multiplication for other types
                                basePrice = basePrice * opt.minValue;
                            }
                        }
                    }
                    // For selection options, if REQUIRED, add the cheapest variant price
                    else if (opt.required && opt.values && opt.values.length > 0) {
                        const prices = opt.values.map((v: any) => Number(v.priceModifier || 0));
                        minAdditionalPrice += Math.min(...prices);
                    }
                });
            }

            const finalDisplayPrice = basePrice + minAdditionalPrice;

            return {
                ...service,
                basePrice: Number(service.basePrice),
                createdAt: service.createdAt?.toString() || null,
                updatedAt: service.updatedAt?.toString() || null,
                options: service.options || [],
                displayPrice: finalDisplayPrice.toFixed(2)
            };
        });
    }

    if (!game) {
        notFound()
    }

    return (
        <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col font-cairo overflow-x-hidden">
            <main className="grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-9 pb-12">
                {/* Tactical Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-9">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <Link href="/games" className="hover:text-primary transition-colors">Games</Link>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <span className="text-white">{game.name}</span>
                </div>

                {/* Cinematic Hero Section */}
                <section className="relative mb-12 rounded-2xl overflow-hidden w-full border border-white/5">
                    <div className="relative flex min-h-[500px] flex-col items-center justify-center p-12 text-center bg-cover bg-center group"
                        style={{ backgroundImage: `linear-gradient(to bottom, rgba(11, 11, 11, 0.6), rgba(11, 11, 11, 0.98)), url('${game.bgImage}')` }}>

                        <div className="z-10 max-w-4xl relative">
                            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-8 uppercase leading-[0.8] font-cairo">
                                <span className="block opacity-50 text-4xl md:text-5xl mb-2">{game.name}</span>
                                <span className="text-primary italic">SERVICES</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed italic opacity-80">
                                {game.description || `Secure your legacy in ${game.name}. Elite-tier progression and 
                                professional coaching services tailored for future champions.`}
                            </p>
                        </div>

                        {/* Subtle Glows - Balanced */}
                        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]"></div>
                        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]"></div>
                    </div>
                </section>

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
                                <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-primary/50 transition-colors">
                                    {stat.label}
                                </div>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary/0 group-hover:bg-primary/50 transition-all duration-500"></div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

