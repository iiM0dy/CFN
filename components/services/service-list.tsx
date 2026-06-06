"use client"

import { useState } from "react"
import Link from "next/link"
import { useCurrency } from "@/context/currency-context"
import { Search, Package, MessageSquare, ArrowRight } from "lucide-react"

type Service = {
    id: string
    name: string
    description?: string
    image?: string
    basePrice: any
    displayPrice?: string
    platforms?: string[]
    completionMethods?: string[]
}

interface ServiceListProps {
    initialServices: Service[]
}

const GRADIENT_PRESETS = [
    "from-[#1a0a2e] to-[#0d0515]",
    "from-[#0a1a2e] to-[#050d15]",
    "from-[#1a0a0a] to-[#0d0505]",
    "from-[#0a1a12] to-[#050d08]",
    "from-[#1a150a] to-[#0d0a05]",
    "from-[#0a0f1a] to-[#05080d]",
]

function getInitials(name: string) {
    return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

export function ServiceList({ initialServices }: ServiceListProps) {
    const { formatPrice } = useCurrency()
    const [searchQuery, setSearchQuery] = useState("")

    const filteredServices = initialServices.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="h-px w-10 bg-primary mb-3" />
                    <h2 className="font-cairo text-2xl md:text-[28px] font-bold text-white tracking-tight uppercase">
                        Available <span className="text-primary">Services</span>
                    </h2>
                    <p className="text-sm text-slate-400 mt-1.5">
                        Choose a service for this game and customize your order.
                    </p>
                </div>

                <div className="relative w-full sm:w-64 shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-600" />
                    <input
                        className="w-full bg-[#0e0e0e] border border-white/[0.06] text-white pl-9 pr-3 py-2.5 rounded-lg text-xs placeholder:text-slate-600 focus:border-primary/30 outline-none transition-all"
                        placeholder="Search services..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredServices.map((service, i) => {
                        const hasImage = service.image && (service.image.includes("://") || service.image.startsWith("/"))
                        const price = service.displayPrice ? Number(service.displayPrice) : Number(service.basePrice)
                        const hasPrice = !isNaN(price) && price > 0
                        const initials = getInitials(service.name)
                        const slug = service.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")

                        const tags: string[] = []
                        if (service.platforms?.length) tags.push(...service.platforms.slice(0, 2))
                        if (service.completionMethods?.includes("self-play")) tags.push("Self-Play")
                        if (service.completionMethods?.includes("duo")) tags.push("Duo Queue")

                        return (
                            <Link
                                key={service.id}
                                href={`/services/${encodeURIComponent(slug)}`}
                                className="group flex flex-col overflow-hidden rounded-xl bg-[#0c0c0c] border border-white/[0.06] hover:border-primary/40 focus-visible:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                {/* Thumbnail */}
                                <div className="relative h-[130px] sm:h-[140px] w-full overflow-hidden bg-[#111]">
                                    {hasImage ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={service.image!}
                                            alt=""
                                            aria-hidden="true"
                                            className="absolute inset-0 w-full h-full object-cover object-center opacity-60 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                                        />
                                    ) : (
                                        <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_PRESETS[i % GRADIENT_PRESETS.length]} flex items-center justify-center`}>
                                            <span className="text-3xl font-black text-white/[0.06] select-none">
                                                {initials}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/20 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-cairo text-[14px] font-bold text-white uppercase tracking-tight leading-snug line-clamp-2 min-h-[36px] mb-1 group-hover:text-primary transition-colors" title={service.name}>
                                        {service.name}
                                    </h3>

                                    {service.description && (
                                        <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                                            {service.description}
                                        </p>
                                    )}

                                    {tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {tags.map((tag) => (
                                                <span key={tag} className="text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-slate-500">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-auto pt-3 border-t border-white/[0.06]">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-[10px] text-slate-600 uppercase tracking-wider font-medium">From</span>
                                                <div className="text-lg font-bold text-white tracking-tight">
                                                    {hasPrice ? formatPrice(price) : "--.--"}
                                                </div>
                                            </div>
                                            <div className="min-h-[36px] px-3.5 flex items-center rounded-lg bg-white/[0.05] group-hover:bg-primary group-focus-visible:bg-primary border border-white/[0.08] group-hover:border-primary group-focus-visible:border-primary text-xs font-bold text-slate-300 group-hover:text-white group-focus-visible:text-white uppercase tracking-wider transition-all duration-300 gap-1">
                                                View
                                                <ArrowRight className="size-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}

                    {/* Custom Request Card */}
                    <Link
                        href="/contact"
                        className="group flex flex-col items-center justify-center text-center rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01] hover:border-primary/30 hover:bg-white/[0.02] transition-all duration-300 p-8 min-h-[300px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        <div className="size-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4 group-hover:border-primary/30 transition-colors">
                            <MessageSquare className="size-5 text-slate-600 group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-1">Need something custom?</h3>
                        <p className="text-xs text-slate-500 max-w-[200px] mb-5 leading-relaxed">
                            Tell us what you need and our support team will help build the right order.
                        </p>
                        <span className="text-xs font-semibold text-primary group-hover:underline transition-colors">
                            Contact Support
                        </span>
                    </Link>
                </div>
            ) : initialServices.length === 0 ? (
                /* Empty state — no services at all */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="size-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-3">
                        <Package className="size-5 text-slate-600" />
                    </div>
                    <p className="text-sm text-slate-400 max-w-sm mb-4">
                        No services available yet for this game.
                    </p>
                    <Link
                        href="/contact"
                        className="text-xs font-semibold text-primary hover:underline transition-colors"
                    >
                        Contact support for a custom request
                    </Link>
                </div>
            ) : (
                /* No search results */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="size-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-3">
                        <Search className="size-5 text-slate-600" />
                    </div>
                    <p className="text-sm text-slate-400 max-w-sm">
                        No services match &ldquo;{searchQuery}&rdquo;. Try a different search term.
                    </p>
                </div>
            )}
        </div>
    )
}
