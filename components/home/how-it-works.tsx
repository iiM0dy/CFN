"use client"

export function HowItWorks() {
    return (
        <section className="py-20 bg-[#0B0B0B]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
                    <p className="text-gray-400 text-lg">Get started in three simple steps</p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-[#2A2A2A] z-0" />

                    {/* Step 1 */}
                    <div className="relative z-10 flex flex-col items-center text-center group">
                        <div className="size-24 rounded-full bg-[#151515] border-2 border-[#2A2A2A] group-hover:border-primary transition-colors flex items-center justify-center mb-6 shadow-xl">
                            <svg className="size-10 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">1. Select Service</h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">Choose your game, current rank, and desired goals. Customize with add-ons like duo-queue or specific agents.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative z-10 flex flex-col items-center text-center group">
                        <div className="size-24 rounded-full bg-[#151515] border-2 border-[#2A2A2A] group-hover:border-primary transition-colors flex items-center justify-center mb-6 shadow-xl">
                            <svg className="size-10 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">2. Secure Checkout</h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">Complete your payment through our encrypted gateway. Your order is instantly pushed to our elite boosters.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative z-10 flex flex-col items-center text-center group">
                        <div className="size-24 rounded-full bg-[#151515] border-2 border-[#2A2A2A] group-hover:border-primary transition-colors flex items-center justify-center mb-6 shadow-xl">
                            <svg className="size-10 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">3. Rank Up Fast</h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">Track your order in real-time. Watch your rank soar or play alongside a pro to learn while winning.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
