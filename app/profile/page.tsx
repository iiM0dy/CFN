"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
    User, 
    Mail, 
    Shield, 
    Calendar, 
    Camera, 
    ChevronRight, 
    Loader2, 
    Check, 
    Bell,
    Lock,
    LogOut,
    KeyRound
} from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { updateProfile, changePassword } from "@/actions/user"

export default function ProfilePage() {
    const { data: session, status, update } = useSession()
    const router = useRouter()
    const [isSaving, setIsSaving] = useState(false)
    const [isPasswordSaving, setIsPasswordSaving] = useState(false)
    
    // Form states
    const [name, setName] = useState(session?.user?.name || "")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-[#080808] flex items-center justify-center">
                <Loader2 className="size-12 animate-spin text-primary" />
            </div>
        )
    }

    if (!session) {
        router.push("/login")
        return null
    }

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        
        try {
            const res = await updateProfile({ name })
            if (res.success) {
                toast.success("Profile updated")
                await update({ name })
            } else {
                toast.error(res.error || "Failed to update profile")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsSaving(false)
        }
    }

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match")
        }
        
        setIsPasswordSaving(true)
        try {
            const res = await changePassword({ 
                currentPassword: (session.user as any).hasPassword ? currentPassword : undefined, 
                newPassword 
            })
            if (res.success) {
                toast.success("Password changed successfully")
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")
                await update({ hasPassword: true })
            } else {
                toast.error(res.error || "Failed to change password")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsPasswordSaving(false)
        }
    }

    const memberSince = (session.user as any).createdAt 
        ? new Date((session.user as any).createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : "March 2024"

    return (
        <div className="min-h-screen bg-[#080808] text-white">
            <main className="max-w-[1280px] mx-auto px-6 py-12">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-slate-500 mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="size-3" />
                    <span className="text-white">Profile</span>
                </div>

                <div className="mb-10 text-center sm:text-left">
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">My Profile</h1>
                    <p className="text-slate-500 text-[14px] font-bold uppercase tracking-widest">Manage your account settings and credentials</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Panel */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-[#0D0D0D] border border-white/5 rounded-3xl p-8 text-center">
                            <div className="relative inline-block mb-6">
                                <div className="size-24 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center overflow-hidden">
                                    {session.user?.image ? (
                                        <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="size-10 text-slate-700" />
                                    )}
                                </div>
                                <button className="absolute -bottom-2 -right-2 size-8 bg-primary hover:bg-[#8a0e1d] text-white rounded-lg flex items-center justify-center border-4 border-[#0D0D0D] transition-transform shadow-xl">
                                    <Camera className="size-3.5" />
                                </button>
                            </div>

                            <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-1">
                                {session.user?.name || "Premium Member"}
                            </h2>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] mb-8 truncate">{session.user?.email}</p>

                            <div className="space-y-3 pt-4 border-t border-white/5">
                                <Link 
                                    href="/orders"
                                    className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-widest transition-all"
                                >
                                    My Orders
                                </Link>
                                <button 
                                    onClick={() => signOut()}
                                    className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center gap-3 text-[12px] font-black uppercase tracking-widest transition-all"
                                >
                                    <LogOut className="size-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#0D0D0D] border border-white/5 rounded-3xl p-8 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                                    <Shield className="size-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[14px] font-black text-white uppercase tracking-tight leading-tight">Status: Active</p>
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Verified Account</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                    <Calendar className="size-4 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-[14px] font-black text-white uppercase tracking-tight leading-tight">Member Since</p>
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{memberSince}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Info */}
                        <div className="bg-[#0D0D0D] border border-white/5 rounded-3xl p-8 sm:p-10">
                            <form onSubmit={handleUpdateProfile} className="space-y-8">
                                <h3 className="text-[14px] font-black text-white uppercase tracking-widest flex items-center gap-2 mb-6">
                                    <User className="size-4 text-primary" /> Basic Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                            className="w-full bg-white/3 border border-white/5 rounded-2xl p-4 text-white focus:border-primary transition-all outline-none font-bold uppercase tracking-widest text-[13px] placeholder:text-slate-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                                        <div className="relative">
                                            <input 
                                                type="email" 
                                                disabled
                                                value={session.user?.email ?? ""}
                                                className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-4 text-slate-600 cursor-not-allowed font-bold text-[13px] tracking-widest uppercase pl-4"
                                            />
                                            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-800" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button 
                                        disabled={isSaving}
                                        className="w-full sm:w-auto px-10 py-4 bg-primary hover:bg-[#8a0e1d] text-white rounded-2xl font-black uppercase tracking-widest text-[13px] transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isSaving ? (
                                            <Loader2 className="size-4 animate-spin" />
                                        ) : (
                                            <>
                                                <Check className="size-4" />
                                                Update Profile
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Password Change */}
                        <div className="bg-[#0D0D0D] border border-white/5 rounded-3xl p-8 sm:p-10">
                            <form onSubmit={handleChangePassword} className="space-y-8">
                                <h3 className="text-[14px] font-black text-white uppercase tracking-widest flex items-center gap-2 mb-6">
                                    <KeyRound className="size-4 text-primary" /> Security Settings
                                </h3>

                                <div className="space-y-6">
                                    {(session.user as any).hasPassword && (
                                        <div className="space-y-2">
                                            <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Password</label>
                                            <input 
                                                type="password" 
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full bg-white/3 border border-white/5 rounded-2xl p-4 text-white focus:border-primary transition-all outline-none font-bold uppercase tracking-widest text-[13px] placeholder:text-slate-700"
                                            />
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">New Password</label>
                                            <input 
                                                type="password" 
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full bg-white/3 border border-white/5 rounded-2xl p-4 text-white focus:border-primary transition-all outline-none font-bold uppercase tracking-widest text-[13px] placeholder:text-slate-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm New Password</label>
                                            <input 
                                                type="password" 
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full bg-white/3 border border-white/5 rounded-2xl p-4 text-white focus:border-primary transition-all outline-none font-bold uppercase tracking-widest text-[13px] placeholder:text-slate-700"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button 
                                        disabled={isPasswordSaving}
                                        className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[13px] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isPasswordSaving ? (
                                            <Loader2 className="size-4 animate-spin" />
                                        ) : (
                                            <>
                                                <KeyRound className="size-4" />
                                                Change Password
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
