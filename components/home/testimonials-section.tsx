"use client"

const testimonials = [
    {
        quote: "Absolutely insane speed. The booster was super chill and even gave me tips on my crosshair placement. Went from Gold to Ascendant in a week.",
        author: "Alex M.",
        tag: "Valorant • Rank Boost",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUYyZhJYTAnm3v14dfaNhV_psEjYBsmvmp9rRDBB4klGaep7z3IQeGnzoU4zby3pMpFqvM1Epq02WzbrnJiGRyLGT-YncIdtBBRv3lkkWXYfoJamD0RWz7J3VpfmPJRN0-EgKyENFG07OWwY6V2F4uxTZtI8MHfK6pV0mv-Ex83fo_sKDQlINs9d0nDGZ2quem7yb51GHKgaiOPfjlS0g0qVw9NOClmxBWdylhe110gtfzt7JOlTvpGFsE0OS6UFS5GquxorrNQlJJ",
    },
    {
        quote: "Support was online at 3 AM to help me with my order. The transparency is what makes Airwick the best. No sketchy business.",
        author: "Sarah K.",
        tag: "LoL • Duo Queue",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOvioGXQ6xKtNPx0DlGE-iOuwXunePADe0BLkNwn1csFdwZO96bOdBFyhQzR01gIkEGNLJya_2y-TUX5USd9F_XvvDzPdL-M854S1Qrx0XF0_O6XmRlw_OUu00Qp5PuNz7F6w871Hv-sph_LIJfh9K0b_bkz8jW-cQw8hvcccFX5aVCmL66o2t9WeuHATX6V86R8fz0nppR7lNhDzk_kehuGxkn8vPd6k7SWc4Vsw4loxtZbZLaAxtFTBPbPSV2nDaDeNwNm6f57Vr",
    },
    {
        quote: "Used other sites before, but Airwick is cleaner and faster. The booster respected my offline mode request perfectly.",
        author: "David R.",
        tag: "CS2 • Premier",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUroKfm0jdN3bJQQcefGxSqM-mvwX3x0uCdZ2rdgnZUL_ITRW0QnxHQnieebavOhdHvK2FyoYb8AmQExGBZ07DRT3rHXQVV5aEQRb1Qru0KjD8ffqlxlPL8i3ZCkajhJ5ZMiCon3mLgPTwDGxgOU_pd0C2r0uhLfAFnbBYh39GiyG9rDPQKC8ftPEf1pyA4e1Xh0MdrCxD_audHGJIMkDuQLIBQQZNECpPOWn_0OHIYZVYAGDHXr9mOAu1DyEOoP36T5mOhk6nXKIC",
    },
]

export function TestimonialsSection() {
    return (
        <section className="py-24 bg-[#0F0F0F] border-y border-[#1A1A1A]">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">ELITE FEEDBACK</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div
                            key={t.author}
                            className={`bg-surface-dark border border-[#2A2A2A] p-8 rounded-xl hover:bg-[#1A1A1A] transition-colors${i === 2 ? " hidden lg:block" : ""}`}
                        >
                            {/* Stars */}
                            <div className="flex items-center gap-1 mb-4 text-primary">
                                {[...Array(5)].map((_, j) => (
                                    <svg key={j} className="size-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div
                                    className="size-10 rounded-full bg-gray-700 bg-cover bg-center"
                                    style={{ backgroundImage: `url('${t.avatar}')` }}
                                />
                                <div>
                                    <h5 className="text-white font-bold text-sm">{t.author}</h5>
                                    <span className="text-xs text-gray-500">{t.tag}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
