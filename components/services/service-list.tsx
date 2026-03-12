"use client"

import { useState } from "react"
import Link from "next/link"
import { useCurrency } from "@/context/currency-context"
import { motion } from "framer-motion"

type Service = {
    id: string
    name: string
    image?: string
    basePrice: any
    displayPrice?: string
}

interface ServiceListProps {
    initialServices: Service[]
}

export function ServiceList({ initialServices }: ServiceListProps) {
    const { formatPrice } = useCurrency()
    const [searchQuery, setSearchQuery] = useState("")

    const filteredServices = initialServices.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="font-cairo">
            {/* Search Bar & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 px-2">
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
                        <span className="h-12 w-2 bg-primary rounded-full shadow-[0_0_20px_rgba(175,18,37,0.5)]"></span>
                        Available <span className="text-primary">Services</span>
                    </h2>
                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">Selection ready for initiation</p>
                </div>

                <div className="relative group min-w-[320px]">
                    <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-lg group-focus-within:text-primary transition-all duration-300">search</span>
                    <input
                        className="bg-[#111111] border border-white/5 text-white pl-14 pr-6 py-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary/50 placeholder-slate-700 outline-none w-full transition-all text-sm font-bold uppercase tracking-widest shadow-2xl"
                        placeholder="SEARCH PARAMETERS..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute inset-x-0 -bottom-1 h-px bg-linear-to-r from-transparent via-primary/0 to-transparent group-focus-within:via-primary/50 transition-all duration-500"></div>
                </div>
            </div>

            {/* Tactical Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-32 px-4">
                {filteredServices.map((service) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="group"
                    >
                        <Link href={`/services/${service.id}`} className="block">
                            <div className="relative bg-[#0A0A0A] border border-white/[0.03] rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_20px_60px_-15px_rgba(175,18,37,0.2)]">

                                {/* 1. Heavy Visual Header */}
                                <div className="relative h-52 w-full">
                                    {service.image ? (
                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[#111111]" />
                                    )}

                                    {/* HUD Elements */}
                                    <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-transparent to-black/20" />

                                    {/* Tactical Brackets Corner */}
                                    <div className="absolute top-6 left-6 flex flex-col gap-1 items-start opacity-40 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.2em]">{service.id?.substring(0, 8)}</span>
                                        <div className="flex gap-1">
                                            <div className="size-1 bg-primary rounded-full animate-pulse" />
                                            <div className="size-1 bg-white/20 rounded-full" />
                                            <div className="size-1 bg-white/20 rounded-full" />
                                        </div>
                                    </div>

                                    {/* Solid Discount Tag */}
                                </div>

                                {/* 2. Intelligence Body */}
                                <div className="p-8 pb-10">
                                    <div className="flex flex-col gap-4 mb-8">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-primary transition-colors leading-none">
                                            {service.name}
                                        </h3>
                                        <div className="h-px w-10 bg-white/10 group-hover:w-full group-hover:bg-primary/30 transition-all duration-500" />
                                    </div>

                                    {/* Data Points with Red Indicators */}
                                    <div className="space-y-4 mb-10">
                                        {[
                                            "Priority Launch Enabled",
                                            "Secure Auth Pipeline",
                                            "Elite Operator Assigned"
                                        ].map((text, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="size-1.5 bg-primary rotate-45" />
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] group-hover:text-slate-300 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                                                    {text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Row - Clean & Heavy */}
                                    <div className="flex items-center justify-between gap-4 pt-8 border-t border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] mb-1">Contract</span>
                                            <span className="text-3xl font-black text-white tracking-tighter">
                                                {formatPrice(service.displayPrice ? Number(service.displayPrice) : Number(service.basePrice))}
                                            </span>
                                        </div>

                                        <div className="px-6 py-4 bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary rounded-xl transition-all duration-500">
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                                BUY
                                                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Scanline */}
                                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute top-0 left-0 w-full h-px bg-primary/20 animate-scanline" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}

                {/* Tactical Add Request */}
                <Link href="/contact" className="group">
                    <div className="h-full bg-black/40 border-2 border-dashed border-white/5 rounded-3xl p-10 flex flex-col justify-center items-center text-center transition-all duration-500 hover:border-primary/40 hover:bg-black/80">
                        <div className="size-20 border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:border-primary/50 group-hover:rotate-[22.5deg] transition-all">
                            <span className="material-symbols-outlined text-slate-700 group-hover:text-primary text-4xl transition-colors">add</span>
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 italic">Custom <span className="text-primary NOT-italic">Request</span></h3>
                        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mb-10 max-w-[200px]">Don't see what you need? Tell us what you're looking for and we'll make it happen.</p>
                        <div className="w-full py-4 border border-white/10 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover:bg-white/5 group-hover:text-white transition-all">Get in Touch</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
