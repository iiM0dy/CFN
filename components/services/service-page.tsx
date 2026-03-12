"use client"

import { useCart } from "@/lib/store"
import { toast } from "sonner"
import Link from "next/link"

type ServiceItem = {
    id: string
    name: string
    description: string
    price: number
    priceLabel: string
    features: string[]
}

type StatItem = {
    label: string
    value: string
}

type ServicePageProps = {
    game: string
    tagline: string
    description: string
    stats: StatItem[]
    services: ServiceItem[]
}

export function ServicePage({ game, tagline, description, stats, services }: ServicePageProps) {
    const { addItem } = useCart()

    const handleAdd = (service: ServiceItem) => {
        addItem({
            id: service.id,
            name: `${game} ${service.name}`,
            price: service.price,
            quantity: 1,
        })
        toast.success(`${service.name} added to cart`)
    }

    return (
        <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col font-cairo overflow-x-hidden">
            <main className="grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-9 pb-12">
                {/* Tactical Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-9">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <span className="text-white">{game}</span>
                </div>

                {/* Cinematic Hero */}
                <section className="relative overflow-hidden rounded-2xl bg-[#111111] border border-white/5 p-10 md:p-16 mb-20">
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-linear-to-l from-primary/5 to-transparent transition-all duration-700" />
                    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest italic">
                            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                            Verified Specialist Network Active
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 uppercase leading-tight">
                            {tagline.split(' ').map((word, i) => (
                                <span key={i} className={i === tagline.split(' ').length - 1 ? "text-primary italic" : ""}>{word} </span>
                            ))}
                        </h1>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed italic mb-12">
                            {description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat) => (
                                <div key={stat.label} className="flex flex-col">
                                    <span className="text-3xl font-black text-white tracking-tighter font-cairo">{stat.value}</span>
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Available Operations */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <span className="h-px bg-white/5 grow"></span>
                        <h2 className="text-2xl font-black text-white uppercase tracking-widest italic px-4">Available Services</h2>
                        <span className="h-px bg-white/5 grow"></span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="group relative p-8 rounded-2xl border border-white/5 bg-[#111111] hover:border-primary/30 transition-all duration-500 shadow-xl overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full group-hover:bg-primary/10 transition-colors pointer-events-none"></div>

                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{service.name}</h3>
                                        <div className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[10px] text-primary">verified</span>
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Guaranteed Success</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-2xl font-black text-white tracking-tighter font-cairo">{service.priceLabel}</span>
                                    </div>
                                </div>

                                <p className="text-slate-400 text-sm font-medium leading-relaxed italic mb-8 h-12 overflow-hidden line-clamp-2">{service.description}</p>

                                <div className="flex flex-wrap gap-2 mb-10">
                                    {service.features.map((f) => (
                                        <span key={f} className="px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg bg-[#161616] border border-white/5 text-slate-500 group-hover:text-slate-300 transition-colors flex items-center gap-1.5">
                                            <span className="size-1 rounded-full bg-primary/50"></span>
                                            {f}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    className="w-full py-4 bg-[#161616] border border-white/5 hover:bg-primary hover:border-primary text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 transition-all relative z-10 group"
                                    onClick={() => handleAdd(service)}
                                >
                                    INITIATE PROCUREMENT
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Trust Pillar */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: 'shield_locked', label: 'E-VPN ENCRYPTED' },
                        { icon: 'verified_user', label: '100% ACCOUNT SAFETY' },
                        { icon: 'support_agent', label: 'OPERATIONAL HQ 24/7' },
                        { icon: 'payments', label: 'SECURE TRANSFERS' }
                    ].map((item) => (
                        <div key={item.label} className="bg-[#111111] border border-white/5 rounded-xl p-6 flex flex-col items-center text-center gap-3 shadow-lg">
                            <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
