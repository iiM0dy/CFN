import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Search, Filter, CheckCircle2, ArrowRight, Shield, Clock, CheckCircle, ThumbsUp, ChevronRight } from "lucide-react"

export default async function GameServicesPage({ params }: { params: { gameSlug: string } }) {
    const { gameSlug } = await params

    // Use a raw query as a fallback if the Prisma client types are out of sync with the DB
    // This avoids the PrismaClientValidationError for the missing 'slug' field
    const games = await prisma.$queryRaw<any[]>`
        SELECT * FROM "GameService" WHERE "slug" = ${gameSlug} LIMIT 1
    `
    const game = games[0]

    if (game) {
        // Fetch services using raw query as fallback if the Prisma client is out of sync
        game.services = await prisma.$queryRaw<any[]>`
            SELECT * FROM "Service" WHERE "gameId" = ${game.id}
        `
    }

    if (!game) {
        notFound()
    }

    return (
        <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col font-[family-name:var(--font-space-grotesk)] overflow-x-hidden">
            <main className="flex-grow w-full px-4 py-8 md:px-10 lg:px-20 max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-[family-name:var(--font-noto-sans)]">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="size-3" />
                    <Link href="/games" className="hover:text-primary transition-colors">Games</Link>
                    <ChevronRight className="size-3" />
                    <span className="text-gray-300">{game.name}</span>
                </div>

                {/* Hero Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
                            {game.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-500">Services</span>
                        </h1>
                        <p className="text-gray-400 font-[family-name:var(--font-noto-sans)] max-w-2xl text-lg font-light leading-relaxed">
                            {game.description || `Dominate ${game.name} with our premium boosting services. Our elite players are ready to assist you in reaching your goals.`}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                            <input 
                                className="bg-[#141414] border border-[#1c1c1c] text-white pl-10 pr-4 py-2.5 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary placeholder-gray-600 outline-none w-full md:w-64 transition-all" 
                                placeholder="Search services..." 
                                type="text"
                            />
                        </div>
                        <button className="bg-[#141414] border border-[#1c1c1c] text-white p-2.5 rounded-lg hover:bg-[#1c1c1c] hover:border-primary/50 transition-all">
                            <Filter className="size-5" />
                        </button>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                    {game.services.map((service: any) => (
                        <Link 
                            key={service.id} 
                            href={`/services/${service.id}`}
                            className="group relative bg-[#141414] border border-[#1c1c1c] rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(175,18,37,0.3)] flex flex-col"
                        >
                            <div className="h-48 relative overflow-hidden bg-[#0F0F0F]">
                                {service.image ? (
                                    <Image
                                        src={service.image}
                                        alt={service.name}
                                        fill
                                        className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-60 group-hover:scale-105 transition-transform duration-700" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/90 to-[#141414]/40"></div>
                                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded shadow-lg shadow-primary/20">
                                    NEW
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow -mt-12 relative z-10">
                                <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-3 group-hover:text-primary transition-colors">{service.name}</h3>
                                <ul className="text-gray-400 text-sm font-[family-name:var(--font-noto-sans)] space-y-2 mb-6 flex-grow">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                                        <span>Instant Start Guaranteed</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                                        <span>VPN Protected Sessions</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                                        <span>Professional & Elite Boosters</span>
                                    </li>
                                </ul>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1c1c1c]">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Starting at</span>
                                        <span className="text-xl font-black text-white italic tracking-tighter">${Number(service.basePrice).toFixed(2)}</span>
                                    </div>
                                    <div className="bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
                                        Order Now
                                        <ArrowRight className="size-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Features Section */}
                <div className="mt-20 pt-10 border-t border-[#1c1c1c]">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center gap-3 group">
                            <div className="size-16 rounded-full bg-[#141414] border border-[#1c1c1c] flex items-center justify-center text-gray-600 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                                <Shield className="size-8" />
                            </div>
                            <h4 className="text-white font-bold uppercase text-sm tracking-wider">100% Secure</h4>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-relaxed">Encrypted payments and data protection.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3 group">
                            <div className="size-16 rounded-full bg-[#141414] border border-[#1c1c1c] flex items-center justify-center text-gray-600 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                                <Clock className="size-8" />
                            </div>
                            <h4 className="text-white font-bold uppercase text-sm tracking-wider">24/7 Support</h4>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-relaxed">Live chat support available anytime.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3 group">
                            <div className="size-16 rounded-full bg-[#141414] border border-[#1c1c1c] flex items-center justify-center text-gray-600 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                                <CheckCircle className="size-8" />
                            </div>
                            <h4 className="text-white font-bold uppercase text-sm tracking-wider">Verified Pros</h4>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-relaxed">Top 1% players handling your account.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3 group">
                            <div className="size-16 rounded-full bg-[#141414] border border-[#1c1c1c] flex items-center justify-center text-gray-600 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                                <ThumbsUp className="size-8" />
                            </div>
                            <h4 className="text-white font-bold uppercase text-sm tracking-wider">Money Back</h4>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-relaxed">Satisfaction guaranteed on all orders.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
