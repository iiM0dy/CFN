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

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="h-px w-12 bg-primary mb-4" />
                <h2 className="font-cairo text-3xl md:text-[34px] font-bold text-white tracking-tight uppercase">
                  Available <span className="text-primary">Games</span>
                </h2>
                <p className="text-slate-400 text-sm mt-2 max-w-xl">
                  Choose a game to view available boosts, coaching, and progression services.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-primary transition-colors shrink-0 group"
              >
                View All Games
                <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {displayGames.length > 0 ? (
              <div className={`grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ${displayGames.length < 6 ? "xl:flex xl:justify-center xl:[&>a]:w-[200px] xl:[&>a]:shrink-0" : ""}`}>
                {displayGames.map((g: any, i: number) => {
                  const hasImage = g.bgImage && (g.bgImage.includes('://') || g.bgImage.startsWith('/'))
                  const initials = getInitials(g.name)
                  return (
                    <Link
                      key={g.name}
                      href={`/${g.slug}/services`}
                      className="group relative flex w-full aspect-[3/4] items-end overflow-hidden rounded-xl border border-white/[0.06] bg-[#0e0e0e] transition-all duration-300 hover:scale-[1.03] hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus-visible:border-primary/40"
                    >
                      {/* Background image or gradient fallback */}
                      <div className="absolute inset-0 overflow-hidden">
                        {hasImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={g.bgImage}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${getGradientForIndex(i)} opacity-80`} />
                        )}
                        {/* Gradient overlay — always present for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      </div>

                      {/* Initials fallback */}
                      {!hasImage && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                          <span className="font-cairo text-5xl font-black text-white/[0.05] group-hover:text-white/[0.08] transition-colors duration-500">
                            {initials}
                          </span>
                        </div>
                      )}

                      {/* Character overlay */}
                      {g.charImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={g.charImage}
                          alt=""
                          aria-hidden="true"
                          className="absolute -right-3 -bottom-4 h-[115%] w-auto object-contain opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500 pointer-events-none z-10"
                        />
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                      {/* Content */}
                      <div className="relative z-20 p-3.5 w-full">
                        <h3 className="font-cairo text-sm sm:text-[15px] font-bold text-white uppercase tracking-tight leading-tight mb-0.5 line-clamp-2 group-hover:text-primary transition-colors">
                          {g.name}
                        </h3>
                        {g.description && (
                          <p className="text-[11px] text-slate-400 font-medium mb-2 line-clamp-1" dangerouslySetInnerHTML={{ __html: g.description }} />
                        )}
                        {/* CTA — always visible on mobile, hover-reveal on desktop */}
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary transition-all duration-300 sm:opacity-0 sm:translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:group-focus-visible:opacity-100 sm:group-focus-visible:translate-y-0">
                          View Services <ArrowRight className="size-3" />
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="size-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-3">
                  <Gamepad2 className="size-5 text-slate-600" />
                </div>
                <p className="text-slate-500 text-sm max-w-sm">
                  No games are available at the moment. Check back soon as we expand our catalog.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* FEATURED SERVICES */}
        <section className="bg-[#050505] pb-16 pt-4">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="h-px w-12 bg-primary mb-4" />
                <h2 className="font-cairo text-3xl md:text-[34px] font-bold text-white tracking-tight uppercase">
                  Featured <span className="text-primary">Services</span>
                </h2>
                <p className="text-slate-400 text-sm mt-2 max-w-xl">
                  Top-rated boosts and coaching packages picked by our community.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-primary transition-colors shrink-0 group"
              >
                View All Services
                <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {featuredServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredServices.map((fs: any) => {
                  const bgImage = fs.image || fs.game?.bgImage || ""
                  const hasBg = bgImage && (bgImage.includes('://') || bgImage.startsWith('/'))
                  const serviceSlug = fs.slug || fs.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || String(fs.id)
                  const hasPrice = fs.basePrice != null && !isNaN(Number(fs.basePrice))

                  return (
                    <Link
                      href={`/services/${encodeURIComponent(serviceSlug)}`}
                      key={fs.id}
                      aria-label={`View ${fs.name} — ${hasPrice ? `from $${Number(fs.basePrice).toFixed(2)}` : "pricing available"}`}
                      className="group flex flex-col overflow-hidden rounded-xl bg-[#0c0c0c] border border-white/[0.06] hover:border-primary/40 focus-visible:border-primary/40 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-[140px] sm:h-[152px] w-full overflow-hidden bg-[#111]">
                        {hasBg ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={bgImage}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#150a1a] to-[#0a0a0a] flex items-center justify-center">
                            <Package className="size-6 text-slate-700" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/20 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-1">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1">
                          {fs.game?.name || "Service"}
                        </span>
                        <h3 className="text-[13px] font-bold leading-snug text-white line-clamp-2 min-h-[36px] mb-3" title={fs.name}>
                          {fs.name}
                        </h3>

                        <div className="mt-auto">
                          <span className="text-[10px] uppercase font-medium tracking-widest text-slate-600">Starting at</span>
                          <div className="text-base font-bold text-white mt-0.5">
                            {hasPrice ? `$${Number(fs.basePrice).toFixed(2)}` : "--.--"}
                          </div>
                        </div>

                        <div className="mt-3 w-full rounded-lg bg-white/[0.04] group-hover:bg-primary group-focus-visible:bg-primary border border-white/[0.06] group-hover:border-primary group-focus-visible:border-primary min-h-[44px] flex items-center justify-center text-[12px] font-semibold text-slate-300 group-hover:text-white group-focus-visible:text-white uppercase tracking-wider transition-all duration-300">
                          View Details
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              /* Empty state — compact placeholder */
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="size-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-3">
                  <Package className="size-5 text-slate-600" />
                </div>
                <p className="text-slate-500 text-sm max-w-sm">
                  Featured services coming soon. Check back as we curate our top picks.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <HowItWorks />

        {/* TESTIMONIALS — hidden when no reviews exist for clean production behavior */}
        <TestimonialsSection />

      </main>
      <Footer />
    </div>
  )
}
