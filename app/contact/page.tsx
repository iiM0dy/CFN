"use client";

import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="bg-[#211113] text-white min-h-screen flex flex-col font-[family-name:var(--font-space-grotesk)]">
            
            <main className="flex-1 flex flex-col items-center w-full px-6 py-8 lg:py-12">
                <div className="w-full max-w-7xl flex flex-col gap-10">
                    {/* Hero Section */}
                    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                        <div className="flex flex-col gap-3 max-w-2xl">
                            <h1 className="text-white text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight">
                                Need backup? <br /><span className="text-primary">We&apos;re here.</span>
                            </h1>
                            <p className="text-gray-400 text-lg font-normal leading-normal max-w-lg mt-2">
                                Our elite support team is online 24/7. Connect with a pro-gamer support specialist instantly.
                            </p>
                        </div>
                        {/* Stats Grid */}
                        <div className="flex gap-4 flex-wrap sm:flex-nowrap w-full md:w-auto mt-4 md:mt-0">
                            <div className="flex flex-1 min-w-[140px] flex-col gap-1 rounded-xl p-5 bg-[#2d1b1e] border border-[#4a2b2f]/50">
                                <div className="flex items-center gap-2 mb-1">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Avg Response</p>
                                </div>
                                <p className="text-white text-2xl font-bold leading-none">2 mins</p>
                            </div>
                            <div className="flex flex-1 min-w-[140px] flex-col gap-1 rounded-xl p-5 bg-[#2d1b1e] border border-[#4a2b2f]/50">
                                <div className="flex items-center gap-2 mb-1">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Agents Online</p>
                                </div>
                                <p className="text-white text-2xl font-bold leading-none">12</p>
                            </div>
                            <div className="flex flex-1 min-w-[140px] flex-col gap-1 rounded-xl p-5 bg-[#2d1b1e] border border-[#4a2b2f]/50">
                                <div className="flex items-center gap-2 mb-1">
                                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                                    <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Satisfaction</p>
                                </div>
                                <p className="text-white text-2xl font-bold leading-none">99%</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Split Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                        {/* Left: Contact Form */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <div className="p-8 rounded-2xl bg-[#2d1b1e]/50 border border-white/5 backdrop-blur-sm">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                                    Submit a Ticket
                                </h2>
                                <form className="flex flex-col gap-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <label className="flex flex-col gap-2">
                                            <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Gamertag / Name</span>
                                            <input className="w-full bg-[#211113] border border-[#4a2b2f] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200" placeholder="e.g. Faker" type="text" />
                                        </label>
                                        <label className="flex flex-col gap-2">
                                            <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Email Address</span>
                                            <input className="w-full bg-[#211113] border border-[#4a2b2f] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200" placeholder="you@example.com" type="email" />
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <label className="flex flex-col gap-2">
                                            <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Order ID (Optional)</span>
                                            <input className="w-full bg-[#211113] border border-[#4a2b2f] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200" placeholder="#AW-10293" type="text" />
                                        </label>
                                        <label className="flex flex-col gap-2">
                                            <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Topic</span>
                                            <div className="relative">
                                                <select className="w-full appearance-none bg-[#211113] border border-[#4a2b2f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200">
                                                    <option>Boosting Issue</option>
                                                    <option>Payment Inquiry</option>
                                                    <option>General Question</option>
                                                    <option>Report a Bug</option>
                                                </select>
                                                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </label>
                                    </div>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Message</span>
                                        <textarea className="w-full bg-[#211113] border border-[#4a2b2f] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 resize-none" placeholder="Describe your issue in detail..." rows={5} />
                                    </label>
                                    <div className="pt-2">
                                        <button className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(175,18,37,0.3)] hover:shadow-[0_0_30px_rgba(175,18,37,0.5)] flex items-center justify-center gap-2" type="button">
                                            <span>Submit Ticket</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Business Inquiry Mini-Card */}
                            <div className="p-6 rounded-xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-[#2d1b1e] to-transparent">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Business Inquiries</h3>
                                    <p className="text-gray-400 text-sm">Looking for partnerships or bulk orders?</p>
                                </div>
                                <a className="text-primary hover:text-white font-medium flex items-center gap-2 transition-colors" href="mailto:partners@airwick.gg">
                                    partners@airwick.gg
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Right: Live Chat Simulation */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            <div className="flex flex-col h-full min-h-[500px] rounded-2xl bg-[#2d1b1e] border border-[#4a2b2f] overflow-hidden shadow-2xl relative">
                                {/* Chat Header */}
                                <div className="px-6 py-4 bg-[#38292b]/50 border-b border-white/5 flex items-center justify-between backdrop-blur-md sticky top-0 z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="size-10 rounded-full bg-gradient-to-br from-primary to-black p-[2px]">
                                                <div className="size-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                                    <div className="size-full rounded-full bg-cover bg-center opacity-80" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZgsNGkOpZpMLOCTXEVEsE3ee0OKIGXaVsh4-ExxhmNEXzmihYOGLRexG-jfuk5urY_QPtlsSBFcDBoqqOQnNJndpeddokFezT-7jPO-KD7BM8E99exdd0RJnsuMPVEX7IAgbAe4sQ8rfIhYKkUATO868p301tmlka0YzQym1-FynEEhHFoGA94A02OuKL3bWz1JLoicLddFGgn2ruAawNhE6FKnDWVwEvfdJisPzZ1v5wXwOtxUwvzdoHttz1OIEa2l8E7QYevBsV')` }} />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-[#2d1b1e] rounded-full animate-pulse" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-sm">Live Support</h3>
                                            <p className="text-green-400 text-xs font-medium flex items-center gap-1">
                                                <span className="size-1.5 rounded-full bg-green-500" /> Online Now
                                            </p>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-white transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /><circle cx="5" cy="12" r="2" /></svg>
                                    </button>
                                </div>

                                {/* Chat Body */}
                                <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto bg-gradient-to-b from-[#2d1b1e] to-[#211113]">
                                    <div className="text-center my-4">
                                        <span className="text-xs font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full">Today, 2:30 PM</span>
                                    </div>
                                    {/* System Message */}
                                    <div className="flex justify-center my-2">
                                        <p className="text-xs text-gray-500 italic flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                            Support Agent <span className="text-primary font-bold">V1per</span> joined the chat.
                                        </p>
                                    </div>
                                    {/* Agent Message */}
                                    <div className="flex gap-3 max-w-[85%]">
                                        <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="bg-[#38292b] p-3 rounded-2xl rounded-tl-none border border-[#4a2b2f] text-sm text-gray-200">
                                                <p>Welcome to Airwick support! 👋 I&apos;m here to help you get that rank you deserve. What can I do for you today?</p>
                                            </div>
                                            <span className="text-[10px] text-gray-500 ml-1">2:31 PM</span>
                                        </div>
                                    </div>
                                    {/* User Message */}
                                    <div className="flex flex-row-reverse gap-3 max-w-[85%] self-end">
                                        <div className="size-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        </div>
                                        <div className="flex flex-col gap-1 items-end">
                                            <div className="bg-primary p-3 rounded-2xl rounded-tr-none text-sm text-white shadow-lg shadow-primary/20">
                                                <p>Hi, I have a question about the Master Tier boost pricing.</p>
                                            </div>
                                            <span className="text-[10px] text-gray-500 mr-1">2:32 PM</span>
                                        </div>
                                    </div>
                                    {/* Typing Indicator */}
                                    <div className="flex gap-3 max-w-[85%] mt-2">
                                        <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                        </div>
                                        <div className="bg-[#38292b] px-4 py-3 rounded-2xl rounded-tl-none border border-[#4a2b2f] w-16 flex items-center gap-1">
                                            <div className="size-1.5 bg-gray-400 rounded-full animate-bounce" />
                                            <div className="size-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "75ms" }} />
                                            <div className="size-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Chat Input Area */}
                                <div className="p-4 border-t border-white/5 bg-[#211113] relative">
                                    <div className="absolute -top-12 left-0 w-full h-12 bg-gradient-to-t from-[#211113] to-transparent pointer-events-none" />
                                    <div className="relative flex items-center gap-2">
                                        <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                        </button>
                                        <input className="flex-1 bg-[#2d1b1e] border border-[#4a2b2f] rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Type your message..." type="text" />
                                        <button className="bg-primary hover:bg-red-700 text-white p-2.5 rounded-full transition-colors shadow-lg shadow-primary/20 flex items-center justify-center">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Quick Link */}
                            <Link href="/faq" className="p-6 rounded-xl border border-white/5 bg-[#2d1b1e]/30 hover:bg-[#2d1b1e]/50 transition-colors group cursor-pointer block">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Help Center</h4>
                                            <p className="text-xs text-gray-400">Browse FAQs and guides before asking.</p>
                                        </div>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-[#211113] py-8 px-6 mt-12">
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <span>© 2024 Airwick. All rights reserved.</span>
                    </div>
                    <div className="flex gap-6">
                        <a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">Privacy Policy</a>
                        <a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">Terms of Service</a>
                        <a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">Refund Policy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
