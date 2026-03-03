import { Footer } from "@/components/layout/footer"
import { ServicePage } from "@/components/services/service-page"

export default function CS2Page() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                <ServicePage
                    game="CS2"
                    tagline="Dominate Counter-Strike 2"
                    description="Professional Premier and Faceit boosting by Global Elite players. Fast, secure, and backed by our satisfaction guarantee."
                    stats={[
                        { label: "Orders Done", value: "3,800+" },
                        { label: "Avg Completion", value: "12hrs" },
                        { label: "Satisfaction", value: "98.7%" },
                        { label: "Active Boosters", value: "38+" },
                    ]}
                    services={[
                        { id: "cs2-premier", name: "Premier Boost", description: "Climb the Premier ranking system with verified Global Elite players.", price: 30, priceLabel: "From $30", features: ["VPN Protected", "Offline Mode", "Live Tracking"] },
                        { id: "cs2-faceit", name: "Faceit Boost", description: "Boost your Faceit level and ELO with professional 3000+ ELO players.", price: 35, priceLabel: "From $35", features: ["Level 10+", "ELO Guarantee", "Stats Safe"] },
                        { id: "cs2-wingman", name: "Wingman Boost", description: "Rank up in Wingman mode with a skilled partner.", price: 20, priceLabel: "From $20", features: ["Duo Play", "Fast Queue", "All Ranks"] },
                        { id: "cs2-coaching", name: "Coaching", description: "Learn from Global Elite mentors — aim training, utility, and game sense.", price: 25, priceLabel: "$25/hour", features: ["Demo Review", "Live Session", "Custom Plan"] },
                    ]}
                />
            </main>
            <Footer />
        </div>
    )
}
