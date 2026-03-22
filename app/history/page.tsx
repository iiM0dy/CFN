"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
    Clock, 
    Package, 
    CheckCircle, 
    Shield, 
    ChevronRight,
    Loader2,
    ArrowUpRight,
    Search
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface HistoryEvent {
    id: string
    type: 'order' | 'status' | 'system'
    title: string
    description: string
    timestamp: Date
    status: string
    link?: string
}

export default function HistoryPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [events, setEvents] = useState<HistoryEvent[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
        if (session) {
            fetchHistory()
        }
    }, [session, status])

    const fetchHistory = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/orders')
            if (res.ok) {
                const orders: any[] = await res.json()
                
                const orderEvents: HistoryEvent[] = orders.flatMap(order => {
                    const baseEv: HistoryEvent[] = [{
                        id: `order-${order.id}`,
                        type: 'order',
                        title: `Order Placed: ${order.service.name}`,
                        description: `Purchased ${order.quantity}x service for ${order.service.game.name}`,
                        timestamp: new Date(order.createdAt),
                        status: order.status,
                        link: `/orders`
                    }]

                    if (order.status === 'completed') {
                        baseEv.push({
                            id: `complete-${order.id}`,
                            type: 'status',
                            title: `Order Fulfilled: ${order.service.name}`,
                            description: `Your service requirements have been successfully completed`,
                            timestamp: new Date(order.completedAt || order.updatedAt),
                            status: 'success',
                            link: `/orders`
                        })
                    }

                    return baseEv
                })

                const systemEvents: HistoryEvent[] = [
                    {
                        id: 'sys-1',
                        type: 'system',
                        title: 'Identity Verified',
                        description: 'Your account has been officially verified by our team',
                        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
                        status: 'info'
                    },
                    {
                        id: 'sys-2',
                        type: 'system',
                        title: 'Welcome Registered',
                        description: 'You successfully completed the account registration',
                        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
                        status: 'info'
                    }
                ]

                const allEvents = [...orderEvents, ...systemEvents].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                setEvents(allEvents)
            }
        } catch (error) {
            console.error('Error fetching history:', error)
        } finally {
            setLoading(false)
        }
    }

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-[#080808] flex items-center justify-center">
                <Loader2 className="size-12 animate-spin text-primary" />
            </div>
        )
    }

    const filteredEvents = events.filter(e => 
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-[#080808] text-white">
            <main className="max-w-[1280px] mx-auto px-6 py-12">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-slate-500 mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="size-3" />
                    <span className="text-white">Activity</span>
                    <ChevronRight className="size-3" />
                    <span className="text-primary truncate">History</span>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">My History</h1>
                        <p className="text-slate-500 text-[14px] font-bold uppercase tracking-widest uppercase tracking-widest">A record of your account activity and interactions</p>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-600 group-focus-within:text-primary" />
                        <input 
                            type="text" 
                            placeholder="Find activity..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-[280px] bg-white/3 border border-white/5 rounded-2xl py-3 pl-11 pr-5 text-[13px] text-white placeholder:text-slate-700 focus:border-primary transition-all outline-none font-bold uppercase tracking-widest"
                        />
                    </div>
                </div>

                {/* History List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredEvents.map((event, idx) => (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                key={event.id}
                                className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-6 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-6 group hover:border-primary/20 transition-all hover:bg-white/[0.01]"
                            >
                                {/* Event Icon */}
                                <div className={`size-12 rounded-xl border flex items-center justify-center shrink-0 ${
                                    event.type === 'order' ? 'text-primary bg-primary/5 border-primary/10' :
                                    event.type === 'status' ? 'text-emerald-500 bg-emerald-500/5 border-emerald-500/10' :
                                    'text-blue-500 bg-blue-500/5 border-blue-500/10'
                                }`}>
                                    {event.type === 'order' ? <Package className="size-5" /> :
                                     event.type === 'status' ? <CheckCircle className="size-5" /> :
                                     <Shield className="size-5" />}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-1">
                                        <h3 className="text-lg font-black text-white uppercase tracking-tighter group-hover:text-primary transition-colors">
                                            {event.title}
                                        </h3>
                                        <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-black uppercase tracking-widest text-slate-600 border border-white/5">
                                            {event.type}
                                        </span>
                                    </div>
                                    <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                                        {event.description}
                                    </p>
                                </div>

                                {/* Date/Time */}
                                <div className="flex flex-col sm:items-end shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5">
                                    <p className="text-[13px] font-black text-white uppercase tracking-tight leading-none mb-1 text-slate-400 group-hover:text-white transition-colors">
                                        {event.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest leading-none">
                                        {event.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>

                                {/* Link */}
                                {event.link && (
                                    <Link 
                                        href={event.link}
                                        className="inline-flex size-10 rounded-xl bg-white/3 hover:bg-white/10 border border-white/5 items-center justify-center text-slate-600 hover:text-white transition-all ml-0 sm:ml-4"
                                    >
                                        <ArrowUpRight className="size-4" />
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredEvents.length === 0 && (
                        <div className="text-center py-24 bg-[#0D0D0D] border border-dashed border-white/5 rounded-3xl">
                            <Clock className="size-12 text-slate-800 mx-auto mb-4" />
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-1">No Activity Found</h3>
                            <p className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">Your history is currently empty</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
