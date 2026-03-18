import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { HowItWorks } from "@/components/home/how-it-works"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import Link from "next/link"
import { Target, Swords, Trophy, Crosshair, CloudLightning, Flame, Shield, Gamepad2, Aperture, Bomb, Sword, Star } from "lucide-react"
import { prisma } from "@/lib/prisma"

// ── DATA ─────────────────────────────────────────────────────────────────────

const FILTERS = ["All", "WoW", "Valorant", "League of Legends", "CS2", "Fortnite", "Elden Ring", "Destiny 2"]

const GAMES = [
  { name: "World of Warcraft", tag: "Raid • Leveling", icon: Swords, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "/games/wow/services" },
  { name: "Valorant", tag: "Rank • Coaching", icon: Target, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "/games/valorant/services" },
  { name: "League of Legends", tag: "Rank • Duo Queue", icon: Trophy, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "/games/lol/services" },
  { name: "CS2", tag: "Premier • Faceit", icon: Crosshair, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "/games/cs2/services" },
  { name: "Fortnite", tag: "Arena • Coaching", icon: CloudLightning, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Elden Ring", tag: "Runes • Carry", icon: Flame, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Destiny 2", tag: "Raids • Exotics", icon: Shield, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Apex Legends", tag: "Rank • Badges", icon: Gamepad2, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Overwatch 2", tag: "Rank • Coaching", icon: Aperture, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Call of Duty", tag: "MWIII • Warzone", icon: Bomb, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Diablo IV", tag: "Power • Gold", icon: Sword, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "ARC Raiders", tag: "Materials • Loot", icon: Star, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "/games/arc-raiders/services" },
]

const FEATURED = [
  { game: "Valorant", title: "Rank Boost — Platinum → Diamond", price: "$45.00", icon: Target, bg: "from-[#1a0520] to-[#2d0a35]" },
  { game: "World of Warcraft", title: "Mythic+ Dungeon Carry ×10", price: "$29.00", icon: Swords, bg: "from-[#0a1a10] to-[#0d2015]" },
  { game: "League of Legends", title: "Solo Rank Boost — Gold → Plat", price: "$19.00", icon: Trophy, bg: "from-[#1a0a0a] to-[#2a0d10]" },
  { game: "CS2", title: "Premier Rating Boost +3000", price: "$35.00", icon: Crosshair, bg: "from-[#0a0a1a] to-[#10102a]" },
]

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const featuredServices = await prisma.service.findMany({
    where: { isFeatured: true },
    include: { game: true },
    orderBy: { createdAt: 'desc' },
    take: 8
  });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">

        {/* ── HERO (unchanged) ── */}
        <HeroSection />

        {/* ── GAMES GRID ── */}
        <section className="bg-[#050505] py-10">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

            {/* header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="h-px w-12 bg-primary mb-4" />
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
                  Choose from <span className="text-primary">100+ Games</span>
                </h2>
              </div>
              <Link href="/games" className="text-sm font-bold text-primary hover:text-[#FF2B49] uppercase tracking-widest transition-colors">
                Browse all →
              </Link>
            </div>

            {/* filter tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all
                    ${i === 0
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-card text-muted-foreground hover:border-primary hover:text-white"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {GAMES.map((g) => {
                const isImage = g.bg.includes('://') || g.bg.startsWith('/');
                return (
                  <Link
                    key={g.name}
                    href={g.href}
                    className="group relative flex w-full h-[115px] items-end overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50"
                  >
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      {isImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={g.bg}
                          alt={g.name}
                          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-linear-to-br ${g.bg}`} />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-[#080808]/90 via-[#080808]/20 to-transparent pointer-events-none" />
                    <div className="relative z-10 p-3 pointer-events-none">
                      <div className="font-cairo text-sm font-black leading-tight text-white uppercase tracking-tight mb-0.5">{g.name}</div>
                      <div className="text-[10px] text-text-dim font-medium">{g.tag}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* divider */}
        <div className="mx-6 lg:mx-10 h-px bg-border" />

        {/* ── FEATURED SERVICES ── */}
        <section className="bg-[#050505] py-10">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="h-px w-12 bg-primary mb-4" />
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
                  Featured <span className="text-primary">Services</span>
                </h2>
              </div>
              <Link href="/games" className="text-sm font-bold text-primary hover:text-[#FF2B49] uppercase tracking-widest transition-colors">
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {featuredServices.length > 0 ? (
                featuredServices.map((fs) => {
                  const bgImage = fs.image || fs.game.bgImage || "from-[#1a0520] to-[#2d0a35]";
                  const isBgUrl = bgImage.includes('://') || bgImage.startsWith('/');

                  return (
                    <Link
                      href={`/games/${fs.game.slug}/services/${fs.id}`}
                      key={fs.id}
                      className="group flex flex-col overflow-hidden rounded-[20px] bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-all duration-300"
                    >
                      {/* thumbnail */}
                      <div className="relative h-[188px] w-full overflow-hidden border-b border-white/5">
                        {isBgUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={bgImage}
                            alt={fs.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-linear-to-br opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 ${bgImage}`} />
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-5 flex flex-col flex-1 bg-[#0A0A0A]">
                        <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                            {fs.game.name}
                        </div>
                        <div className="text-sm font-bold leading-snug text-white line-clamp-2 min-h-[40px] mb-4">
                          {fs.name}
                        </div>
                        
                        <div className="mt-auto flex flex-col">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#888] mb-0.5">Starting at</span>
                            <div className="text-xl font-black text-white">
                              ${Number(fs.basePrice).toFixed(2)}
                            </div>
                        </div>

                        <button className="mt-4 w-full rounded-md bg-primary py-2.5 text-[11px] font-black uppercase tracking-widest text-white transition-colors hover:bg-primary/90">
                          Buy Now
                        </button>
                      </div>
                    </Link>
                  )
                })
              ) : (
                FEATURED.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.title}
                      className="group flex flex-col overflow-hidden rounded-[20px] bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-all duration-300"
                    >
                      {/* thumbnail */}
                      <div className="relative h-[188px] w-full overflow-hidden border-b border-white/5">
                        <div className={`absolute inset-0 bg-linear-to-br opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 ${f.bg}`} />
                      </div>

                      {/* Content Section */}
                      <div className="p-5 flex flex-col flex-1 bg-[#0A0A0A]">
                        <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                            {f.game}
                        </div>
                        <div className="text-sm font-bold leading-snug text-white line-clamp-2 min-h-[40px] mb-4">
                          {f.title}
                        </div>
                        
                        <div className="mt-auto flex flex-col">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#888] mb-0.5">Starting at</span>
                            <div className="text-xl font-black text-white">
                              {f.price}
                            </div>
                        </div>

                        <button className="mt-4 w-full rounded-md bg-primary py-2.5 text-[11px] font-black uppercase tracking-widest text-white transition-colors hover:bg-primary/90">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="bg-[#050505] border-y border-white/5 py-12">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-10 md:gap-0">

              {[
                { value: "52,109", label: "Global Orders" },
                { value: "99.8%",  label: "Success Rate"  },
                { value: "500+",   label: "Elite Experts" },
                { value: "14 min", label: "Avg. Delivery" },
              ].map((stat, i, arr) => (
                <div key={stat.label} className="flex items-center gap-10 md:gap-0 flex-1 justify-center">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">{stat.label}</span>
                    <span className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">{stat.value}</span>
                    <div className="w-6 h-[2px] bg-primary mx-auto" />
                  </div>
                  {i < arr.length - 1 && (
                    <div className="hidden md:block w-px h-16 bg-white/5 ml-10" />
                  )}
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ── OPERATIONAL SEQUENCE (unchanged) ── */}
        <HowItWorks />

        {/* ── TESTIMONIALS (unchanged) ── */}
        <TestimonialsSection />

      </main>
      <Footer />
    </div>
  )
}
