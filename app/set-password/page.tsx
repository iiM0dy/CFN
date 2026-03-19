"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CFNLogo } from "@/components/layout/cfnboost-logo";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

export default function SetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [authError, setAuthError] = useState("");
    const [authSuccess, setAuthSuccess] = useState("");
    
    const router = useRouter();
    const { data: session, status, update } = useSession();

    // Redirect logic
    if (status === "unauthenticated") {
        typeof window !== "undefined" && router.push("/login");
        return null;
    }
    
    // @ts-ignore
    if (session?.user?.hasPassword) {
        typeof window !== "undefined" && router.push("/");
        return null;
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError("");
        setAuthSuccess("");

        if (password.length < 6) {
            setAuthError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setAuthError("Passwords do not match.");
            return;
        }

        startTransition(async () => {
            try {
                const res = await fetch("/api/auth/set-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password })
                });

                const data = await res.json();
                
                if (!res.ok) {
                    setAuthError(data.error || "Failed to set password.");
                } else {
                    setAuthSuccess("Password set successfully! Redirecting...");
                    await update({ hasPassword: true });
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1500);
                }
            } catch (err) {
                setAuthError("An unexpected error occurred.");
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
                        Secure Account
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        Create a password to access your account anytime.
                    </p>
                </div>

                {/* Main Form Container */}
                <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 shadow-2xl">
                    <AnimatePresence>
                        {authError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
                            >
                                <span className="material-symbols-outlined text-red-500 text-lg shrink-0">error</span>
                                <p className="text-xs text-red-400 font-medium leading-relaxed mt-0.5">{authError}</p>
                            </motion.div>
                        )}
                        {authSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3"
                            >
                                <span className="material-symbols-outlined text-green-500 text-lg shrink-0">check_circle</span>
                                <p className="text-xs text-green-400 font-medium leading-relaxed mt-0.5">{authSuccess}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form className="space-y-5" onSubmit={onSubmit}>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Email</label>
                            <input
                                disabled
                                value={session?.user?.email || "Loading..."}
                                className="w-full bg-white/[0.01] border border-white/5 rounded-2xl px-6 py-4 text-slate-500 outline-none font-bold text-sm cursor-not-allowed"
                                type="email"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">New Password</label>
                            <div className="relative group">
                                <input
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
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

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Confirm Password</label>
                            <input
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-primary transition-all outline-none font-bold text-sm"
                                placeholder="••••••••"
                                type="password"
                            />
                        </div>

                        <button
                            disabled={isPending}
                            type="submit"
                            className="w-full py-5 mt-4 bg-primary hover:bg-[#8a0e1d] text-white font-black uppercase tracking-[0.3em] rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 group"
                        >
                            {isPending ? (
                                <span className="size-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Save Password
                                    <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">save</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 flex flex-col items-center gap-2 opacity-30">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[12px]">verified_user</span>
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white">Secure Connection</span>
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
