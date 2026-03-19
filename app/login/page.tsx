"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { login, register } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CFNLogo } from "@/components/layout/cfnboost-logo";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [authError, setAuthError] = useState("");
    const [authSuccess, setAuthSuccess] = useState("");
    const router = useRouter();

    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<any>({
        resolver: zodResolver(isLogin ? LoginSchema : RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: any) => {
        setAuthError("");
        setAuthSuccess("");
        startTransition(async () => {
            if (isLogin) {
                const data = await login(values);
                if (data?.error) {
                    setAuthError(data.error);
                } else {
                    // NextAuth's signIn server action often leaves the client session cache stale on soft navigation.
                    // To guarantee the header (and other components) reflect the new session instantly,
                    // we perform a hard refresh redirect to the home page.
                    window.location.href = "/";
                }
            } else {
                const data = await register(values);
                if (data.error) {
                    setAuthError(data.error);
                } else {
                    setAuthSuccess(data.success || "Account created successfully.");
                    setIsLogin(true);
                    reset();
                }
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
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        {isLogin ? 'Sign in to access your account.' : 'Join us to get started.'}
                    </p>
                </div>

                {/* Main Form Container */}
                <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 shadow-2xl">
                    {/* Auth Switcher */}
                    <div className="flex p-1 bg-white/3 border border-white/5 rounded-2xl mb-6">
                        <button
                            onClick={() => { setIsLogin(true); reset(); setAuthError(""); setAuthSuccess(""); }}
                            className={`flex-1 py-3 text-[14px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${isLogin ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-500 hover:text-white'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => { setIsLogin(false); reset(); setAuthError(""); setAuthSuccess(""); }}
                            className={`flex-1 py-3 text-[14px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${!isLogin ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-500 hover:text-white'}`}
                        >
                            Register
                        </button>
                    </div>

                    <AnimatePresence>
                        {authError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
                            >
                                <span className="material-symbols-outlined text-red-500 text-lg shrink-0">error</span>
                                <p className="text-[14px] text-red-400 font-medium leading-relaxed mt-0.5">{authError}</p>
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
                                <p className="text-[14px] text-green-400 font-medium leading-relaxed mt-0.5">{authSuccess}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                        <div className="space-y-1.5">
                            <label className="text-[14px] font-black text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
                            <input
                                {...registerField("email")}
                                className="w-full bg-white/3 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-primary transition-all outline-none font-bold text-sm"
                                placeholder="name@email.com"
                                type="email"
                            />
                            {errors.email && <p className="text-[14px] text-primary font-black uppercase tracking-widest pl-1">{errors.email.message as string}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[14px] font-black text-slate-500 uppercase tracking-widest">Password</label>
                                {isLogin && <Link href="#" className="text-[14px] font-black text-primary uppercase tracking-widest hover:text-white transition-colors">Forgot?</Link>}
                            </div>
                            <div className="relative group">
                                <input
                                    {...registerField("password")}
                                    className="w-full bg-white/3 border border-white/5 rounded-2xl px-6 py-4 pr-14 text-white focus:border-primary transition-all outline-none font-bold text-sm"
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
                            {errors.password && <p className="text-[14px] text-primary font-black uppercase tracking-widest pl-1">{errors.password.message as string}</p>}
                        </div>

                        <AnimatePresence>
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-1.5 overflow-hidden"
                                >
                                    <label className="text-[14px] font-black text-slate-500 uppercase tracking-widest pl-1">Confirm Password</label>
                                    <input
                                        {...registerField("confirmPassword")}
                                        className="w-full bg-white/3 border border-white/5 rounded-3xl px-6 py-4 text-white focus:border-primary transition-all outline-none font-bold text-sm"
                                        placeholder="••••••••"
                                        type="password"
                                    />
                                    {errors.confirmPassword && <p className="text-[14px] text-primary font-black uppercase tracking-widest pl-1">{errors.confirmPassword.message as string}</p>}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            disabled={isPending}
                            className="w-full py-5 mt-4 bg-primary hover:bg-[#8a0e1d] text-white font-black uppercase tracking-[0.3em] rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 group"
                        >
                            {isPending ? (
                                <span className="size-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 flex flex-col items-center gap-2 opacity-30">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[14px]">verified_user</span>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Secure Connection</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Link */}
                <div className="mt-8 text-center">
                    <Link href="/" className="text-[14px] font-black text-slate-500 uppercase tracking-widest hover:text-primary transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">west</span>
                        Return to Homepage
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}
