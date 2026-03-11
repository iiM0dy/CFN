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

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
                        // toast.success("Logged in successfully!");
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
        <div className="bg-[#0B0B0B] text-white min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Ambient Red Glow Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(175,18,37,0.15)_0%,rgba(11,11,11,0)_70%)] pointer-events-none z-0" />
            {/* Decorative geometric elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-[1100px] h-auto min-h-[650px] bg-[#131313] border border-[#2A2A2A] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
                {/* Left Pane: Visuals */}
                <div className="relative hidden md:flex w-full md:w-5/12 flex-col justify-between p-10 overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            alt="Dark competitive esports arena with neon lights"
                            className="w-full h-full object-cover opacity-60"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbLAEJDGoYJ7B22Hplhi_tWISXJIpMQZWXF2ycTy6K4gGGNSCObQ21vVc4_Kcql68-rr5VY0Nq9dGn8XJk1Cd6EbXrdnO6h6el3a1kIgGLFvEaricE7kVaThiumvflzNLGWO8L5IjuhoyCl_0QiWGgRR4Wgw4_dXucY0RTRAYlbKpVQ9G6G5ccSl0ppRQuleGy2skrdII4uzl5JkBqJd97JVxw7uuE--Rs71EnqJawJp_HLB_7pvOmxAHr5LToqo6gC58yiuuWBo7F"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#131313]/40 via-[#131313]/60 to-[#131313]" />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                    </div>
                    {/* Content on top of image */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-8">
                            <span className="material-symbols-outlined text-primary text-3xl">sports_esports</span>
                            <span className="font-bold text-xl tracking-wider">CFNboost</span>
                        </div>
                    </div>
                    <div className="relative z-10 mt-auto">
                        <h1 className="text-4xl font-bold leading-tight mb-4 text-glow">
                            Dominate <br />
                            <span className="text-primary">The Ladder.</span>
                        </h1>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
                            Join the premier marketplace for elite boosting services. Secure, fast, and strictly confidential.
                        </p>
                        {/* Testimonial / Social Proof */}
                        <div className="flex items-center gap-4 p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/5">
                            <div className="flex -space-x-2">
                                <img alt="Avatar user 1" className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4rm781PhbAGRAoH9JT57GS6n4kymzvy0yBGi_8fOMSxJ3LGANgsE2inf9mXip59KskRVXc3wyQdhb5Kv4lyRIJFhp38V7MGWLZa1EM1O8JRjIKFykp4YP1rntqiYiEXhXFiwf97vEGSNkKp_F4jvcEmAkIFyAx-oXnzdtqEIHkaOSvX7vwGYH6oxuYY2SGAY87TX2RR3jWJL7aEmx0QAEBO6cXXwr8Xyrza3kWhTHntHh7Z1gxQu9RDFAQfMav93mFTFvgKX_6cqj" />
                                <img alt="Avatar user 2" className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNFlOdvBvEC634X7RJiy8n-tkwD4p2jlPeK0cuLzG8qBuQwPbjt6GF2b6bsAKGw1Wo3RUZGfBIdKOmzyNiMA6O-dKvuRDo3rweh7lncI_bYAT8GzHcKuNWORfJopRRhGt4K8-PkAz_WBCH2IzrxnHUfsWJ8Pe8ZjqK26YITqWvGdDa7-EmqLpsYgPxETNfgVq3ayPNrQaOlHbHb_tzNjCTddk1QCKJV0B2tr3YJIOYNysUvy0SXpU8JrnxFmEhlYwcVqzMxH5xV2m3" />
                                <img alt="Avatar user 3" className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3fwJyOBfSg2xAgX9zlWI5iYQ7aljZ8iMhyRfvgOi7GN-SJVdxKnmvuV8BiZx1BrUSoh8iGcA89I9VKkE6DUnO5CGDQXYXxByDezL4Fw4b0KB-V2CjUFtcEQI-Mr4QI7Gfk5dK6JHJOiKsMEongwQYyNC2JNsfKB1RK4FytkvDLOya67vC_6gzSV5IYptkKejnjiDHVMDe1UJ2Qq08R20K9-z62zKkS6zc8qV1e6AAAtM1TIG8cTDp2JVh1GeTPx3NM07sl5pTDhM1" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex text-yellow-500 text-[10px]">
                                    <span className="material-symbols-outlined text-[14px]">star</span>
                                    <span className="material-symbols-outlined text-[14px]">star</span>
                                    <span className="material-symbols-outlined text-[14px]">star</span>
                                    <span className="material-symbols-outlined text-[14px]">star</span>
                                    <span className="material-symbols-outlined text-[14px]">star</span>
                                </div>
                                <span className="text-xs text-gray-300 font-medium">10k+ Boosts Completed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Pane: Login Form */}
                <div className="w-full md:w-7/12 bg-[#131313] flex flex-col p-8 md:p-12 lg:p-16 justify-center">
                    {/* Mobile Header Logo */}
                    <div className="md:hidden flex items-center justify-center gap-2 mb-8 text-white">
                        <span className="material-symbols-outlined text-primary text-3xl">sports_esports</span>
                        <span className="font-bold text-xl tracking-wider">CFNboost</span>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex w-full mb-10 bg-[#1E1E1E] p-1 rounded-lg">
                        <button
                            onClick={() => { setIsLogin(true); reset(); }}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${isLogin ? 'bg-[#131313] text-white shadow-sm border border-[#2A2A2A]/50' : 'text-gray-400 hover:text-white'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => { setIsLogin(false); reset(); }}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${!isLogin ? 'bg-[#131313] text-white shadow-sm border border-[#2A2A2A]/50' : 'text-gray-400 hover:text-white'}`}
                        >
                            Register
                        </button>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                        <p className="text-gray-400 text-sm">{isLogin ? 'Enter your credentials to access your dashboard.' : 'Sign up to start your boosting journey.'}</p>
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                        {/* Name Field (Register Only) */}
                        {!isLogin && (
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1" htmlFor="name">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors text-[20px]">person</span>
                                    </div>
                                    <input
                                        {...registerField("name")}
                                        className="block w-full pl-10 pr-3 py-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all sm:text-sm"
                                        id="name"
                                        placeholder="John Doe"
                                        type="text"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-xs text-red-500 mt-1">{errors.name.message as string}</p>
                                )}
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1" htmlFor="email">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors text-[20px]">mail</span>
                                </div>
                                <input
                                    {...registerField("email")}
                                    className="block w-full pl-10 pr-3 py-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all sm:text-sm"
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-1">{errors.email.message as string}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider" htmlFor="password">Password</label>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors text-[20px]">lock</span>
                                </div>
                                <input
                                    {...registerField("password")}
                                    className="block w-full pl-10 pr-10 py-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all sm:text-sm"
                                    id="password"
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                />
                                <button
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        {showPassword ? "visibility" : "visibility_off"}
                                    </span>
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1">{errors.password.message as string}</p>
                            )}
                        </div>

                        {/* Confirm Password Field (Register Only) */}
                        {/* {!isLogin && (
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider" htmlFor="confirm-password">Confirm Password</label>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-gray-500 group-focus-within:text-primary transition-colors text-[20px]">lock_reset</span>
                                    </div>
                                    <input 
                                        className="block w-full pl-10 pr-10 py-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all sm:text-sm" 
                                        id="confirm-password" 
                                        placeholder="••••••••" 
                                        type={showConfirmPassword ? "text" : "password"} 
                                    />
                                    <button 
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors" 
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {showConfirmPassword ? "visibility" : "visibility_off"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )} */}

                        {/* Remember Me & Forgot Password (Login Only) */}
                        {isLogin && (
                            <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center">
                                    <input className="h-4 w-4 rounded border-[#2A2A2A] bg-[#1E1E1E] text-primary focus:ring-offset-[#131313] focus:ring-primary" id="remember-me" name="remember-me" type="checkbox" />
                                    <label className="ml-2 block text-sm text-gray-400 select-none whitespace-nowrap" htmlFor="remember-me">Remember me</label>
                                </div>
                                <div className="text-sm">
                                    <a className="font-medium text-primary hover:text-red-400 transition-colors whitespace-nowrap" href="#">Forgot password?</a>
                                </div>
                            </div>
                        )}

                        {/* Terms of Service Checkbox (Register Only) */}
                        {!isLogin && (
                            <div className="flex items-center mt-1">
                                <input className="h-4 w-4 rounded border-[#2A2A2A] bg-[#1E1E1E] text-primary focus:ring-offset-[#131313] focus:ring-primary" id="terms" name="terms" type="checkbox" />
                                <label className="ml-2 block text-sm text-gray-400 select-none" htmlFor="terms">
                                    I agree to the <a href="#" className="text-primary hover:text-red-400">Terms of Service</a>
                                </label>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            disabled={isPending}
                            className="mt-4 w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-[#7d0b19] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#131313] focus:ring-primary transition-all duration-200 shadow-[0_0_15px_rgba(175,18,37,0.5)] hover:shadow-[0_0_25px_rgba(175,18,37,0.7)] disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                        >
                            {isPending ? "Loading..." : (isLogin ? 'Sign In' : 'Create Account')}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#2A2A2A]" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#131313] text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="mt-8 grid grid-cols-3 gap-3">
                        <a className="flex justify-center items-center py-2.5 px-4 border border-[#2A2A2A] rounded-lg bg-[#1E1E1E] hover:bg-[#252525] hover:border-gray-600 transition-all group" href="#">
                            <img alt="Google" className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8PdUd1KLuCsFOeX4Huh6J3jyNl0uFZE3Ugie3bS9XIvDgBZiyytMpZoz4aS0TZmQoOXXvAOd_THrsmhEPdX5JrLhLjJQKrsqLBywScg5YRrl23mQzR71cfYLFF0RCdW7c34uq56jLWPuwfgg-IkSZyyk4XYia9FTMCmAEjw4KyhOO7r0SXLT6ou_JNuasEzbHivpDee9StEUT4qaLlVjGC8V0q1yThdPizF-w9xk6RYa-qNmEoEmu2YlQMYB7tbyC-9pNlgJbFait" />
                        </a>
                        <a className="flex justify-center items-center py-2.5 px-4 border border-[#2A2A2A] rounded-lg bg-[#1E1E1E] hover:bg-[#5865F2] hover:border-[#5865F2] hover:text-white transition-all group" href="#">
                            <img alt="Discord" className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi5Tl4b1ceftbUK2ePDUEAXPvPeyp9XgHhEjJb1izeSeWFTnhIeFUzRlIU4iCxYCKrj8HRDI3v-yYgKD7qBC3wavhMTVkgMPMa8Xy2NhvYZyOzjlCWUI4Kx948WK5u3fz50CS8Sm2sLH0uJTwION2ubXBRbbbZLAInJfkrylGe_9y0cD0bKhBlu9_65E6K44YC2LzXXyfvXR1ITZG372E04fD6km_wnOuynH1V9ArCM5xA4E6ysGmGcrjCTficJNWjMxVSjr9rPvga" />
                        </a>
                        <a className="flex justify-center items-center py-2.5 px-4 border border-[#2A2A2A] rounded-lg bg-[#1E1E1E] hover:bg-[#171a21] hover:border-gray-500 transition-all group" href="#">
                            <img alt="Steam" className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRk-AshHQ8XNQdfN9JOzSOnt7ikRs7CkEfbCK9KvYye4UGzuruoFyEn29ron751_JV1QTWWFJG17RvODFKnCqoLd_xPXIRqlL6Q_nIH16iMlRA9xKwvzBX0BHI1fEZQIO54gdHgMbjSTx5-jF94dbGrDHK7Km-mB0ZAVwsopCFi0EavUPUJQh3cCaGw0Gwerqu40L1eWJHm1ZvkwDuFDVjBxCFf71ethwmqz-DAGrIUb2pB9sIwH2srniMJy7SA_7dNvOGwZpDINnj" />
                        </a>
                    </div>

                    {/* Secure Badge */}
                    <div className="mt-8 flex justify-center items-center gap-1.5 text-xs text-gray-600 opacity-60 w-full text-center">
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                        <span>Secure SSL Encryption</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
