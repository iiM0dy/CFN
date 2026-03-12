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
            name: "",
        },
    });

    const onSubmit = (values: any) => {
        startTransition(() => {
            if (isLogin) {
                login(values).then((data) => {
                    if (data?.error) {
                        toast.error(data.error);
                    } else {
                        router.push("/");
                    }
                });
            } else {
                register(values).then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    } else {
                        toast.success(data.success);
                        setIsLogin(true);
                        reset();
                    }
                });
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
                        {isLogin ? 'Access Portal' : 'Join the Elite'}
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        {isLogin ? 'Enter your credentials to proceed.' : 'Initialize your professional account.'}
                    </p>
                </div>

                {/* Main Form Container */}
                <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 shadow-2xl">
                    {/* Auth Switcher */}
                    <div className="flex p-1 bg-white/[0.03] border border-white/5 rounded-2xl mb-8">
                        <button
                            onClick={() => { setIsLogin(true); reset(); }}
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${isLogin ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-500 hover:text-white'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => { setIsLogin(false); reset(); }}
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${!isLogin ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-500 hover:text-white'}`}
                        >
                            Register
                        </button>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-1.5 overflow-hidden"
                                >
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
                                    <input
                                        {...registerField("name")}
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-primary transition-all outline-none font-bold text-sm"
                                        placeholder="John Wick"
                                        type="text"
                                    />
                                    {errors.name && <p className="text-[10px] text-primary font-black uppercase tracking-widest pl-1">{errors.name.message as string}</p>}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
                            <input
                                {...registerField("email")}
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-primary transition-all outline-none font-bold text-sm"
                                placeholder="name@email.com"
                                type="email"
                            />
                            {errors.email && <p className="text-[10px] text-primary font-black uppercase tracking-widest pl-1">{errors.email.message as string}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password</label>
                                {isLogin && <Link href="#" className="text-[10px] font-black text-primary uppercase tracking-widest hover:text-white transition-colors">Forgot?</Link>}
                            </div>
                            <div className="relative group">
                                <input
                                    {...registerField("password")}
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
                            {errors.password && <p className="text-[10px] text-primary font-black uppercase tracking-widest pl-1">{errors.password.message as string}</p>}
                        </div>

                        <AnimatePresence>
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-1.5 overflow-hidden"
                                >
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Confirm Password</label>
                                    <input
                                        {...registerField("confirmPassword")}
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-primary transition-all outline-none font-bold text-sm"
                                        placeholder="••••••••"
                                        type="password"
                                    />
                                    {errors.confirmPassword && <p className="text-[10px] text-primary font-black uppercase tracking-widest pl-1">{errors.confirmPassword.message as string}</p>}
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
                            <span className="material-symbols-outlined text-[12px]">verified_user</span>
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white">Encrypted Pipeline</span>
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
