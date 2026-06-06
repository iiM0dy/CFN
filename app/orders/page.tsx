"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Package, Clock, CheckCircle, XCircle, Loader2, ArrowRight, Lock } from "lucide-react"

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
        return <Clock className="size-3.5 text-amber-400" />
      case 'active':
        return <Loader2 className="size-3.5 text-blue-400 animate-spin" />
      case 'completed':
        return <CheckCircle className="size-3.5 text-emerald-400" />
      case 'cancelled':
        return <XCircle className="size-3.5 text-red-400" />
      default:
        return <Package className="size-3.5 text-slate-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      case 'active':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    }
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    if (filter === 'active') return order.status === 'pending' || order.status === 'active'
    if (filter === 'completed') return order.status === 'completed'
    return true
  })

  const activeCt = orders.filter(o => o.status === 'pending' || o.status === 'active').length
  const completedCt = orders.filter(o => o.status === 'completed').length

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-white/[0.06] border-t-primary animate-spin" />
          <p className="text-xs text-slate-500">Loading orders...</p>
        </div>
      </div>
    )
  }

  const tabs: { key: typeof filter; label: string; count: number }[] = [
    { key: 'all', label: 'All Orders', count: orders.length },
    { key: 'active', label: 'Active', count: activeCt },
    { key: 'completed', label: 'Completed', count: completedCt },
  ]

  return (
    <div className="bg-noise min-h-screen text-white" style={{ background: 'linear-gradient(180deg, #080808 0%, #060608 50%, #080808 100%)' }}>
      <main className="relative z-10 grow w-full px-6 lg:px-10 pt-8 pb-16 max-w-[1440px] mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-slate-700">/</span>
          <span className="text-slate-300 font-medium">My Orders</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="h-px w-12 bg-primary mb-4" />
          <h1 className="font-cairo text-3xl md:text-4xl font-bold text-white tracking-tight uppercase mb-2">
            My <span className="text-primary">Orders</span>
          </h1>
          <p className="text-sm text-slate-400">Track and manage your service orders.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 mb-8 border-b border-white/[0.06]">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              aria-label={`Show ${tab.label.toLowerCase()}`}
              className={`pb-3 px-4 text-xs font-semibold transition-colors relative cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary ${
                filter === tab.key
                  ? 'text-white'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-[10px] ${filter === tab.key ? 'text-primary' : 'text-slate-600'}`}>
                {tab.count}
              </span>
              {filter === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {status === 'unauthenticated' ? (
          /* Login required */
          <div className="py-20 text-center rounded-xl border border-white/[0.06] bg-[#0a0a0a]">
            <div className="size-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="size-5 text-primary/50" />
            </div>
            <h3 className="font-cairo text-lg font-bold text-white uppercase tracking-tight mb-1.5">Sign in Required</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
              Log in to your account to view your active orders and history.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/login"
                className="min-h-[44px] px-6 flex items-center justify-center bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/"
                className="min-h-[44px] px-6 flex items-center justify-center bg-white/[0.04] border border-white/[0.06] text-white text-sm font-medium rounded-lg hover:bg-white/[0.07] transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : filteredOrders.length === 0 ? (
          /* Empty state */
          <div className="py-20 text-center rounded-xl border border-white/[0.06] bg-[#0a0a0a]">
            <div className="size-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
              <Package className="size-5 text-slate-600" />
            </div>
            <h3 className="font-cairo text-lg font-bold text-white uppercase tracking-tight mb-1.5">No Orders Found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
              {filter === 'all'
                ? "You haven't placed any orders yet."
                : `No ${filter} orders to show.`}
            </p>
            <Link
              href="/#games"
              className="inline-flex items-center gap-1.5 min-h-[44px] px-5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Browse Services
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        ) : (
          /* Orders list */
          <div className="space-y-3">
            {filteredOrders.map((order) => {
              const hasImage = order.service.image && (order.service.image.includes('://') || order.service.image.startsWith('/'))
              const serviceSlug = order.service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

              return (
                <div
                  key={order.id}
                  className="card-lift group bg-[#0a0a0a] border border-white/[0.06] rounded-xl overflow-hidden hover:border-primary/30 transition-all"
                >
                  {/* Red top accent */}
                  <div className="h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40 transition-all duration-500" />

                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
                    {/* Service image */}
                    {hasImage && (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-white/[0.06] shrink-0 bg-[#0e0e0e]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={order.service.image!}
                          alt={order.service.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                        <div className="min-w-0">
                          <h3 className="font-cairo text-lg font-bold text-white uppercase tracking-tight leading-tight group-hover:text-primary transition-colors truncate">
                            {order.service.name}
                          </h3>
                          <p className="text-[11px] text-slate-500 mt-0.5">{order.service.game.name}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold capitalize self-start shrink-0 ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </div>

                      {/* Meta row */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] mb-4">
                        <div>
                          <span className="text-slate-600">Order</span>
                          <span className="ml-1.5 text-slate-300 font-mono">#{order.id.slice(0, 8).toUpperCase()}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Qty</span>
                          <span className="ml-1.5 text-slate-300">{order.quantity}×</span>
                        </div>
                        {order.platform && (
                          <div>
                            <span className="text-slate-600">Platform</span>
                            <span className="ml-1.5 text-slate-300 capitalize">{order.platform}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-slate-600">Total</span>
                          <span className="ml-1.5 text-white font-bold">${Number(order.totalPrice).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-white/[0.04] gap-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                          <Clock className="size-3" />
                          <span>
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <Link
                          href={`/services/${encodeURIComponent(serviceSlug)}`}
                          className="inline-flex items-center gap-1.5 min-h-[36px] px-3.5 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-primary hover:border-primary text-xs font-semibold text-slate-300 hover:text-white transition-all"
                        >
                          View Service
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
