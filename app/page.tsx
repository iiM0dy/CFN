import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { PopularGames } from "@/components/home/popular-games"
import { PricingSection } from "@/components/home/pricing-section"
import { HowItWorks } from "@/components/home/how-it-works"
import { TestimonialsSection } from "@/components/home/testimonials-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <PopularGames />
        <PricingSection />
        <HowItWorks />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
