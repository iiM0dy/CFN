"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"

interface OrderDetails {
    id: string
    status: string
    totalPrice: string
    createdAt: string
    serviceName: string
    gameName: string
    gameSlug: string
    image: string
    guestEmail?: string
}

export default function OrderStatusPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const orderId = params.orderId as string
    const email = searchParams.get('email')

    const [order, setOrder] = useState<OrderDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/orders/track?orderId=${orderId}&email=${encodeURIComponent(email || "")}`)
                if (res.ok) {
                    const data = await res.json()
                    setOrder(data)
                } else {
                    const data = await res.json()
                    setError(data.error || "Failed to load order")
                }
            } catch (err) {
                setError("Network error. Please try again.")
            } finally {
                setLoading(false)
            }
        }

        if (orderId) {
            fetchOrder()
        }
    }, [orderId, email])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4">
                <div className="bg-[#0A0A0A] border border-red-500/20 rounded-xl p-8 max-w-md text-center">
                    <span className="material-symbols-outlined text-4xl text-red-500 mb-4">error</span>
                    <h1 className="text-xl font-bold text-white mb-2">Order Not Found</h1>
                    <p className="text-slate-400 mb-6">{error}</p>
                    <Link href="/track-order" className="text-primary hover:text-white transition-colors uppercase text-sm font-bold tracking-widest">
                        Try Another Order ID
                    </Link>
                </div>
            </div>
        )
    }

    // Status Styling
    const getStatusColor = (s: string) => {
        switch (s.toLowerCase()) {
            case 'completed': return 'text-green-500 bg-green-500/10 border-green-500/20'
            case 'paid': return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
            case 'active': return 'text-purple-500 bg-purple-500/10 border-purple-500/20'
            case 'cancelled': return 'text-red-500 bg-red-500/10 border-red-500/20'
            default: return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
        }
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white py-20 px-4 md:px-10">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <Link href="/orders" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-4">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Track Your Orders
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                            Order <span className="text-primary">#{order.id.slice(-6)}</span>
                        </h1>
                        <p className="text-slate-500 text-sm mt-1 font-mono">ID: {order.id}</p>
                    </div>
                    <div className={`px-6 py-2 rounded-full border text-xs font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                        {order.status}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:col-span-2 space-y-6"
                    >
                        {/* Service Card */}
                        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden p-6">
                            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Service Details</h2>
                            <div className="flex gap-6">
                                <div className="w-24 h-24 rounded-lg bg-[#111] overflow-hidden shrink-0 border border-white/10">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={order.image} alt={order.serviceName} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{order.gameName}</div>
                                    <h3 className="text-xl font-bold text-white mb-2">{order.serviceName}</h3>
                                    <div className="text-2xl font-black text-white">${Number(order.totalPrice).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline / Steps (Mockup for now) */}
                        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
                            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Progress Timeline</h2>
                            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
                                <div className="relative flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 border-4 border-[#0A0A0A] relative z-10">
                                        <span className="material-symbols-outlined text-white text-sm">check</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm uppercase tracking-wide">Order Placed</h4>
                                        <p className="text-slate-500 text-xs mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-[#0A0A0A] relative z-10 ${order.status !== 'pending' ? 'bg-primary text-white' : 'bg-[#111] text-slate-600'}`}>
                                        <span className="material-symbols-outlined text-sm">payments</span>
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-sm uppercase tracking-wide ${order.status !== 'pending' ? 'text-white' : 'text-slate-600'}`}>Payment Confirmed</h4>
                                        <p className="text-slate-500 text-xs mt-1">
                                            {order.status === 'pending' ? 'Waiting for payment' : 'Payment received'}
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-[#0A0A0A] relative z-10 ${['active', 'completed'].includes(order.status) ? 'bg-primary text-white' : 'bg-[#111] text-slate-600'}`}>
                                        <span className="material-symbols-outlined text-sm">sports_esports</span>
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-sm uppercase tracking-wide ${['active', 'completed'].includes(order.status) ? 'text-white' : 'text-slate-600'}`}>Booster Assigned</h4>
                                        <p className="text-slate-500 text-xs mt-1">
                                            {['active', 'completed'].includes(order.status) ? 'Booster is working on your order' : 'Pending assignment'}
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-[#0A0A0A] relative z-10 ${order.status === 'completed' ? 'bg-green-500 text-white' : 'bg-[#111] text-slate-600'}`}>
                                        <span className="material-symbols-outlined text-sm">flag</span>
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-sm uppercase tracking-wide ${order.status === 'completed' ? 'text-white' : 'text-slate-600'}`}>Order Completed</h4>
                                        <p className="text-slate-500 text-xs mt-1">
                                            {order.status === 'completed' ? 'Service delivered successfully' : 'In progress'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
                            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Customer Info</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Email</label>
                                    <div className="text-sm font-medium text-white">{order.guestEmail || "N/A (Guest)"}</div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Order Date</label>
                                    <div className="text-sm font-medium text-white">{new Date(order.createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Need Help?</h2>
                            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                                If you have any questions about your order, please contact our support team with your Order ID.
                            </p>
                            <Link href="/contact" className="w-full bg-[#0A0A0A] hover:bg-[#111] text-white border border-white/10 rounded-lg py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
