"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { toast } from "sonner";

export function CheckoutSuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [orderId, setOrderId] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();

    useEffect(() => {
        // Clear any temporary checkout data
        localStorage.removeItem('direct_checkout');

        if (sessionId) {
            fetch(`/api/checkout/retrieve-session?sessionId=${sessionId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        toast.error("Retrieve error: " + data.error);
                    }
                    if (data.orderId) setOrderId(data.orderId);
                    if (data.email) setEmail(data.email);

                    if (!data.orderId) {
                        toast.warning("Missing orderId in session data");
                    }
                    if (!data.email) {
                        toast.warning("Missing email in session data");
                    }

                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to retrieve session", err);
                    toast.error("Fetch failed: " + err.message);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [sessionId]);

    // Auto-login logic moved to pre-checkout (services page)

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
                
                {(!session || (session.user as any)?.hasPassword === false) && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-6 mb-12 text-left flex items-center gap-5 relative overflow-hidden group hover:bg-emerald-500/15 hover:border-emerald-500/30 transition-all duration-300"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-[40px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all duration-300"></div>
                        <div className="size-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0 shadow-lg shadow-emerald-500/10 border border-emerald-500/20 relative z-10 group-hover:scale-105 transition-transform duration-300">
                            <span className="material-symbols-outlined text-3xl">add_moderator</span>
                        </div>
                        <div className="flex-1 relative z-10">
                            <h4 className="text-[14px] font-black text-white uppercase tracking-widest leading-none mb-1.5 flex items-center gap-2">
                                Complete Account Setup
                                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </h4>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                                Please set a password for your new account to secure your orders and access your dashboard.
                            </p>
                            <Link href="/dashboard" className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-black text-emerald-400 uppercase tracking-[0.2em] hover:text-emerald-300 transition-colors group/link">
                                GO TO DASHBOARD
                                <span className="material-symbols-outlined text-xs group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </motion.div>
                )}

                {/* What's Next Section */}
                <div className="bg-white/5 border border-white/5 rounded-3xl p-6 mb-12 text-left space-y-4">
                    <h3 className="text-[12px] font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-2">
                        <span className="h-px w-4 bg-primary"></span>
                        What happens next?
                    </h3>

                    <div className="flex gap-4 items-start">
                        <div className="size-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-sm text-slate-400">mail</span>
                        </div>
                        <div>
                            <p className="text-[12px] font-bold text-white mb-0.5 uppercase tracking-wide">Check your Email</p>
                            <p className="text-[12px] text-slate-500 font-medium">We've sent your order details and instructions to your inbox.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        href={orderId ? `/track-order/${orderId}${email ? `?email=${encodeURIComponent(email)}` : ''}` : "/track-order"}
                        className="flex items-center justify-center gap-2 py-5 bg-primary text-white font-bold rounded-2xl hover:bg-[#8a0e1d] transition-all uppercase tracking-widest text-[12px] shadow-lg shadow-primary/20"
                    >
                        <span>Track Order</span>
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 py-5 bg-white/5 text-slate-300 font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-[12px] border border-white/5"
                    >
                        <span>Back to Store</span>
                    </Link>
                </div>

                <p className="mt-10 text-[12px] text-slate-600 font-bold uppercase tracking-[0.2em]">
                    Thank you for choosing <span className="text-primary font-black">CFN</span><span className="text-white font-black">BOOST</span>
                </p>
            </motion.div>
        </div>
    );
}