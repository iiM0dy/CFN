"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"

interface OrderSummary {
    id: string
    status: string
    totalPrice: number
    createdAt: string
    serviceName: string
    gameName: string
    image: string
    guestEmail: string
}

export default function TrackOrderPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [orders, setOrders] = useState<OrderSummary[]>([])
    const [hasSearched, setHasSearched] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setHasSearched(false)
        setOrders([])

        try {
            const res = await fetch(`/api/orders/track?email=${encodeURIComponent(email)}`)
            
            if (res.ok) {
                const data = await res.json()
                if (data.orders) {
                    setOrders(data.orders)
                    setHasSearched(true)
                }
            } else {
                const data = await res.json()
                setError(data.error || "No orders found for this email")
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
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
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 relative z-10 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Track Order</h1>
                    <p className="text-slate-500 text-[14px] uppercase tracking-widest font-bold">Find your orders by email</p>
                </div>

                {!hasSearched || orders.length === 0 ? (
                    <>
                        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-[14px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Used during checkout"
                                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary transition-colors text-[14px]"
                                    required 
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-[14px] font-medium flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">error</span>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest py-4 rounded-lg transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span>
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        Find Orders
                                        <span className="material-symbols-outlined text-sm">search</span>
                                    </>
                                )}
                            </button>
                        </form>
                        
                        <div className="mt-6 text-center">
                            <Link href="/login" className="text-[14px] text-slate-500 hover:text-white transition-colors uppercase tracking-wider font-bold">
                                Sign In for better experience
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                            <div>
                                <p className="text-[14px] text-slate-400 uppercase tracking-widest font-bold mb-1">Found Orders For</p>
                                <p className="text-sm font-medium text-white">{email}</p>
                            </div>
                            <button 
                                onClick={() => { setHasSearched(false); setOrders([]); setEmail(""); }}
                                className="text-[14px] font-bold uppercase tracking-widest text-primary hover:text-white transition-colors py-2 px-4 rounded-lg bg-primary/10 hover:bg-primary sm:border border-primary/20 whitespace-nowrap"
                            >
                                Search Another
                            </button>
                        </div>

                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            {orders.map((order) => (
                                <Link
                                    key={order.id}
                                    href={`/track-order/${order.id}?email=${encodeURIComponent(email)}`}
                                    className="block bg-[#111] border border-white/5 hover:border-primary/50 rounded-xl p-4 transition-all hover:bg-[#1a1a1a]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-lg bg-[#0A0A0A] overflow-hidden shrink-0 border border-white/10">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={order.image} alt={order.serviceName} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h3 className="text-sm font-bold text-white truncate">{order.serviceName}</h3>
                                                <span className={`text-[14px] font-black uppercase tracking-widest px-2 py-1 rounded-md border shrink-0 ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-[14px] text-slate-400 font-medium truncate mb-2">{order.gameName}</p>
                                            <div className="flex items-center justify-between text-[14px]">
                                                <span className="text-slate-500 font-mono">#{order.id.slice(-6)}</span>
                                                <span className="font-bold text-primary">${Number(order.totalPrice).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="hidden sm:flex items-center shrink-0 pl-4">
                                            <span className="material-symbols-outlined text-slate-500">chevron_right</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    )
}
