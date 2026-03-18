"use client";

import { ShoppingBag, Users, DollarSign, Package, TrendingUp, ArrowUpRight, ArrowDownRight, Eye, Megaphone, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter
} from "@/components/ui/sheet";

interface AnalyticsItem {
    label: string;
    value: number;
    color: string;
}

interface AdminOverviewProps {
    stats: {
        totalOrders: number;
        pendingOrders: number;
        revenue: number;
        totalUsers: number;
    };
    recentOrders: any[];
    analytics: AnalyticsItem[];
}

export default function AdminOverview({ stats, recentOrders, analytics }: AdminOverviewProps) {
    const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
    const [announcement, setAnnouncement] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAction = (label: string) => {
        if (label === "View Reports") {
            window.location.href = "/admin/orders";
            return;
        }
        toast.message(`Action Started`, {
            description: `The action "${label}" has been started successfully.`,
        });
    };

    const handleCreateAnnouncement = async () => {
        if (!announcement.trim()) return;
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/announcement", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: announcement, isActive: true }),
            });

            if (res.ok) {
                toast.success("Announcement created!");
                setAnnouncement("");
                setIsAnnouncementOpen(false);
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Failed to create announcement.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-10">
            {/* Quick Actions */}
            <div className="bg-linear-to-r from-primary/10 to-transparent border border-white/5 rounded-4xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-xl font-black text-white italic tracking-tight uppercase">Dashboard Overview</h2>
                    <p className="text-slate-400 text-sm font-medium mt-1">Check your sales, users, and latest orders in one place.</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => handleAction("View Reports")}
                        className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-xs font-bold text-white transition-all uppercase tracking-widest cursor-pointer"
                    >
                        <TrendingUp className="size-4 text-emerald-500" />
                        View Reports
                    </button>
                    <button
                        onClick={() => setIsAnnouncementOpen(true)}
                        className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-[#8a0e1d] rounded-2xl text-xs font-bold text-white transition-all uppercase tracking-widest shadow-lg shadow-primary/20 group cursor-pointer"
                    >
                        <Megaphone className="size-4" />
                        Create Announcement
                        <ArrowUpRight className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, trend: "+12%", positive: true },
                    { label: "Total Orders", value: stats.totalOrders.toString(), icon: ShoppingBag, trend: "+5%", positive: true },
                    { label: "Pending Orders", value: stats.pendingOrders.toString(), icon: Package, trend: "-2%", positive: false },
                    { label: "Total Users", value: stats.totalUsers.toLocaleString(), icon: Users, trend: "+18%", positive: true },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#0D0D0D] border border-white/5 rounded-3xl p-7 relative overflow-hidden group hover:border-primary/30 transition-all shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                            <stat.icon className="size-16" />
                        </div>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-3xl font-black text-white tracking-tighter">{stat.value}</h3>
                            <div className={`flex items-center gap-1 text-[10px] font-black mb-1 px-2 py-1 rounded-lg ${stat.positive ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-primary/10 text-primary border border-primary/20"}`}>
                                {stat.positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                                {stat.trend}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-[#0D0D0D] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
                    <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/1">
                        <div>
                            <h3 className="font-black text-white uppercase tracking-widest text-sm italic">Latest Orders</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-1">A quick look at the 10 most recent orders</p>
                        </div>
                        <button
                            onClick={() => window.location.href = "/admin/orders"}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[9px] font-black text-primary uppercase tracking-widest transition-all cursor-pointer"
                        >
                            View All Orders
                        </button>
                    </div>
                    <div className="overflow-x-auto flex-1 text-white">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/2">
                                    <th className="px-8 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Order ID</th>
                                    <th className="px-8 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Customer</th>
                                    <th className="px-8 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Price</th>
                                    <th className="px-8 py-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {recentOrders.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-white/2 transition-colors group">
                                        <td className="px-8 py-5 text-[10px] font-mono font-bold text-slate-400 group-hover:text-primary transition-colors">#{order.id.slice(-6).toUpperCase()}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-xl bg-linear-to-br from-primary/20 to-transparent flex items-center justify-center text-[10px] font-black text-primary border border-primary/20">
                                                    {(order.user?.name || "U")[0]}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-white leading-none">{order.user?.name || "Anonymous User"}</p>
                                                    <p className="text-[9px] text-slate-600 font-medium mt-1 truncate max-w-[120px]">{order.user?.email || "No Email"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-tighter ${order.status === "paid" || order.status === "completed"
                                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                                : "bg-red-500/10 text-red-500 border border-red-500/20"
                                                }`}>
                                                {order.status === "paid" || order.status === "completed" ? "● Confirmed" : "○ Pending"}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-xs font-black text-white">${Number(order.total).toFixed(2)}</td>
                                        <td className="px-8 py-5 text-[10px] font-bold text-slate-500 text-right uppercase tracking-tighter">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {recentOrders.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-16 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <Package className="size-10 text-slate-800" />
                                                <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest italic">No orders found</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Categories / Analytics Card */}
                <div className="bg-[#0D0D0D] border border-white/5 rounded-[2.5rem] p-8 space-y-8 flex flex-col shadow-2xl">
                    <header>
                        <h3 className="font-black text-white uppercase tracking-widest text-sm italic">Service Categories</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-1">Popularity by game category</p>
                    </header>

                    <div className="space-y-7 flex-1">
                        {analytics.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center gap-3">
                                <TrendingUp className="size-8" />
                                <p className="text-[10px] uppercase font-black tracking-widest">No service data yet</p>
                            </div>
                        ) : (
                            analytics.map((platform) => (
                                <div key={platform.label}>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{platform.label}</span>
                                        <span className="text-[11px] font-black text-white">{platform.value}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${platform.value}%` }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            className={`h-full ${platform.color} shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Announcement Sheet */}
            <Sheet open={isAnnouncementOpen} onOpenChange={setIsAnnouncementOpen}>
                <SheetContent className="bg-[#080808] border-white/5 text-white">
                    <SheetHeader className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-6 w-1 bg-primary rounded-full" />
                            <SheetTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Create Announcement</SheetTitle>
                        </div>
                        <SheetDescription className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                            This message will appear at the top of the website for all users.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Message Content</label>
                            <textarea
                                value={announcement}
                                onChange={(e) => setAnnouncement(e.target.value)}
                                placeholder="e.g. 50% SALE ON ALL VALORANT SERVICES! USE CODE: BOOST50"
                                className="w-full h-32 bg-white/5 border border-white/5 rounded-2xl p-4 text-xs text-white focus:border-primary/50 outline-none transition-all resize-none placeholder:text-slate-800"
                            />
                        </div>

                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-4">
                            <Megaphone className="size-5 text-primary mt-1 shrink-0" />
                            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                                Note: Only one announcement can be active at a time. Creating a new one will automatically replace the old one.
                            </p>
                        </div>
                    </div>

                    <SheetFooter className="mt-10 flex flex-col gap-3">
                        <button
                            onClick={handleCreateAnnouncement}
                            disabled={!announcement.trim() || isSubmitting}
                            className="w-full h-14 bg-primary hover:bg-[#8a0e1d] rounded-2xl flex items-center justify-center text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:grayscale cursor-pointer"
                        >
                            {isSubmitting ? <Loader2 className="size-5 animate-spin" /> : "Publish Announcement"}
                        </button>
                        <button
                            onClick={async () => {
                                if (confirm("Delete the current announcement?")) {
                                    setIsSubmitting(true);
                                    await fetch("/api/announcement", { method: "DELETE" });
                                    toast.success("Announcement deleted");
                                    setIsAnnouncementOpen(false);
                                    setIsSubmitting(false);
                                }
                            }}
                            className="w-full h-12 bg-white/5 hover:bg-red-500/10 border border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-all rounded-xl cursor-pointer"
                        >
                            Delete Current
                        </button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
