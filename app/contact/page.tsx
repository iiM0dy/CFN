"use client"

import Link from "next/link"

export default function ContactPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen py-24 flex items-center justify-center p-6 lg:px-10">
            <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Section: Information & Socials */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-primary mb-2">
                            <span className="h-1 w-12 bg-primary rounded-full"></span>
                            <span className="text-sm font-bold uppercase tracking-widest">Elite Support</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tighter dark:text-white uppercase transition-all">
                            Get in <span className="text-primary tracking-tighter italic">Touch</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-md leading-relaxed font-medium">
                            Our elite support team is ready to assist you with your gaming boost. Expect a response within 24
                            hours from our professional boosters.
                        </p>
                    </div>

                    <div className="grid gap-6 mt-4">
                        <Link
                            href="mailto:support@airwick.gg"
                            className="group flex items-center gap-4 p-5 rounded-2xl bg-surface-dark border border-white/5 hover:border-primary/50 transition-all duration-300"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <span className="material-symbols-outlined">mail</span>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mb-1">Email Us</p>
                                <p className="text-lg font-bold tracking-tight">support@airwick.gg</p>
                            </div>
                        </Link>

                        <div className="flex items-center gap-4 p-5 rounded-2xl bg-surface-dark border border-white/5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary animate-pulse">
                                <span className="material-symbols-outlined font-bold">bolt</span>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mb-1">Average Response</p>
                                <p className="text-lg font-bold tracking-tight">&lt; 15 Minutes</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] mb-1">Connect With Us</p>
                        <div className="flex gap-4">
                            {[
                                { icon: 'forum', href: '#' },
                                { icon: 'share', href: '#' },
                                { icon: 'videogame_asset', href: '#' }
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="h-12 w-12 flex items-center justify-center rounded-xl bg-surface-dark border border-white/5 hover:bg-primary transition-all duration-300 group shadow-lg"
                                >
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-white transition-colors">{social.icon}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section: Contact Form */}
                <div className="lg:col-span-7 bg-surface-dark p-8 lg:p-12 rounded-4xl border border-white/5 relative overflow-hidden shadow-2xl backdrop-blur-md">
                    {/* Decorative Glow Background */}
                    <div className="absolute -top-32 -right-32 h-80 w-80 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute -bottom-32 -left-32 h-64 w-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

                    <form className="relative z-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                <input
                                    className="w-full bg-background-dark/50 border border-white/10 rounded-xl px-5 py-4 text-slate-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600 font-bold"
                                    placeholder="John Doe"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                <input
                                    className="w-full bg-background-dark/50 border border-white/10 rounded-xl px-5 py-4 text-slate-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600 font-bold"
                                    placeholder="john@example.com"
                                    type="email"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                                <input
                                    className="w-full bg-background-dark/50 border border-white/10 rounded-xl px-5 py-4 text-slate-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600 font-bold"
                                    placeholder="+1 (555) 000-0000"
                                    type="tel"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                                <div className="relative">
                                    <select className="w-full bg-background-dark/50 border border-white/10 rounded-xl px-5 py-4 text-slate-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer font-bold">
                                        <option value="general">General Inquiry</option>
                                        <option value="boosting">Boosting Status</option>
                                        <option value="payment">Payment Issues</option>
                                        <option value="partnership">Partnership</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">unfold_more</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                            <textarea
                                className="w-full bg-background-dark/50 border border-white/10 rounded-xl px-5 py-4 text-slate-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600 resize-none font-bold"
                                placeholder="Tell us more about your request..."
                                rows={5}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                className="w-full py-5 px-8 bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-[0.25em] text-xs rounded-xl transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(175,18,37,0.6)] hover:shadow-[0_20px_40px_-5px_rgba(175,18,37,0.7)] hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
                                type="submit"
                            >
                                <span>Send Message</span>
                                <span className="material-symbols-outlined text-base">send</span>
                            </button>
                        </div>

                        <p className="text-center text-[10px] text-slate-500 pt-2 font-bold uppercase tracking-widest">
                            By submitting this form, you agree to our
                            <Link href="/privacy" className="text-primary hover:underline ml-1">Privacy Policy</Link>
                            and
                            <Link href="/terms" className="text-primary hover:underline ml-1">Terms of Service</Link>.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
