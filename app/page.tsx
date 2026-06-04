import { HeroSection } from "@/components/home/hero-section"
import { HowItWorks } from "@/components/home/how-it-works"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { api } from "@/lib/api"
import { Gamepad2, Package, ArrowRight } from "lucide-react"

// ── FALLBACK DATA (used only when API returns empty) ────────────────────────

const GRADIENT_PRESETS = [
  "from-[#1a0a2e] to-[#0d0515]",
  "from-[#0a1a2e] to-[#050d15]",
  "from-[#1a0a0a] to-[#0d0505]",
  "from-[#0a1a12] to-[#050d08]",
  "from-[#1a150a] to-[#0d0a05]",
  "from-[#0a0f1a] to-[#05080d]",
]

const GAMES_FALLBACK = [
  { name: "World of Warcraft", description: "Raid \u00b7 Leveling", bgImage: "https://i.postimg.cc/fRFFs36m/15-(4).png", charImage: "https://i.postimg.cc/4NfjQR6c/15-(3).png", slug: "wow" },
  { name: "Valorant", description: "Rank \u00b7 Coaching", bgImage: "", slug: "valorant" },
  { name: "League of Legends", description: "Rank \u00b7 Duo Queue", bgImage: "", slug: "lol" },
  { name: "CS2", description: "Rank \u00b7 Premier", bgImage: "", slug: "cs2" },
  { name: "Fortnite", description: "Ranks \u00b7 Challenges", bgImage: "", slug: "fortnite" },
  { name: "Elden Ring", description: "Bosses \u00b7 Runes", bgImage: "", slug: "elden-ring" },
]

function getInitials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

function getGradientForIndex(i: number) {
  return GRADIENT_PRESETS[i % GRADIENT_PRESETS.length]
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const { data: featuredServices } = await api('/featured-services').catch(() => ({ data: [] }))
  const { data: dbGames } = await api('/games').catch(() => ({ data: [] }))

  const displayGames = dbGames.length > 0
    ? dbGames.map((g: any) => ({
        name: g.name,
        description: g.description || "",
        bgImage: g.bgImage || "",
        charImage: g.charImage || "",
        slug: g.slug || g.href?.split('/')[1] || "",
        serviceCount: g.serviceCount,
      }))
    : GAMES_FALLBACK

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">

        {/* HERO */}
        <HeroSection />

        {/* AVAILABLE GAMES */}
        <section id="games" className="section-alt pt-14 pb-16 scroll-mt-20">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

            <div className="mb-8">
              <div className="h-px w-12 bg-primary mb-4" />
              <h2 className="font-cairo text-3xl md:text-[34px] font-bold text-white tracking-tight uppercase">
                Available <span className="text-primary">Games</span>
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Browse our catalog of competitive games and find the service you need.
              </p>
            </div>

            {displayGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {displayGames.map((g: any, i: number) => {
                  const isImage = g.bgImage && (g.bgImage.includes('://') || g.bgImage.startsWith('/'))
                  const initials = getInitials(g.name)
                  return (
                    <Link
                      key={g.name}
                      href={`/${g.slug}/services`}
                      className="group relative flex w-full h-[160px] sm:h-[180px] items-end overflow-hidden rounded-xl border border-white/[0.06] bg-[#0e0e0e] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:[&_span.svc-cta]:opacity-0 sm:[&_span.svc-cta]:translate-y-1 sm:group-hover:[&_span.svc-cta]:opacity-100 sm:group-hover:[&_span.svc-cta]:translate-y-0"
                    >
                      {/* Background */}
                      <div className="absolute inset-0 overflow-hidden">
                        {isImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={g.bgImage}
                            alt={`${g.name} background`}
                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 pointer-events-none"
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${getGradientForIndex(i)} opacity-80`} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/50 to-transparent" />
                      </div>

                      {/* Initials fallback when no image */}
                      {!isImage && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="font-cairo text-5xl font-black text-white/[0.06] select-none group-hover:text-white/[0.1] transition-colors duration-500">
                            {initials}
                          </span>
                        </div>
                      )}

                      {/* Character image */}
                      {g.charImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={g.charImage}
                          alt=""
                          className="absolute -right-3 -bottom-4 h-[115%] w-auto object-contain opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500 pointer-events-none z-10"
                          aria-hidden="true"
                        />
                      )}

                      {/* Content */}
                      <div className="relative z-20 p-3 sm:p-4 w-full">
                        <h3 className="font-cairo text-[15px] sm:text-[15px] font-bold text-white uppercase tracking-tight leading-tight mb-1 line-clamp-2">
                          {g.name}
                        </h3>
                        {g.description && (
                          <p className="text-[11px] text-gray-300 sm:text-gray-400 font-medium mb-2" dangerouslySetInnerHTML={{ __html: g.description }} />
                        )}
                        {/* On mobile: always visible. On desktop: only on hover via CSS above. */}
                        <span className="svc-cta inline-flex items-center gap-1 text-[11px] font-semibold text-primary/90 sm:text-primary opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-1 transition-all duration-300">
                          View Services <ArrowRight className="size-3" />
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="size-14 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-4">
                  <Gamepad2 className="size-6 text-gray-600" />
                </div>
                <p className="text-gray-500 text-sm max-w-sm">
                  No games are available at the moment. Check back soon as we expand our catalog.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* FEATURED SERVICES — hidden when empty for clean production behavior */}
        {featuredServices.length > 0 && (
          <section className="bg-[#050505] pb-16 pt-4">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

              <div className="mb-8">
                <div className="h-px w-12 bg-primary mb-4" />
                <h2 className="font-cairo text-3xl md:text-[34px] font-bold text-white tracking-tight uppercase">
                  Featured <span className="text-primary">Services</span>
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Popular services chosen by our community.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredServices.map((fs: any) => {
                  const bgImage = fs.image || fs.game?.bgImage || ""
                  const isBgUrl = bgImage && (bgImage.includes('://') || bgImage.startsWith('/'))
                  const serviceSlug = fs.slug || fs.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || String(fs.id)

                  return (
                    <Link
                      href={`/services/${encodeURIComponent(serviceSlug)}`}
                      key={fs.id}
                      className="group flex flex-col overflow-hidden rounded-xl bg-[#0c0c0c] border border-white/[0.06] hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-[140px] sm:h-[160px] w-full overflow-hidden bg-[#111]">
                        {isBgUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={bgImage}
                            alt={`${fs.name} thumbnail`}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0520] to-[#0a0a0a] flex items-center justify-center">
                            <Package className="size-7 text-gray-700" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-1">
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1">
                          {fs.game?.name || "Service"}
                        </div>
                        <h3 className="text-[13px] font-semibold leading-snug text-white line-clamp-2 min-h-[36px] mb-3" title={fs.name}>
                          {fs.name}
                        </h3>

                        <div className="mt-auto">
                          <div className="text-[10px] uppercase font-medium tracking-widest text-gray-600 mb-0.5">Starting at</div>
                          <div className="text-base font-bold text-white">
                            {fs.basePrice != null && !isNaN(Number(fs.basePrice)) ? `$${Number(fs.basePrice).toFixed(2)}` : "--.--"}
                          </div>
                        </div>

                        <div className="mt-3 w-full rounded-lg bg-white/5 group-hover:bg-primary border border-white/5 group-hover:border-primary py-2 text-center text-[12px] font-semibold text-white uppercase tracking-wider transition-all duration-300">
                          View Details
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* HOW IT WORKS */}
        <HowItWorks />

        {/* TESTIMONIALS — hidden when no reviews exist for clean production behavior */}
        <TestimonialsSection />

      </main>
      <Footer />
    </div>
  )
}
