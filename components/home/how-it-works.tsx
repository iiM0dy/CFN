"use client"

import { Search, Settings, BarChart3, PartyPopper } from "lucide-react"

const steps = [
    {
        icon: Search,
        number: "01",
        title: "Choose Your Service",
        description: "Browse available games and select the boost, coaching, or progression service you need.",
    },
    {
        icon: Settings,
        number: "02",
        title: "Customize Your Order",
        description: "Pick your platform, completion method, speed, and any extra options before checkout.",
    },
    {
        icon: BarChart3,
        number: "03",
        title: "Track Progress",
        description: "Follow your order status and stay connected with support while your service is in progress.",
    },
    {
        icon: PartyPopper,
        number: "04",
        title: "Enjoy the Results",
        description: "Once completed, review your progress and return anytime for your next upgrade.",
    },
]

const trustBadges = [
    { icon: "lock", label: "Secure Stripe Checkout" },
    { icon: "verified", label: "Verified Boosters" },
    { icon: "pin_drop", label: "Order Tracking" },
    { icon: "support_agent", label: "24/7 Support" },
]

export function HowItWorks() {
    return (
        <section className="section-alt py-16">
            <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">

                {/* Header */}
                <div className="max-w-xl mb-12">
                    <div className="h-px w-12 bg-primary mb-4" />
                    <h2 className="font-cairo text-3xl md:text-[34px] font-bold text-white tracking-tight uppercase mb-3">
                        How It <span className="text-primary">Works</span>
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Getting started is simple. Here&apos;s how your boost goes from order to completion.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map((step) => {
                        const Icon = step.icon
                        return (
                            <div
                                key={step.number}
                                className="group relative p-5 sm:p-6 rounded-xl bg-[#0e0e0e] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-5">
                                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors">
                                        <Icon className="size-[18px]" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[11px] font-medium text-gray-600 uppercase tracking-widest">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="text-white font-semibold text-[15px] mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-500 text-[13px] leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        )
                    })}
                </div>

                {/* Trust Badges */}
                <div className="mt-14 pt-6 border-t border-white/5">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                        {trustBadges.map((badge) => (
                            <div key={badge.label} className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors">
                                <span className="material-symbols-outlined text-[16px] text-emerald-600">
                                    {badge.icon}
                                </span>
                                <span className="text-[11px] font-medium uppercase tracking-wider">
                                    {badge.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
