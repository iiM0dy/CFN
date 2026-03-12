"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store"
import { Swords, ShieldCheck, Clock, Star, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { useCurrency } from "@/context/currency-context"

const services = [
    {
        id: "val-rank-boost",
        name: "Rank Boost",
        description: "Climb from your current rank to your desired rank. Our Radiant-tier boosters use VPN protection and offline mode for maximum security.",
        price: 25.00,
        features: ["VPN Protected", "Offline Mode", "Live Tracking"],
    },
    {
        id: "val-duo-queue",
        name: "Duo Queue",
        description: "Play alongside a professional booster. Learn while you climb. Communicate via voice chat for coordinated plays.",
        price: 35.00,
        features: ["Play Together", "Voice Comms", "Learn & Win"],
    },
    {
        id: "val-placement",
        name: "Placement Matches",
        description: "Let our pros handle your placement games for the best possible starting rank. Available at the start of every act.",
        price: 40.00,
        features: ["5/10 Games", "Best Start", "Act Ready"],
    },
    {
        id: "val-coaching",
        name: "1-on-1 Coaching",
        description: "Get personalized coaching from Immortal and Radiant players. VOD reviews, live coaching, and performance analysis.",
        price: 30.00,
        features: ["VOD Review", "Live Session", "Custom Plan"],
    },
]

const stats = [
    { label: "Orders Done", value: "4,200+" },
    { label: "Avg Completion", value: "18hrs" },
    { label: "Satisfaction", value: "99.2%" },
    { label: "Active Boosters", value: "45+" },
]

export function ValorantServices() {
    const { addItem } = useCart()
    const { formatPrice } = useCurrency()

    const handleAdd = (service: typeof services[0]) => {
        addItem({
            id: service.id,
            name: `Valorant ${service.name}`,
            price: service.price,
            quantity: 1,
        })
        toast.success(`${service.name} added to cart`)
    }

    return (
        <>
            {/* Hero */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative mx-auto max-w-7xl px-4 md:px-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-primary/10">
                            <Swords className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-primary uppercase tracking-wider">Valorant</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Valorant Boosting Services
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                        Professional rank boosting by Radiant-tier players. Fast, secure, and backed by our satisfaction guarantee.
                    </p>

                    {/* Stats bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="p-4 rounded-xl border border-border/40 bg-card/50 text-center">
                                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="pb-24">
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    <h2 className="text-2xl font-bold mb-8">Available Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="group p-6 rounded-xl border border-border/40 bg-card/50 hover:border-primary/30 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-semibold">{service.name}</h3>
                                    <span className="text-lg font-bold text-primary">
                                        {service.id === "val-coaching" ? `${formatPrice(service.price)}/hour` : `From ${formatPrice(service.price)}`}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {service.features.map((f) => (
                                        <span key={f} className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-secondary text-muted-foreground">
                                            {f}
                                        </span>
                                    ))}
                                </div>
                                <Button className="w-full" onClick={() => handleAdd(service)}>
                                    Add to Cart
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
