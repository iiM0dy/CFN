"use client";

import Link from "next/link";

export default function StoryPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#211113] text-slate-100 font-[family-name:var(--font-space-grotesk)] antialiased overflow-x-hidden">
            
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-cover bg-center px-4 py-20 text-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(33, 17, 19, 0.8) 0%, rgba(33, 17, 19, 1) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCefbb89b0YPZiUdgTAQ46VgQiymnnkpQDKN2Jh8Bty9-7oGs1ALk3ktAAUADKcJs0s4DN1MWPCRBRh5KZeKsu5HePfajizNUT1orjuv72VPzYsY0tx81jFF0KRd_aE4qk_1cYTROwh3YXXrR0BZc6-t2T9708m_CCqFk7Z5dz_AOlPYp7voF8yf5Rew1UTGpgBoj3jyWxL9WnH-OO7cCgnDrWCX6ABRyOOFSmeVKb-os7XlU73s_7fg9JGVu4fja6FznZ8Rj9C8Vc0")` }}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(175,18,37,0.15)_0%,transparent_70%)]" />
                    <div className="relative z-10 max-w-4xl space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#533c3f] bg-[#261c1d]/80 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            ELITE GAMING SERVICES
                        </div>
                        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
                            FORGED IN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">SHADOWS.</span><br />
                            BUILT FOR THE <span className="text-primary">ELITE.</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-slate-300 md:text-xl font-light">
                            Redefining victory with the world&apos;s most secure competitive gaming marketplace. We provide a sanctuary for players who value their time and rank above all else.
                        </p>
                    </div>
                </section>

                {/* Stats Bar */}
                <div className="w-full border-y border-[#38292b] bg-[#181112]">
                    <div className="mx-auto max-w-7xl px-4 py-8">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
                            {[
                                { value: "50k+", label: "Total Orders" },
                                { value: "100%", label: "Secure Transactions" },
                                { value: "500+", label: "Active Boosters" },
                                { value: "24/7", label: "Support Coverage" },
                            ].map((s) => (
                                <div key={s.label} className="text-center md:text-left">
                                    <p className="text-3xl font-bold text-white md:text-4xl">{s.value}</p>
                                    <p className="mt-1 text-sm font-medium text-slate-400 uppercase tracking-widest">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mission & Values */}
                <section className="py-24 px-4 bg-[#211113]">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 grid gap-12 lg:grid-cols-2 lg:items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-white md:text-5xl">OUR MISSION</h2>
                                <div className="mt-6 space-y-6 text-lg text-slate-300">
                                    <p>At Airwick, we believe that skill should be rewarded, not stifled by matchmaking algorithms or teammates who don&apos;t share your drive. We exist to remove the friction from your climb.</p>
                                    <p>We aren&apos;t just a marketplace; we are a curated collective of the top 0.1% of players globally. When you choose Airwick, you aren&apos;t just buying a boost—you are deploying a tactical asset to secure your objectives.</p>
                                </div>
                            </div>
                            <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-xl border border-[#38292b]">
                                <img alt="Dark futuristic server room representing secure infrastructure" className="absolute inset-0 h-full w-full object-cover opacity-60 hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV2MMWHjT6TtwaVUdq7OGxsVywZpx_B7ug9NNhGXu1UPDdK2Ie4C7uuYLikzqQ0lWmIuStDq8WPwS3yXj5ROvoR4OPE6kq49SqhZ3IkI7yI4b_zTWrbUA93bzC7KX-6ohnlpwB5kHHzB7B_5LILPHgcXxf_0bS6m_edGSysdCsl_M_Dx6yGA9dWG-sc070ua-2BnW6cSKIwg4sEwmHFliUNXscd-KKLT9trvqumA_JHJcxnnlztDII7KG88fTLIZGzNTSgOZzq9I4u" />
                            </div>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {[
                                { icon: "👁️", title: "Radical Transparency", desc: "No hidden fees. Live tracking on every order. Watch your rank climb in real-time through our proprietary dashboard." },
                                { icon: "⚡", title: "Velocity & Speed", desc: "Time is your most valuable asset. We deploy elite radiant-tier boosters instantly upon order confirmation." },
                                { icon: "🛡️", title: "Ironclad Safety", desc: "Military-grade VPN encryption on every session. Your account is a fortress, protected by our strict non-disclosure protocols." },
                            ].map((c) => (
                                <div key={c.title} className="group relative overflow-hidden rounded-xl border border-[#38292b] bg-[#261c1d] p-8 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                                    <div className="mb-6 inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-2xl group-hover:bg-primary group-hover:text-white transition-colors">{c.icon}</div>
                                    <h3 className="mb-3 text-xl font-bold text-white">{c.title}</h3>
                                    <p className="text-[#b89da1]">{c.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="border-t border-[#38292b] bg-[#181112] py-24 px-4">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 text-center">
                            <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-primary">The Architects</span>
                            <h2 className="text-3xl font-bold text-white md:text-5xl">MEET THE LEADERSHIP</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-slate-400">Veterans of the industry. Former pro-players. Cybersecurity experts. We are the team behind the curtain.</p>
                        </div>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                { name: 'Alex "Viper" Chen', role: "Founder & CEO", desc: "Former Challenger player turned entrepreneur.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9oVUlq0hoLoBxg01W4xHDdmf8ra8d45_buhdPjt3ijA8OXa8gLEnyiBB-bdaNBpht_3Xi3KnwBMikxd6KP9evI5n6ttyEpGSv0EiTa90O80c0QKAB3Y5U86-LhGidSJ_J6Fg08mbbSfGVx-RwIB_RBtELAXX6WZIo060HZmKURpq3A-DQrCfC5zthv18n3jhuVkmUhdFsaswmxVbv8tawStFtl34lz_LfCWjrCmcF-S3Xz69jIMliG-suntxpDVwC70VCaLajYM1L" },
                                { name: 'Elena "Cipher" Rostova', role: "Head of Security", desc: "Cybersecurity specialist ensuring 100% account safety.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnQpi7mRTEkS-dzBXXodfmEmqMwLhbI3tc_u9qgpoqLtZXbqg3y2Ki5PyMRXzfkSKto95cV0tCgZIZh-WYTMzZmAHX3vIKeC_FHWNNBlgKYQre48lHiI8Pt-nAeSB5IBScOYz-AsqCifuptAI6ZYcgUcTrurmcXaTl1dGdQfU6-QiVhUBJtwB_NS00ftymwADJNpV3UrfKkd8hL1gw2S-NMu4cIx5e-0uyzDCD0qHfCJgaeGW7ar1cFBxHxdHpApm9LxlFHaSPDYYd" },
                                { name: 'Marcus "Shift" Thorne', role: "Operations Director", desc: "Managing global booster logistics and deployment.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOF2PwsfknYKMGno6a_6HRYJkSBXpLf2Kgp8634A58a-Joa0PDijprupInJaOkNQlrMYnI16CWYvXP7Z9Wla6kMPDiHAs9DYbEO6lv2cdhDLwRIPrEOIkHNuoKKkEPhPTVuSTDCFu1M3nlA1R3fFo5t0pfRnE93YCg6hg_ervUl9eRymCwzcWQcpg-N2HbvGIeLq3qHPJ18BCnppaZvNrcguIUryZoBRkbMNFqO9bSKxdJzABj9mW4aggYjXe3IipPNX9xNvsjLzse" },
                                { name: 'Sarah "Pulse" Jensen', role: "Community Lead", desc: "Building bridges between pros and clients.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn_4BvuvCo3zDqgoWgWvwg0AdwAU5XhSlnRis6w4bdJC1HfeVbmy3iiByryj0klBIQZEpKlXyEvrl1qJb6tEAk7mfTLHHkilDGGIpI9gjxQAbXjkqqoBVKGLVMhG6jcgvTLS2p_aADqkmL9FeytLUq2ujE6N9gvtgSFf_RLk1bEC7SfUxkzzDhOt8wS0UKmOGJJoSgu6w5Z_sot3G0gyoYxAXY3NJmZmKGbUohJp1k_5wqUMCr0y6HiN5ML87s3fndonj0H12_VTQB" },
                            ].map((t) => (
                                <div key={t.name} className="group flex flex-col items-center">
                                    <div className="relative mb-6 size-48 overflow-hidden rounded-full border-2 border-[#533c3f] bg-slate-800">
                                        <img alt={t.name} className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" src={t.img} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{t.name}</h3>
                                    <p className="text-sm font-medium text-primary">{t.role}</p>
                                    <p className="mt-2 text-center text-sm text-slate-400">{t.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative overflow-hidden py-20 px-4">
                    <div className="absolute inset-0 bg-primary/5" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <h2 className="text-4xl font-bold text-white md:text-5xl">READY TO ASCEND?</h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">Join the elite ranks today. Secure, fast, and professional boosting is just one click away.</p>
                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link href="/services/valorant" className="flex h-12 min-w-[200px] items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-white transition-all hover:bg-[#8f0e1d] hover:shadow-[0_0_20px_rgba(175,18,37,0.5)]">Start Your Order</Link>
                            <Link href="/contact" className="flex h-12 min-w-[200px] items-center justify-center rounded-lg border border-[#533c3f] bg-transparent px-8 text-base font-bold text-white transition-all hover:bg-[#38292b]">Contact Support</Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-[#38292b] bg-[#181112] pt-16 pb-8 text-slate-400">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid gap-12 md:grid-cols-4">
                        <div className="col-span-1 md:col-span-2">
                            <div className="mb-4 flex items-center gap-3 text-white">
                                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 48 48"><path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" /></svg>
                                <span className="text-lg font-bold">Airwick</span>
                            </div>
                            <p className="max-w-xs text-sm leading-relaxed">The premier marketplace for competitive gaming services. Secure, anonymous, and elite.</p>
                        </div>
                        <div>
                            <h4 className="mb-4 font-bold text-white">Platform</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link className="hover:text-primary transition-colors" href="/services">Boosting</Link></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Coaching</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Accounts</a></li>
                                <li><Link className="hover:text-primary transition-colors" href="/wall-of-fame">Reviews</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-bold text-white">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><span className="text-primary font-medium">About Us</span></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Legal</a></li>
                                <li><Link className="hover:text-primary transition-colors" href="/contact">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-16 border-t border-[#38292b] pt-8 text-center text-xs text-slate-500">
                        © 2024 Airwick Gaming Services. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
