"use client"

import { useState } from "react"
import Link from "next/link"

type Service = {
    id: string
    name: string
    image?: string
    basePrice: any
    displayPrice: string
}

interface ServiceListProps {
    initialServices: Service[]
}

export function ServiceList({ initialServices }: ServiceListProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredServices = initialServices.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <>
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
                    <span className="h-8 w-1 bg-primary rounded-full"></span>
                    Available Services
                </h2>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm group-focus-within:text-primary transition-colors">search</span>
                        <input
                            className="bg-[#161616] border border-white/5 text-white pl-11 pr-4 py-3 rounded-lg focus:ring-1 focus:ring-primary/50 focus:border-primary/50 placeholder-slate-600 outline-none w-full md:w-72 transition-all text-sm font-medium"
                            placeholder="Search..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
                {filteredServices.map((service) => (
                    <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="group relative aspect-3/4 rounded-xl overflow-hidden border border-white/5 bg-[#161616] transition-all duration-300 hover:shadow-[0_0_20px_rgba(175,18,37,0.4)] hover:-translate-y-2 hover:border-primary"
                    >
                        {/* Service Content Wrapper */}
                        <div className="absolute inset-0 z-0">
                            {service.image ? (
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-[#161616] to-[#0B0B0B]" />
                            )}
                            <div className="absolute inset-0 bg-linear-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent" />
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* HOT Badge */}
                        <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/40 italic">
                            POPULAR
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors uppercase tracking-tight">
                                {service.name}
                            </h3>

                            <div className="flex flex-col gap-1 mb-6">
                                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[12px] text-primary">verified_user</span>
                                    VPN Protected
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[12px] text-primary">speed</span>
                                    Instant fulfillment
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-primary/30 transition-colors">
                                <div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">EST. QUOTE</div>
                                    <div className="text-2xl font-black text-white tracking-tighter">
                                        ${service.displayPrice || Number(service.basePrice).toFixed(2)}
                                    </div>
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <span className="material-symbols-outlined text-sm">north_east</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {/* No results message */}
                {filteredServices.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <span className="material-symbols-outlined text-5xl text-slate-700 mb-4 block">search_off</span>
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">No matching services</h3>
                        <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest">Try adjusting your tactical search query</p>
                    </div>
                )}

                {/* Request Custom Order */}
                <Link href="/contact">
                    <div className="group relative aspect-3/4 rounded-xl overflow-hidden border border-dashed border-white/10 bg-[#0B0B0B]/50 flex flex-col items-center justify-center text-center p-8 transition-all duration-300 hover:border-primary/50 hover:bg-[#0B0B0B] cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500">
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary text-3xl transition-colors">add_moderator</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Custom Order</h3>
                        <p className="text-slate-500 text-xs leading-relaxed mb-6 max-w-[200px] uppercase tracking-wider">Contact us for unique order or service</p>
                        <span className="text-[10px] font-bold text-primary tracking-widest border-b border-primary/0 group-hover:border-primary transition-all uppercase">Contact Us</span>
                    </div>
                </Link>
            </div>
        </>
    )
}
