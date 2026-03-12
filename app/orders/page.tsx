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
    <div className="min-h-screen bg-[#0B0B0B] text-white font-[family-name:var(--font-space-grotesk)]">
      <main className="flex-grow w-full px-6 py-8 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="size-3" />
          <span className="text-gray-300">My Orders</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-2">My Orders</h1>
          <p className="text-gray-400">Track and manage your service orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#1c1c1c]">
          <button
            onClick={() => setFilter('all')}
            className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-colors ${filter === 'all'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-colors ${filter === 'active'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            Active ({orders.filter(o => o.status === 'pending' || o.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-colors ${filter === 'completed'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            Completed ({orders.filter(o => o.status === 'completed').length})
          </button>
        </div>

        {/* Orders List */}
        {status === 'unauthenticated' ? (
          <div className="text-center py-24 bg-[#141414] border border-dashed border-[#2a1a1c] rounded-2xl">
            <div className="size-20 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-4xl">fingerprint</span>
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-4 italic">IDENTITY UNKNOWN</h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-10 max-w-sm mx-auto leading-relaxed">
              Connect your neural link to track active deployments and access historical operation data.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="px-8 py-3 bg-primary hover:bg-[#8a0e1d] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl transition-all shadow-xl shadow-primary/20"
              >
                INITIATE AUTH
              </Link>
              <Link
                href="/"
                className="px-8 py-3 bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] font-black uppercase tracking-[0.3em] rounded-xl transition-all border border-white/5"
              >
                RETURN TO BASE
              </Link>
            </div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-[#141414]/50 border border-dashed border-white/5 rounded-2xl">
            <Package className="size-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6 uppercase tracking-widest text-[10px] font-black italic">No active deployments detected in this sector</p>
            <Link
              href="/games"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-[#8a0e1d] text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"
            >
              Browse Services
              <ChevronRight className="size-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-[#141414] border border-[#1c1c1c] rounded-xl p-6 hover:border-primary/50 transition-all"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Service Image */}
                  {order.service.image && (
                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-[#2a1a1c] shrink-0">
                      <img
                        src={order.service.image}
                        alt={order.service.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Order Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{order.service.name}</h3>
                        <p className="text-sm text-gray-400">{order.service.game.name}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 block mb-1">Order ID</span>
                        <span className="text-white font-mono">#{order.id.slice(0, 8)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-1">Quantity</span>
                        <span className="text-white">{order.quantity}x</span>
                      </div>
                      {order.platform && (
                        <div>
                          <span className="text-gray-500 block mb-1">Platform</span>
                          <span className="text-white">{order.platform}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500 block mb-1">Total</span>
                        <span className="text-primary font-bold text-lg">${Number(order.totalPrice).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2a1a1c]">
                      <span className="text-xs text-gray-500">
                        Ordered {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <Link
                        href={`/services/${order.service.game.slug}`}
                        className="text-sm text-primary hover:text-primary-dark font-bold uppercase flex items-center gap-1"
                      >
                        View Service
                        <ChevronRight className="size-4" />
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
