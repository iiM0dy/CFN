"use client";

import {
    DollarSign,
    ShoppingBag,
    Package,
    Clock,
    CheckCircle2,
    Users,
    MessageSquare,
    AlertTriangle,
    ArrowRight,
    Plus,
    Megaphone,
    Gamepad2,
    Wrench,
    Loader2,
    ImageOff,
    Star,
    CheckCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet";

interface DashboardStats {
    orderCount: number;
    serviceOrderCount: number;
    pendingOrderCount: number;
    pendingServiceOrderCount: number;
    totalRevenue: number;
    totalServiceRevenue: number;
    userCount: number;
    latestOrders: any[];
    openChats: number;
    activeOrderCount: number;
    completedOrderCount: number;
    gamesCount: number;
    servicesCount: number;
    missingPriceCount: number;
    missingImageCount: number;
    featuredCount: number;
}

export default function AdminOverview({ data }: { data: DashboardStats }) {
    const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
    const [announcement, setAnnouncement] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalRevenue = data.totalRevenue + data.totalServiceRevenue;
    const totalOrders = data.orderCount + data.serviceOrderCount;
    const pendingOrders = data.pendingOrderCount + data.pendingServiceOrderCount;

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
                toast.success("Announcement published.");
                setAnnouncement("");
                setIsAnnouncementOpen(false);
            } else {
                throw new Error();
            }
        } catch {
            toast.error("Failed to create announcement.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Attention items
    const attentionItems: { label: string; count: number; href: string; icon: React.ElementType }[] = [];
    if (pendingOrders > 0) attentionItems.push({ label: "Pending orders", count: pendingOrders, href: "/admin/orders", icon: Clock });
    if (data.openChats > 0) attentionItems.push({ label: "Open chats", count: data.openChats, href: "/admin/chat", icon: MessageSquare });
    if (data.missingPriceCount > 0) attentionItems.push({ label: "Services missing prices", count: data.missingPriceCount, href: "/admin/services", icon: AlertTriangle });
    if (data.missingImageCount > 0) attentionItems.push({ label: "Services missing images", count: data.missingImageCount, href: "/admin/services", icon: ImageOff });

    const kpiCards = [
        { label: "Total Revenue", value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: DollarSign },
        { label: "Total Orders", value: totalOrders.toString(), icon: ShoppingBag },
        { label: "Pending", value: pendingOrders.toString(), icon: Clock, highlight: pendingOrders > 0 },
        { label: "Active", value: (data.activeOrderCount ?? 0).toString(), icon: Package },
        { label: "Completed", value: (data.completedOrderCount ?? 0).toString(), icon: CheckCircle2 },
        { label: "Users", value: data.userCount.toLocaleString(), icon: Users },
        { label: "Open Chats", value: (data.openChats ?? 0).toString(), icon: MessageSquare },
    ];

    return (
        <div className="space-y-6">
            {/* Header + Quick Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-white">Dashboard Overview</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Monitor orders, revenue, users, and support activity.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setIsAnnouncementOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.07] transition-colors cursor-pointer"
                    >
                        <Megaphone className="size-3" />
                        Announcement
                    </button>
                    <Link
                        href="/admin/games"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.07] transition-colors"
                    >
                        <Plus className="size-3" />
                        Add Game
                    </Link>
                    <Link
                        href="/admin/services"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.07] transition-colors"
                    >
                        <Plus className="size-3" />
                        Add Service
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15 transition-colors"
                    >
                        <ShoppingBag className="size-3" />
                        View Orders
                    </Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                {kpiCards.map((kpi) => (
                    <div
                        key={kpi.label}
                        className={`bg-[#0D0D0D] border rounded-xl p-4 ${
                            kpi.highlight ? "border-amber-500/20" : "border-white/[0.06]"
                        }`}
                    >
                        <div className="flex items-center gap-1.5 mb-2">
                            <kpi.icon className={`size-3.5 ${kpi.highlight ? "text-amber-500" : "text-slate-600"}`} />
                            <span className="text-[11px] font-medium text-slate-500 truncate">{kpi.label}</span>
                        </div>
                        <p className={`text-xl font-semibold tracking-tight ${kpi.highlight ? "text-amber-400" : "text-white"}`}>
                            {kpi.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Attention Needed */}
            <div className="bg-[#0D0D0D] border border-white/[0.06] rounded-xl">
                <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-2">
                    <AlertTriangle className="size-3.5 text-amber-500" />
                    <h3 className="text-xs font-semibold text-white">Attention Needed</h3>
                </div>
                {attentionItems.length === 0 ? (
                    <div className="px-4 py-6 flex items-center justify-center gap-2">
                        <CheckCheck className="size-4 text-emerald-500" />
                        <p className="text-sm text-slate-500">All clear. No urgent actions right now.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/[0.04]">
                        {attentionItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.02] transition-colors group"
                            >
                                <div className="flex items-center gap-2.5">
                                    <item.icon className="size-3.5 text-amber-500/70" />
                                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{item.label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">{item.count}</span>
                                    <ArrowRight className="size-3 text-slate-700 group-hover:text-slate-400 transition-colors" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Main grid: Recent Orders + Sidebar panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-[#0D0D0D] border border-white/[0.06] rounded-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                        <h3 className="text-xs font-semibold text-white">Recent Orders</h3>
                        <Link href="/admin/orders" className="text-[11px] font-medium text-primary hover:text-white transition-colors">
                            View all
                        </Link>
                    </div>
                    {data.latestOrders.length === 0 ? (
                        <div className="px-4 py-10 text-center">
                            <ShoppingBag className="size-5 text-slate-700 mx-auto mb-2" />
                            <p className="text-sm text-slate-500">No orders yet.</p>
                            <p className="text-xs text-slate-600 mt-1">Orders will appear here as customers place them.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-white/[0.04]">
                                        <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider">Order</th>
                                        <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider">Customer</th>
                                        <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider">Service</th>
                                        <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider text-right">Price</th>
                                        <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.03]">
                                    {data.latestOrders.map((order: any) => {
                                        const statusColors: Record<string, string> = {
                                            completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                                            paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                                            pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                                            cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
                                            in_progress: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                                        };
                                        const statusStyle = statusColors[order.status] ?? statusColors.pending;
                                        const customerEmail = order.user?.email || order.guestEmail || "Guest";
                                        const serviceName = order.service?.name ?? "—";
                                        const gameName = order.service?.game?.name ?? "";

                                        return (
                                            <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="px-4 py-2.5 text-xs font-mono text-slate-400">
                                                    #{order.id.toString().slice(-6).toUpperCase()}
                                                </td>
                                                <td className="px-4 py-2.5 text-xs text-slate-300 truncate max-w-[160px]">
                                                    {customerEmail}
                                                </td>
                                                <td className="px-4 py-2.5">
                                                    <span className="text-xs text-slate-300">{serviceName}</span>
                                                    {gameName && <span className="text-[10px] text-slate-600 ml-1">({gameName})</span>}
                                                </td>
                                                <td className="px-4 py-2.5">
                                                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border capitalize ${statusStyle}`}>
                                                        {order.status.replace(/_/g, " ")}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2.5 text-xs font-medium text-white text-right">
                                                    ${Number(order.totalPrice).toFixed(2)}
                                                </td>
                                                <td className="px-4 py-2.5 text-xs text-slate-500 text-right">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Right column */}
                <div className="space-y-4">
                    {/* Support Activity */}
                    <div className="bg-[#0D0D0D] border border-white/[0.06] rounded-xl">
                        <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="size-3.5 text-slate-600" />
                                <h3 className="text-xs font-semibold text-white">Support Activity</h3>
                            </div>
                            <Link href="/admin/chat" className="text-[11px] font-medium text-primary hover:text-white transition-colors">
                                Open chat
                            </Link>
                        </div>
                        <div className="px-4 py-6 text-center">
                            {(data.openChats ?? 0) > 0 ? (
                                <div>
                                    <p className="text-2xl font-semibold text-white">{data.openChats}</p>
                                    <p className="text-xs text-slate-500 mt-1">open conversation{data.openChats !== 1 ? "s" : ""}</p>
                                </div>
                            ) : (
                                <>
                                    <MessageSquare className="size-5 text-slate-700 mx-auto mb-2" />
                                    <p className="text-sm text-slate-500">No active support conversations.</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Catalog Health */}
                    <div className="bg-[#0D0D0D] border border-white/[0.06] rounded-xl">
                        <div className="px-4 py-3 border-b border-white/[0.06]">
                            <h3 className="text-xs font-semibold text-white">Catalog Health</h3>
                        </div>
                        <div className="divide-y divide-white/[0.04]">
                            {[
                                { label: "Games", value: data.gamesCount ?? 0, icon: Gamepad2 },
                                { label: "Services", value: data.servicesCount ?? 0, icon: Wrench },
                                { label: "Featured", value: data.featuredCount ?? 0, icon: Star },
                                { label: "Missing prices", value: data.missingPriceCount ?? 0, icon: AlertTriangle, warn: true },
                                { label: "Missing images", value: data.missingImageCount ?? 0, icon: ImageOff, warn: true },
                            ].map((row) => (
                                <div key={row.label} className="flex items-center justify-between px-4 py-2.5">
                                    <div className="flex items-center gap-2">
                                        <row.icon className={`size-3.5 ${row.warn && row.value > 0 ? "text-amber-500" : "text-slate-600"}`} />
                                        <span className="text-xs text-slate-400">{row.label}</span>
                                    </div>
                                    <span className={`text-xs font-semibold ${
                                        row.warn && row.value > 0 ? "text-amber-400" : "text-white"
                                    }`}>
                                        {row.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Announcement Sheet */}
            <Sheet open={isAnnouncementOpen} onOpenChange={setIsAnnouncementOpen}>
                <SheetContent className="bg-[#0A0A0A] border-white/[0.06] text-white">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="text-base font-semibold text-white">Create Announcement</SheetTitle>
                        <SheetDescription className="text-sm text-slate-500">
                            This message will appear at the top of the website for all users.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-400">Message</label>
                            <textarea
                                value={announcement}
                                onChange={(e) => setAnnouncement(e.target.value)}
                                placeholder="e.g. 50% off all Valorant services — use code BOOST50"
                                className="w-full h-28 bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 text-sm text-white focus:border-white/10 outline-none transition-all resize-none placeholder:text-slate-700"
                            />
                        </div>
                        <p className="text-[11px] text-slate-600 flex items-start gap-1.5">
                            <Megaphone className="size-3 mt-0.5 shrink-0" />
                            Only one announcement can be active. Creating a new one replaces the current one.
                        </p>
                    </div>

                    <SheetFooter className="mt-8 flex flex-col gap-2">
                        <button
                            onClick={handleCreateAnnouncement}
                            disabled={!announcement.trim() || isSubmitting}
                            className="w-full py-2.5 bg-primary hover:bg-primary-dark rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-40 cursor-pointer"
                        >
                            {isSubmitting ? <Loader2 className="size-4 animate-spin mx-auto" /> : "Publish Announcement"}
                        </button>
                        <button
                            onClick={async () => {
                                if (confirm("Delete the current announcement?")) {
                                    setIsSubmitting(true);
                                    await fetch("/api/announcement", { method: "DELETE" });
                                    toast.success("Announcement deleted.");
                                    setIsAnnouncementOpen(false);
                                    setIsSubmitting(false);
                                }
                            }}
                            className="w-full py-2 text-xs font-medium text-slate-600 hover:text-red-400 transition-colors cursor-pointer"
                        >
                            Delete Current Announcement
                        </button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
