"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Package, Clock, CheckCircle, XCircle, Loader2, ChevronRight } from "lucide-react"

interface Order {
  id: string
  status: string
  totalPrice: number
  quantity: number
  platform?: string
  completionMethod?: string
  completionSpeed?: string
  createdAt: string
  completedAt?: string
  service: {
    name: string
    image?: string
    game: {
      name: string
      slug: string
    }
  }
}

export default function MyOrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  useEffect(() => {
    // Guest access allowed, handled in UI
  }, [status]);

  useEffect(() => {
    if (session?.user) {
      fetchOrders()
    }
  }, [session])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="size-5 text-yellow-500" />
      case 'active':
        return <Loader2 className="size-5 text-blue-500 animate-spin" />
      case 'completed':
        return <CheckCircle className="size-5 text-green-500" />
      case 'cancelled':
        return <XCircle className="size-5 text-red-500" />
      default:
        return <Package className="size-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'active':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    if (filter === 'active') return order.status === 'pending' || order.status === 'active'
    if (filter === 'completed') return order.status === 'completed'
    return true
  })

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center">
        <Loader2 className="size-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white font-[family-name:var(--font-space-grotesk)]">
      <main className="flex-grow w-full px-6 lg:px-10 py-8 max-w-[1440px] mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="size-3" />
          <span className="text-white">My Orders</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">My Orders</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Track and manage your service orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-6 mb-10 border-b border-white/5">
          <button
            onClick={() => setFilter('all')}
            className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'all'
              ? 'text-primary border-b-2 border-primary -mb-px'
              : 'text-slate-600 hover:text-white'
              }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'active'
              ? 'text-primary border-b-2 border-primary -mb-px'
              : 'text-slate-600 hover:text-white'
              }`}
          >
            Active ({orders.filter(o => o.status === 'pending' || o.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'completed'
              ? 'text-primary border-b-2 border-primary -mb-px'
              : 'text-slate-600 hover:text-white'
              }`}
          >
            Completed ({orders.filter(o => o.status === 'completed').length})
          </button>
        </div>

        {/* Orders List */}
        {status === 'unauthenticated' ? (
          <div className="text-center py-24 bg-[#0D0D0D] border border-dashed border-white/10 rounded-[2.5rem] shadow-2xl">
            <div className="size-20 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-6 border border-primary/10">
              <span className="material-symbols-outlined text-primary text-4xl">fingerprint</span>
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-4">IDENTITY UNKNOWN</h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-10 max-w-sm mx-auto leading-relaxed">
              Connect your neural link to track active deployments and access historical operation data.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="px-8 py-4 bg-primary hover:bg-[#8a0e1d] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all shadow-xl shadow-primary/20"
              >
                INITIATE AUTH
              </Link>
              <Link
                href="/"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all border border-white/5"
              >
                RETURN TO BASE
              </Link>
            </div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-32 bg-[#0D0D0D] border border-dashed border-white/10 rounded-[2.5rem] shadow-2xl">
            <Package className="size-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">No orders found</h3>
            <p className="text-slate-500 mb-8 uppercase tracking-widest text-[10px] font-bold">No active deployments detected in this sector</p>
            <Link
              href="/#games"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-[#8a0e1d] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-primary/20"
            >
              Browse Services
              <ChevronRight className="size-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-[#0D0D0D] border border-white/5 rounded-3xl p-6 sm:p-8 hover:border-primary/30 transition-all shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="flex flex-col md:flex-row gap-8 relative z-10">
                  {/* Service Image */}
                  {order.service.image && (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-white/5 shrink-0 bg-[#080808]">
                      <img
                        src={order.service.image}
                        alt={order.service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Order Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-white mb-1 uppercase tracking-tighter">{order.service.name}</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{order.service.game.name}</p>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest self-start ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-6">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <span className="text-slate-500 block mb-2 text-[9px] font-black uppercase tracking-widest">Order ID</span>
                        <span className="text-white font-mono text-xs font-bold">#{order.id.slice(0, 8).toUpperCase()}</span>
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <span className="text-slate-500 block mb-2 text-[9px] font-black uppercase tracking-widest">Quantity</span>
                        <span className="text-white font-black text-xs">{order.quantity}x</span>
                      </div>
                      {order.platform && (
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                          <span className="text-slate-500 block mb-2 text-[9px] font-black uppercase tracking-widest">Platform</span>
                          <span className="text-white font-black text-xs uppercase">{order.platform}</span>
                        </div>
                      )}
                      <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20">
                        <span className="text-primary/70 block mb-2 text-[9px] font-black uppercase tracking-widest">Total</span>
                        <span className="text-primary font-black text-lg leading-none">${Number(order.totalPrice).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto pt-6 border-t border-white/5 gap-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <Clock className="size-3" />
                        <span>Ordered {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                      <Link
                        href={`/services/${encodeURIComponent(order.service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}`}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-primary border border-white/5 hover:border-primary text-[10px] text-white font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg hover:shadow-primary/20 group/btn"
                      >
                        View Service
                        <ChevronRight className="size-3 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
