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
  { name: "World of Warcraft", tag: "Raid • Leveling", icon: Swords, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "/wow/services" },
  { name: "ARC Raiders", tag: "Materials • Loot", icon: Star, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "/arc-raiders/services" },
  { name: "Valorant", tag: "Rank • Coaching", icon: Target, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "/valorant/services" },
  { name: "League of Legends", tag: "Rank • Duo Queue", icon: Trophy, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "/lol/services" },
  { name: "Path Of Exile", tag: "Currency • Items", icon: Crosshair, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "/poe/services" },
  { name: "Path Of Exile 2", tag: "Currency • Items", icon: CloudLightning, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Throne And Liberty", tag: "Currency • Items", icon: Flame, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Diablo IV", tag: "Power • Gold", icon: Sword, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Marvel Rivals", tag: "Currency • Items", icon: Shield, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Overwatch", tag: "Rank • Coaching", icon: Gamepad2, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Destiny 2", tag: "Rank • Coaching", icon: Aperture, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Call of Duty", tag: "MWIII • Warzone", icon: Bomb, bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
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
        <section id="games" className="bg-[#050505] py-10 scroll-mt-20">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

            {/* header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="h-px w-12 bg-primary mb-4" />
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
                  Choose from <span className="text-primary">100+ Games</span>
                </h2>
              </div>
            </div>

            {/* filter tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  className={`rounded-full border px-4 py-1.5 text-[14px] font-bold uppercase tracking-wider transition-all
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
                      <div className="text-[14px] text-text-dim font-medium">{g.tag}</div>
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {featuredServices.length > 0 ? (
                featuredServices.map((fs) => {
                  const bgImage = fs.image || fs.game.bgImage || "from-[#1a0520] to-[#2d0a35]";
                  const isBgUrl = bgImage.includes('://') || bgImage.startsWith('/');

                  return (
                    <Link
                      href={`/services/${encodeURIComponent(fs.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}`}
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
                        <div className="text-[14px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                          {fs.game.name}
                        </div>
                        <div className="text-sm font-bold leading-snug text-white line-clamp-2 min-h-[40px] mb-4">
                          {fs.name}
                        </div>

                        <div className="mt-auto flex flex-col">
                          <span className="text-[14px] uppercase font-bold tracking-widest text-[#888] mb-0.5">Starting at</span>
                          <div className="text-xl font-black text-white">
                            ${Number(fs.basePrice).toFixed(2)}
                          </div>
                        </div>

                        <button className="mt-4 w-full rounded-md bg-primary py-2.5 text-[14px] font-black uppercase tracking-widest text-white transition-colors hover:bg-primary/90">
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
                        <div className="text-[14px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                          {f.game}
                        </div>
                        <div className="text-sm font-bold leading-snug text-white line-clamp-2 min-h-[40px] mb-4">
                          {f.title}
                        </div>

                        <div className="mt-auto flex flex-col">
                          <span className="text-[14px] uppercase font-bold tracking-widest text-[#888] mb-0.5">Starting at</span>
                          <div className="text-xl font-black text-white">
                            {f.price}
                          </div>
                        </div>

                        <button className="mt-4 w-full rounded-md bg-primary py-2.5 text-[14px] font-black uppercase tracking-widest text-white transition-colors hover:bg-primary/90">
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

        {/* ── OPERATIONAL SEQUENCE ── */}
        <HowItWorks />


        {/* ── TESTIMONIALS ── */}
        <TestimonialsSection />

      </main>
      <Footer />
    </div>
  )
}
