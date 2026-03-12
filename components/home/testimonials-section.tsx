"use client"

const testimonials = [
    {
        quote: "Absolutely insane speed. The booster was super chill and even gave me tips on my crosshair placement. Went from Gold to Ascendant in a week.",
        author: "Alex M.",
        tag: "Valorant • Rank Boost",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUYyZhJYTAnm3v14dfaNhV_psEjYBsmvmp9rRDBB4klGaep7z3IQeGnzoU4zby3pMpFqvM1Epq02WzbrnJiGRyLGT-YncIdtBBRv3lkkWXYfoJamD0RWz7J3VpfmPJRN0-EgKyENFG07OWwY6V2F4uxTZtI8MHfK6pV0mv-Ex83fo_sKDQlINs9d0nDGZ2quem7yb51GHKgaiOPfjlS0g0qVw9NOClmxBWdylhe110gtfzt7JOlTvpGFsE0OS6UFS5GquxorrNQlJJ",
    },
    {
        quote: <>Support was online at 3 AM to help me with my order. The transparency is what makes <span className="font-black text-primary font-cairo">CFNboost</span> the best. No sketchy business.</>,
        author: "Sarah K.",
        tag: "LoL • Duo Queue",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOvioGXQ6xKtNPx0DlGE-iOuwXunePADe0BLkNwn1csFdwZO96bOdBFyhQzR01gIkEGNLJya_2y-TUX5USd9F_XvvDzPdL-M854S1Qrx0XF0_O6XmRlw_OUu00Qp5PuNz7F6w871Hv-sph_LIJfh9K0b_bkz8jW-cQw8hvcccFX5aVCmL66o2t9WeuHATX6V86R8fz0nppR7lNhDzk_kehuGxkn8vPd6k7SWc4Vsw4loxtZbZLaAxtFTBPbPSV2nDaDeNwNm6f57Vr",
    },
    {
        quote: <>Used other sites before, but <span className="font-black text-primary font-cairo">CFNboost</span> is cleaner and faster. The booster respected my offline mode request perfectly.</>,
        author: "David R.",
        tag: "CS2 • Premier",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUroKfm0jdN3bJQQcefGxSqM-mvwX3x0uCdZ2rdgnZUL_ITRW0QnxHQnieebavOhdHvK2FyoYb8AmQExGBZ07DRT3rHXQVV5aEQRb1Qru0KjD8ffqlxlPL8i3ZCkajhJ5ZMiCon3mLgPTwDGxgOU_pd0C2r0uhLfAFnbBYh39GiyG9rDPQKC8ftPEf1pyA4e1Xh0MdrCxD_audHGJIMkDuQLIBQQZNECpPOWn_0OHIYZVYAGDHXr9mOAu1DyEOoP36T5mOhk6nXKIC",
    },
]

export function TestimonialsSection() {
    return (
        <section className="py-24 bg-[#050505]">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
                        Feedbacks
                    </h2>
                    <div className="flex gap-3">
                        <button className="size-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="size-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div
                            key={t.author}
                            className={`relative rounded-2xl border border-white/10 bg-[#0a0a0a]/80 p-10 backdrop-blur-md overflow-hidden ${i === 1 ? "border-primary/40 shadow-[0_0_35px_rgba(175,18,37,0.25)]" : ""
                                }`}
                        >
                            <div className="absolute top-8 right-8 opacity-10">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7.17 6A5.001 5.001 0 002 11v7h7v-7H6.83A3.001 3.001 0 019 8.17V6H7.17zM17.17 6A5.001 5.001 0 0012 11v7h7v-7h-2.17A3.001 3.001 0 0120 8.17V6h-2.83z" />
                                </svg>
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, j) => (
                                    <svg
                                        key={j}
                                        className="w-4 h-4 text-primary"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674 4.911.017c.969.004 1.371 1.24.588 1.81l-3.97 2.883 1.485 4.686c.285.9-.755 1.65-1.54 1.118L10 15.347l-3.944 2.768c-.784.55-1.825-.218-1.54-1.118l1.485-4.686-3.97-2.883c-.783-.57-.38-1.806.588-1.81l4.911-.017 1.519-4.674z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-gray-300 text-sm md:text-base mb-8 leading-relaxed">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-2">
                                <div
                                    className="size-12 rounded-full bg-primary/20 border border-primary/40 bg-cover bg-center flex-shrink-0"
                                    style={{ backgroundImage: `url('${t.avatar}')` }}
                                />
                                <div>
                                    <h5 className="text-white font-bold text-sm uppercase tracking-tight">{t.author}</h5>
                                    <span className="text-[11px] text-gray-500 font-medium uppercase tracking-widest">
                                        {t.tag}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
