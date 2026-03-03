import { Footer } from "@/components/layout/footer"
import { ServicePage } from "@/components/services/service-page"

export default function LoLPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                <ServicePage
                    game="League of Legends"
                    tagline="Conquer the Rift"
                    description="Professional Solo/Duo Queue boosting by Challenger players. Climb to your desired rank with complete account security."
                    stats={[
                        { label: "Orders Done", value: "5,100+" },
                        { label: "Avg Completion", value: "24hrs" },
                        { label: "Satisfaction", value: "99.5%" },
                        { label: "Active Boosters", value: "52+" },
                    ]}
                    services={[
                        { id: "lol-solo", name: "Solo Queue Boost", description: "Our boosters play on your account to reach your desired rank.", price: 20, priceLabel: "From $20", features: ["All Ranks", "Role Select", "Offline Mode"] },
                        { id: "lol-duo", name: "Duo Queue", description: "Play alongside a Challenger booster and climb together.", price: 30, priceLabel: "From $30", features: ["Play Together", "Voice Chat", "Learn & Win"] },
                        { id: "lol-placement", name: "Placement Matches", description: "Start your season strong with professional placement match handling.", price: 35, priceLabel: "From $35", features: ["5/10 Games", "Best Start", "Season Ready"] },
                        { id: "lol-coaching", name: "Coaching", description: "Personalized coaching from Challenger & Grandmaster players.", price: 25, priceLabel: "$25/hour", features: ["VOD Review", "Live Game", "Champion Pool"] },
                    ]}
                />
            </main>
            <Footer />
        </div>
    )
}
