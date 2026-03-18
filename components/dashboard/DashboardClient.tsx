"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    ShoppingBag,
    Wallet,
    Settings,
    LogOut,
    Clock,
    CheckCircle2,
    Timer,
    Gamepad2,
    Package,
    ShieldCheck,
    MessageSquare,
    ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useCurrency } from "@/context/currency-context";
import { signOut } from "next-auth/react";

interface DashboardClientProps {
    user: any;
    orders: any[];
    stats: {
        totalSpent: number;
        activeOrders: number;
        completedOrders: number;
    };
}

export default function DashboardClient({ user, orders, stats }: DashboardClientProps) {
    const { formatPrice } = useCurrency();
    const [activeTab, setActiveTab] = useState("dashboard");

    const trackingOrder = orders.find(o => ['pending', 'active', 'paid'].includes(o.status.toLowerCase()));

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
            case 'delivered':
            case 'paid':
                return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            case 'active':
            case 'shipped':
                return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
            case 'pending':
                return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            default:
                return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row font-sans selection:bg-primary/30">
            {/* Sidebar */}
            <aside className="w-full lg:w-72 border-r border-white/5 bg-[#0A0A0A] flex flex-col shrink-0">
                <div className="p-8 pb-4">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <Gamepad2 className="size-5" />
                        </div>
                        <span className="text-lg font-bold tracking-tight uppercase">
                            <span className="text-primary">CFN</span>BOOST
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                    {[
                        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
                        { id: 'orders', label: 'My Orders', icon: ShoppingBag },
                        { id: 'wallet', label: 'Wallet', icon: Wallet },
                        { id: 'support', label: 'Support', icon: MessageSquare },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id
                                    ? 'bg-white/5 text-white border border-white/5'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
                                }`}
                        >
                            <item.icon className="size-4" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 mb-4">
                        <div className="size-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden uppercase text-sm">
                            {user?.image ? <img src={user.image} className="w-full h-full object-cover" /> : user?.name?.[0] || 'U'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold truncate">{user?.name || 'User'}</p>
                            <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-primary hover:bg-primary/5 transition-all"
                    >
                        <LogOut className="size-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-black scrollbar-hide">
                <div className="max-w-6xl mx-auto p-6 md:p-12 lg:p-16">
                    {/* Header */}
                    <header className="mb-12">
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome, {user?.name?.split(' ')[0] || 'Member'}</h1>
                        <p className="text-slate-500 text-sm">Here is what&apos;s happening with your account today.</p>
                    </header>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
                        {[
                            { label: 'Active Orders', value: stats.activeOrders, icon: Timer },
                            { label: 'Completed', value: stats.completedOrders, icon: CheckCircle2 },
                            { label: 'Total Spent', value: formatPrice(stats.totalSpent), icon: Wallet },
                        ].map((stat) => (
                            <div key={stat.label} className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                                    <stat.icon className="size-4 text-slate-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Tracking & History */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Tracking Order */}
                            {trackingOrder ? (
                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-lg font-bold text-white">Current Order</h2>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                            Live Tracking
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-3xl bg-[#0F0F0F] border border-white/5">
                                        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                                            <div>
                                                <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border mb-3 inline-block ${getStatusColor(trackingOrder.status)}`}>
                                                    {trackingOrder.status}
                                                </div>
                                                <h3 className="text-2xl font-bold text-white mb-1">{trackingOrder.name}</h3>
                                                <p className="text-slate-500 text-sm font-medium">
                                                    Order ID: #{trackingOrder.id.slice(-8).toUpperCase()} • {trackingOrder.game}
                                                </p>
                                            </div>
                                            <div className="text-left md:text-right">
                                                <p className="text-xs font-medium text-slate-500 mb-1">Estimated Completion</p>
                                                <p className="text-sm font-bold text-white">4 - 6 Hours</p>
                                            </div>
                                        </div>

                                        {/* Simple Progress */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-semibold text-slate-400">Task Completion</span>
                                                <span className="font-bold text-primary">
                                                    {trackingOrder.status === 'completed' ? '100' : '45'}%
                                                </span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: trackingOrder.status === 'completed' ? '100%' : '45%' }}
                                                    className="h-full bg-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-2 mt-10 pt-8 border-t border-white/5">
                                            {['Payment', 'Process', 'In Work', 'Delivery'].map((step, i) => (
                                                <div key={step} className="text-center">
                                                    <div className={`text-[10px] font-bold uppercase tracking-widest ${(trackingOrder.status === 'completed' || i <= 1) ? 'text-white' : 'text-slate-600'
                                                        }`}>{step}</div>
                                                    <div className={`w-full h-1 mt-3 rounded-full ${(trackingOrder.status === 'completed' || i <= 1) ? 'bg-primary' : 'bg-white/5'
                                                        }`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            ) : (
                                <div className="p-12 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center bg-white/[0.01]">
                                    <ShoppingBag className="size-10 text-slate-800 mb-4" />
                                    <h3 className="text-base font-bold text-white mb-1">No Active Orders</h3>
                                    <p className="text-slate-500 text-xs mb-6">When you place an order, it will appear here for tracking.</p>
                                    <Link href="/services" className="px-6 py-2.5 bg-white text-black rounded-xl text-xs font-bold hover:bg-slate-200 transition-all">
                                        View Services
                                    </Link>
                                </div>
                            )}

                            {/* History */}
                            <section>
                                <h2 className="text-lg font-bold text-white mb-6">Recent Records</h2>
                                <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-white/5 bg-white/[0.01]">
                                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Order</th>
                                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {orders.slice(0, 5).map((order) => (
                                                    <tr key={order.id} className="hover:bg-white/[0.01] transition-colors">
                                                        <td className="px-6 py-4">
                                                            <p className="font-semibold text-white truncate max-w-[200px]">{order.name}</p>
                                                            <p className="text-[11px] text-slate-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                        </td>
                                                        <td className="px-6 py-4 font-bold text-white">{formatPrice(order.price)}</td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${getStatusColor(order.status)}`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right: Actions/Support */}
                        <div className="space-y-6">
                            {/* Wallet Info */}
                            <div className="p-8 rounded-3xl bg-primary text-white">
                                <p className="text-[11px] font-bold uppercase tracking-widest opacity-70 mb-1">Wallet Credits</p>
                                <h4 className="text-3xl font-bold mb-6">{formatPrice(0.00)}</h4>
                                <button className="w-full py-3 bg-black text-white rounded-xl text-xs font-bold hover:bg-zinc-900 transition-all mb-2">
                                    Deposit Funds
                                </button>
                                <button className="w-full py-2.5 text-white/70 hover:text-white text-xs font-semibold flex items-center justify-center gap-2">
                                    Transaction History <ChevronRight className="size-3" />
                                </button>
                            </div>

                            {/* Simple Notifications */}
                            <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/5">
                                <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
                                    <Clock className="size-4 text-primary" />
                                    Account Alerts
                                </h3>
                                <div className="space-y-5">
                                    {[
                                        { text: 'Order processed successfully', time: '2h ago' },
                                        { text: 'Security check completed', time: '1d ago' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-3">
                                            <div className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                            <div>
                                                <p className="text-[12px] font-medium text-slate-300 leading-snug">{item.text}</p>
                                                <p className="text-[10px] text-slate-600 mt-0.5 font-bold uppercase tracking-wider">{item.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Help */}
                            <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.01]">
                                <h4 className="text-sm font-bold text-white mb-2">Support Center</h4>
                                <p className="text-xs text-slate-500 mb-5 leading-relaxed">Need help with an order? Our agents are available 24/7.</p>
                                <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold transition-all">
                                    Open Ticket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
