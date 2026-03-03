import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { ShieldCheck, Package, Clock, TrendingUp, DollarSign } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/layout/footer"

export default async function AdminOrdersPage() {
    const session = await auth()

    if ((session?.user as any)?.role !== "ADMIN") {
        return (
            <div className="flex min-h-screen flex-col">
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
                        <p className="text-muted-foreground">You need admin privileges to view this page.</p>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    const orders = await prisma.order.findMany({
        include: {
            user: true,
            items: {
                include: { product: true }
            }
        },
        orderBy: { createdAt: "desc" }
    })

    const totalRevenue = orders.reduce((acc, o) => acc + Number(o.total), 0)
    const pendingOrders = orders.filter(o => o.status === "PENDING").length
    const completedOrders = orders.filter(o => o.status === "DELIVERED").length

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 py-10">
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-8">Admin Dashboard</h1>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        <div className="p-5 rounded-xl border border-border/40 bg-card/50">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-primary/10"><Package className="h-4 w-4 text-primary" /></div>
                                <span className="text-sm text-muted-foreground">Total Orders</span>
                            </div>
                            <div className="text-2xl font-bold">{orders.length}</div>
                        </div>
                        <div className="p-5 rounded-xl border border-border/40 bg-card/50">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-yellow-500/10"><Clock className="h-4 w-4 text-yellow-500" /></div>
                                <span className="text-sm text-muted-foreground">Pending</span>
                            </div>
                            <div className="text-2xl font-bold">{pendingOrders}</div>
                        </div>
                        <div className="p-5 rounded-xl border border-border/40 bg-card/50">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-green-500/10"><TrendingUp className="h-4 w-4 text-green-500" /></div>
                                <span className="text-sm text-muted-foreground">Completed</span>
                            </div>
                            <div className="text-2xl font-bold">{completedOrders}</div>
                        </div>
                        <div className="p-5 rounded-xl border border-border/40 bg-card/50">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-primary/10"><DollarSign className="h-4 w-4 text-primary" /></div>
                                <span className="text-sm text-muted-foreground">Revenue</span>
                            </div>
                            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="rounded-xl border border-border/40 bg-card/50 overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead>Order</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Items</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead className="text-right">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                                            No orders yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    orders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-mono text-xs">#{order.id.slice(-6)}</TableCell>
                                            <TableCell>{order.user.name || order.user.email || "—"}</TableCell>
                                            <TableCell>
                                                <Badge variant={order.status === "PENDING" ? "secondary" : order.status === "PAID" ? "default" : "outline"}>
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-xs text-muted-foreground">
                                                    {order.items.map(i => i.product.name).join(", ")}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold">${Number(order.total).toFixed(2)}</TableCell>
                                            <TableCell className="text-right text-sm text-muted-foreground">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
