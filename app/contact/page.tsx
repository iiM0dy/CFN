"use client"

import Link from "next/link"

export default function ContactPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen py-24 flex items-center justify-center p-6 lg:px-10">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Section: Information & Socials */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-primary mb-2">
                            <span className="h-1 w-12 bg-primary rounded-full"></span>
                            <span className="text-sm font-bold uppercase tracking-widest">Elite Support</span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tighter dark:text-white">
                            Get in <span className="text-primary">Touch</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-md leading-relaxed font-medium">
                            Our elite support team is ready to assist you with your gaming boost. Expect a response within 24
                            hours from our professional boosters.
                        </p>
                    </div>

                    <div className="grid gap-6 mt-4">
                        <Link
                            href="mailto:support@airwick.gg"
                            className="group flex items-center gap-4 p-4 rounded-xl bg-surface-dark border border-border-dark hover:border-primary/50 transition-colors"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                <span className="material-symbols-outlined">mail</span>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email Us</p>
                                <p className="text-lg font-medium">support@airwick.gg</p>
                            </div>
                        </Link>

                        <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-dark border border-border-dark">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">bolt</span>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Average Response</p>
                                <p className="text-lg font-medium">&lt; 15 Minutes</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Connect With Us</p>
                        <div className="flex gap-4">
                            {[
                                { icon: 'forum', href: '#' },
                                { icon: 'share', href: '#' },
                                { icon: 'videogame_asset', href: '#' }
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="h-12 w-12 flex items-center justify-center rounded-lg bg-surface-dark border border-border-dark hover:bg-primary transition-all group"
                                >
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-white">{social.icon}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section: Contact Form */}
                <div className="lg:col-span-7 bg-surface-dark p-8 lg:p-10 rounded-2xl border border-border-dark relative overflow-hidden">
                    {/* Decorative Glow Background */}
                    <div className="absolute -top-24 -right-24 h-64 w-64 bg-primary/10 blur-[100px] rounded-full"></div>

                    <form className="relative z-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-300">Full Name</label>
                                <input
                                    className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-primary input-focus transition-all placeholder:text-slate-600"
                                    placeholder="John Doe"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-300">Email Address</label>
                                <input
                                    className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-primary input-focus transition-all placeholder:text-slate-600"
                                    placeholder="john@example.com"
                                    type="email"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-300">Phone Number</label>
                                <input
                                    className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-primary input-focus transition-all placeholder:text-slate-600"
                                    placeholder="+1 (555) 000-0000"
                                    type="tel"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-300">Subject</label>
                                <div className="relative">
                                    <select className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-primary input-focus transition-all appearance-none cursor-pointer">
                                        <option value="general">General Inquiry</option>
                                        <option value="boosting">Boosting Status</option>
                                        <option value="payment">Payment Issues</option>
                                        <option value="partnership">Partnership</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">unfold_more</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300">Your Message</label>
                            <textarea
                                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-primary input-focus transition-all placeholder:text-slate-600 resize-none"
                                placeholder="Tell us more about your request..."
                                rows={5}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                className="w-full py-4 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all glow-button flex items-center justify-center gap-2"
                                type="submit"
                            >
                                <span>Send Message</span>
                                <span className="material-symbols-outlined text-sm">send</span>
                            </button>
                        </div>

                        <p className="text-center text-xs text-slate-500 pt-2">
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
