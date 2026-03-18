"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import { CFNLogo } from "@/components/layout/cfnboost-logo";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        startTransition(async () => {
            try {
                const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (result?.error) {
                    toast.error("Invalid credentials or insufficient permissions");
                } else {
                    toast.success("Welcome back, Commander");
                    router.push("/admin");
                }
            } catch (error) {
                toast.error("An error occurred during authentication");
            }
        });
    };

    return (
        <main className="bg-[#050505] text-white min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Minimal Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Simplified Auth Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <Link href="/" className="inline-block mb-6 group">
                        <CFNLogo className="size-14 text-primary group-hover:scale-110 transition-transform duration-500" />
                    </Link>
                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2 leading-none">
                        Secure Terminal
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        Restricted Personnel Only. Authorized Use.
                    </p>
                </div>

                {/* Main Form Container */}
                <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 shadow-2xl">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Admin Email</label>
                            <input
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-primary transition-all outline-none font-bold text-sm"
                                placeholder="admin@cfnboost.com"
                                type="email"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Access Protocol (Password)</label>
                            </div>
                            <div className="relative group">
                                <input
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 pr-14 text-white focus:border-primary transition-all outline-none font-bold text-sm"
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">{showPassword ? "visibility" : "visibility_off"}</span>
                                </button>
                            </div>
                        </div>

                        <button
                            disabled={isPending}
                            className="w-full py-5 mt-4 bg-primary hover:bg-[#8a0e1d] text-white font-black uppercase tracking-[0.3em] rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 group"
                        >
                            {isPending ? (
                                <span className="size-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Authorize Access
                                    <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 flex flex-col items-center gap-2 opacity-30">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[12px]">verified_user</span>
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white">Authorized Logging Active</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Link */}
                <div className="mt-8 text-center">
                    <Link href="/" className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-primary transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">west</span>
                        Return to Homepage
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}
