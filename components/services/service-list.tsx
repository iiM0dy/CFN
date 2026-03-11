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
        <div className="font-cairo">
            {/* Search Bar & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 px-2">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
                        <span className="h-10 w-1.5 bg-primary rounded-full"></span>
                        Available <span className="text-primary italic">Services</span>
                    </h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-5 italic">Selection ready for initiation</p>
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

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-32 px-2">
                {filteredServices.map((service) => (
                    <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="group relative aspect-3/4 rounded-2xl overflow-hidden border border-white/5 bg-[#111111] transition-all duration-500 hover:shadow-[0_0_40px_rgba(175,18,37,0.3)] hover:-translate-y-3 hover:border-primary/40"
                    >
                        {/* Service Content Wrapper */}
                        <div className="absolute inset-0 z-0">
                            {service.image ? (
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 opacity-60 group-hover:opacity-100"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-linear-to-br from-primary/30 via-[#111111] to-[#0B0B0B]" />
                            )}
                            <div className="absolute inset-0 bg-linear-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent" />
                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-5 right-5 z-20 px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[9px] font-black uppercase tracking-[0.2em] rounded-lg shadow-xl italic transition-all duration-300">
                            ACTIVE
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-8 z-10 transition-transform duration-500 group-hover:-translate-y-2">
                            <h3 className="text-2xl font-black text-white mb-3 group-hover:text-primary transition-colors uppercase tracking-tighter leading-tight italic">
                                {service.name}
                            </h3>

                            <div className="flex flex-col gap-2 mb-8 border-l-2 border-primary/20 pl-4">
                                <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-[0.15em]">
                                    <span className="material-symbols-outlined text-[14px] text-primary">verified_user</span>
                                    VPN P-ACTIVE
                                </div>
                                <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-[0.15em]">
                                    <span className="material-symbols-outlined text-[14px] text-primary">bolt</span>
                                    INSTANT INIT
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-white/5 group-hover:border-primary/20 transition-colors">
                                <div>
                                    <div className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1 italic">T-ALLOCATION</div>
                                    <div className="text-3xl font-black text-white tracking-tighter font-cairo">
                                        <span className="text-primary/50 text-xl font-medium mr-0.5">$</span>
                                        {service.displayPrice || Number(service.basePrice).toFixed(2)}
                                    </div>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:rotate-45 transition-all duration-500">
                                    <span className="material-symbols-outlined text-lg">north_east</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative scanline */}
                        <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-white/5 to-transparent h-1 opacity-0 group-hover:animate-scanline"></div>
                    </Link>
                ))}

                {/* No results message */}
                {filteredServices.length === 0 && (
                    <div className="col-span-full py-40 text-center bg-[#111111]/50 rounded-3xl border border-dashed border-white/5">
                        <span className="material-symbols-outlined text-6xl text-slate-800 mb-6 block animate-pulse">radar</span>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">No Signals Detected</h3>
                        <p className="text-slate-600 text-xs mt-2 uppercase tracking-[0.5em] font-black italic">Adjust tactical search frequency</p>
                    </div>
                )}

                {/* Request Custom Order */}
                <Link href="/contact">
                    <div className="group relative aspect-3/4 rounded-2xl overflow-hidden border border-dashed border-white/10 bg-[#0B0B0B]/30 flex flex-col items-center justify-center text-center p-10 transition-all duration-500 hover:border-primary/40 hover:bg-[#0B0B0B] cursor-pointer hover:shadow-2xl">
                        <div className="w-20 h-20 rounded-2xl bg-[#111111] border border-white/10 flex items-center justify-center mb-8 shadow-xl group-hover:border-primary/50 group-hover:bg-primary/5 group-hover:rotate-12 transition-all duration-700">
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-primary text-4xl transition-colors">add_moderator</span>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter italic">Custom <span className="text-primary italic">Request</span></h3>
                        <p className="text-slate-600 text-[10px] font-black leading-relaxed mb-8 max-w-[220px] uppercase tracking-[0.2em] italic">Contact HQ for bespoke tactical solutions and complex missions</p>
                        <span className="px-6 py-2.5 bg-[#161616] border border-white/5 rounded-lg text-[9px] font-black text-slate-300 tracking-[0.3em] group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all uppercase italic">ESTABLISH LINK</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
