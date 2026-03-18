"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function CheckoutSuccessPage() {
    useEffect(() => {
        // Clear any temporary checkout data
        localStorage.removeItem('direct_checkout');
    }, []);

    return (
        <div className="bg-[#050505] text-white min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,rgba(175,18,37,0.05)_0%,transparent_50%)]">
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="max-w-xl w-full bg-[#0D0D0D] border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center shadow-[0_32px_120px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-transparent via-primary/40 to-transparent"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-[80px] rounded-full"></div>

                <div className="size-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-10 text-primary shadow-[0_0_40px_rgba(175,18,37,0.15)] relative">
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                        className="material-symbols-outlined text-6xl"
                    >
                        verified
                    </motion.span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Payment <span className="text-primary">Confirmed</span></h1>
                <p className="text-slate-400 text-base font-medium leading-relaxed mb-12 max-w-md mx-auto">
                    Your order has been received and is being processed by our team. You'll receive a confirmation email shortly.
                </p>

                {/* What's Next Section */}
                <div className="bg-white/5 border border-white/5 rounded-3xl p-6 mb-12 text-left space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-2">
                        <span className="h-px w-4 bg-primary"></span>
                        What happens next?
                    </h3>

                    <div className="flex gap-4 items-start">
                        <div className="size-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-sm text-slate-400">mail</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white mb-0.5 uppercase tracking-wide">Check your Email</p>
                            <p className="text-[11px] text-slate-500 font-medium">We've sent your order details and instructions to your inbox.</p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start border-t border-white/5 pt-4">
                        <div className="size-8 rounded-full bg-[#5865F2]/10 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-sm text-[#5865F2]">hub</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white mb-0.5 uppercase tracking-wide">Join our Discord</p>
                            <p className="text-[11px] text-slate-500 font-medium">For real-time updates and faster communication with our boosters.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center justify-center gap-2 py-5 bg-primary text-white font-bold rounded-2xl hover:bg-[#8a0e1d] transition-all uppercase tracking-widest text-[11px] shadow-lg shadow-primary/20"
                    >
                        <span>Track Order</span>
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 py-5 bg-white/5 text-slate-300 font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-[11px] border border-white/5"
                    >
                        <span>Back to Store</span>
                    </Link>
                </div>

                <p className="mt-10 text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
                    Thank you for choosing <span className="text-primary font-black">CFN</span><span className="text-white font-black">BOOST</span>
                </p>
            </motion.div>
        </div>
    );
}
