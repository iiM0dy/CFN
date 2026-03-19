"use client"

import { Package, Eye, CheckCircle2, Clock, MoreHorizontal, ShoppingBag, Search, Download, XCircle, Trash2, Mail, User, Shield, Info, ClipboardList } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useState, useMemo } from "react";

interface Order {
    id: string;
    status: string;
    totalPrice: any;
    quantity: number;
    platform: string | null;
    completionMethod: string | null;
    completionSpeed: string | null;
    orderNotes?: string | null;
    promoCode: string | null;
    discount: any;
    selectedOptions: any;
    createdAt: any;
    service: {
        name: string;
        game: {
            name: string;
        };
    };
    user: {
        name: string | null;
        email: string | null;
    } | null;
}

interface OrdersTableProps {
    initialOrders: Order[];
}

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Filter Logic
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const searchStr = searchTerm.toLowerCase();
            return (
                order.id.toLowerCase().includes(searchStr) ||
                (order.user?.email?.toLowerCase() || "").includes(searchStr) ||
                (order.user?.email?.toLowerCase() || "").includes(searchStr) ||
                order.service.name.toLowerCase().includes(searchStr)
            );
        });
    }, [orders, searchTerm]);

    const updateOrderStatus = async (id: string, newStatus: string) => {
        setIsUpdating(id);
        const promise = fetch(`/api/admin/orders/${id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });

        toast.promise(promise, {
            loading: `Updating order status to ${newStatus}...`,
            success: (res) => {
                if (!res.ok) throw new Error("Failed to update");
                setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
                return `Order #${id.slice(-8).toUpperCase()} is now ${newStatus}.`;
            },
            error: 'Could not update order status.',
        });

        await promise.finally(() => setIsUpdating(null));
    };

    const handleDeleteOrder = async (id: string) => {
        const promise = fetch(`/api/admin/orders/${id}`, {
            method: "DELETE",
        });

        toast.promise(promise, {
            loading: `Deleting order #${id.slice(-8).toUpperCase()}...`,
            success: (res) => {
                if (!res.ok) throw new Error("Deletion failed");
                setOrders(prev => prev.filter(o => o.id !== id));
                return `Order #${id.slice(-8).toUpperCase()} has been deleted.`;
            },
            error: 'Failed to delete order.',
        });
    };

    const handleExport = () => {
        if (orders.length === 0) return toast.error("No orders to export.");

        const headers = ["Order ID", "Service", "Game", "Customer", "Email", "Status", "Price", "Date"];
        const rows = orders.map(o => [
            o.id,
            o.service.name,
            o.service.game.name,
            o.user?.email || "Anonymous",
            o.user?.email || "N/A",
            o.status,
            o.totalPrice,
            new Date(o.createdAt).toLocaleString()
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `orders_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Orders exported successfully.");
    };

    return (
        <div className="space-y-8">
            {/* Header / Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0D0D0D] border border-white/5 p-6 rounded-3xl">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <ShoppingBag className="size-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-white uppercase italic tracking-tight">Customer Orders</h2>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Total: {filteredOrders.length} orders</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search orders..."
                            className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-xs text-white focus:border-primary/50 outline-none w-full md:w-80 transition-all font-medium placeholder:text-slate-800"
                        />
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-[#8a0e1d] rounded-2xl text-[10px] font-black text-white transition-all uppercase tracking-[0.2em] shadow-lg shadow-primary/20 cursor-pointer"
                    >
                        <Download className="size-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#0D0D0D] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Table>
                    <TableHeader className="bg-white/2 border-b border-white/5">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="px-8 h-12 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Order ID</TableHead>
                            <TableHead className="px-8 h-12 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Service</TableHead>
                            <TableHead className="px-8 h-12 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Customer</TableHead>
                            <TableHead className="px-8 h-12 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</TableHead>
                            <TableHead className="px-8 h-12 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Date</TableHead>
                            <TableHead className="px-8 h-12 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Price</TableHead>
                            <TableHead className="px-8 h-12 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-32 border-none">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="size-16 rounded-full bg-white/5 flex items-center justify-center text-slate-700">
                                            <Package className="size-8" />
                                        </div>
                                        <div>
                                            <p className="text-white font-black uppercase tracking-widest italic text-sm">No orders found</p>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredOrders.map((order) => (
                                <TableRow key={order.id} className="hover:bg-white/1 border-b border-white/5 transition-colors group">
                                    <TableCell className="px-8 py-6 font-mono text-[10px] font-bold text-slate-500 group-hover:text-primary transition-colors">
                                        #{order.id.slice(-8).toUpperCase()}
                                    </TableCell>
                                    <TableCell className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-xl bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/5 text-[10px] font-black text-slate-400 group-hover:border-primary/30 transition-all">
                                                {order.service.game.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-white uppercase tracking-tight">{order.service.name}</p>
                                                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter mt-0.5">{order.service.game.name} • {order.platform}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black text-slate-400">
                                                {(order.user?.email || "A")[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-200">{order.user?.email || "Anonymous"}</p>
                                                <p className="text-[9px] font-mono text-slate-600 italic">{order.user?.email || "N/A"}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-8 py-6">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest ${order.status === "paid" || order.status === "completed"
                                            ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20"
                                            : order.status === "cancelled"
                                                ? "bg-red-500/5 text-red-500 border-red-500/20"
                                                : "bg-amber-500/5 text-amber-500 border-amber-500/20"
                                            }`}>
                                            <div className={`size-1.5 rounded-full ${order.status === "paid" || order.status === "completed"
                                                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                                : order.status === "cancelled"
                                                    ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                                                    : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                                                }`} />
                                            {order.status === "paid" ? "Confirmed" : order.status === "completed" ? "Completed" : order.status === "cancelled" ? "Cancelled" : "Pending"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-[9px] tracking-tighter">
                                            <Clock className="size-3" />
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-8 py-6">
                                        <p className="text-sm font-black text-white tracking-tighter">${Number(order.totalPrice).toFixed(2)}</p>
                                        <p className="text-[9px] text-primary font-bold uppercase tracking-widest italic">{order.quantity} Units</p>
                                    </TableCell>
                                    <TableCell className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all group/btn cursor-pointer" title="View Details"
                                            >
                                                <Eye className="size-4 group-hover/btn:scale-110 transition-transform" />
                                            </button>
                                            <button
                                                onClick={() => updateOrderStatus(order.id, 'completed')}
                                                disabled={order.status === 'completed' || isUpdating === order.id}
                                                className={`p-2.5 rounded-xl transition-all group/btn cursor-pointer ${order.status === 'completed'
                                                    ? 'opacity-30 cursor-not-allowed bg-white/5 text-slate-500'
                                                    : 'bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/20 text-emerald-500 hover:text-white'
                                                    }`}
                                                title="Mark Completed"
                                            >
                                                <CheckCircle2 className="size-4 group-hover/btn:scale-110 transition-transform" />
                                            </button>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all cursor-pointer">
                                                        <MoreHorizontal className="size-4" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56 bg-[#0D0D0D] border-white/5 text-slate-300">
                                                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">More Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator className="bg-white/5" />
                                                    <DropdownMenuItem
                                                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                                        disabled={order.status === 'cancelled'}
                                                        className="gap-2 focus:bg-red-500/10 focus:text-red-500 cursor-pointer"
                                                    >
                                                        <XCircle className="size-4" />
                                                        <span className="text-xs font-bold uppercase">Cancel Order</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            toast.error(`Delete Order`, {
                                                                description: `Are you sure you want to delete Order #${order.id.slice(-8).toUpperCase()}?`,
                                                                action: {
                                                                    label: 'Delete',
                                                                    onClick: () => handleDeleteOrder(order.id)
                                                                }
                                                            });
                                                        }}
                                                        className="gap-2 focus:bg-red-600 focus:text-white text-primary cursor-pointer"
                                                    >
                                                        <Trash2 className="size-4" />
                                                        <span className="text-xs font-bold uppercase">Delete Permanently</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-white/5" />
                                                    <DropdownMenuItem
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="gap-2 focus:bg-white/5 cursor-pointer"
                                                    >
                                                        <Info className="size-4" />
                                                        <span className="text-xs font-bold uppercase">Full Details</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Details Sheet */}
            <Sheet open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
                <SheetContent className="w-full sm:max-w-xl bg-[#080808] border-white/5 text-white overflow-y-auto custom-scrollbar">
                    <SheetHeader className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-6 w-1 bg-primary rounded-full" />
                            <SheetTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Order Details</SheetTitle>
                        </div>
                        <SheetDescription className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                            Information for Order #{selectedOrder?.id.slice(-8).toUpperCase()}
                        </SheetDescription>
                    </SheetHeader>

                    {selectedOrder && (
                        <div className="space-y-8">
                            {/* Status Card */}
                            <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <Shield className="size-3 text-primary" />
                                    Current Status
                                </h4>
                                <div className="flex items-center justify-between">
                                    <div className={`px-4 py-2 rounded-xl border font-black text-xs uppercase tracking-widest ${selectedOrder.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                        selectedOrder.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                        }`}>
                                        {selectedOrder.status}
                                    </div>
                                    <p className="text-xs font-bold text-slate-400">
                                        Placed on: {new Date(selectedOrder.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Customer Details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/2 rounded-2xl p-5 border border-white/5">
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Customer</p>
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-black uppercase text-[10px]">
                                            {(selectedOrder.user?.email || "A")[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-white leading-none">{selectedOrder.user?.email || "Anonymous"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/2 rounded-2xl p-5 border border-white/5">
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Order Total</p>
                                    <p className="text-xl font-black text-white tracking-tighter">${Number(selectedOrder.totalPrice).toFixed(2)}</p>
                                    <p className="text-[9px] text-emerald-500 font-bold uppercase italic mt-1">{selectedOrder.quantity} Units</p>
                                </div>
                            </div>

                            {/* Service Details */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <ClipboardList className="size-3 text-primary" />
                                    Order Configuration
                                </h4>
                                <div className="bg-white/2 rounded-3xl p-6 border border-white/5 space-y-6">
                                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">Service</p>
                                            <p className="text-xs font-bold text-white uppercase">{selectedOrder.service.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">Game</p>
                                            <p className="text-xs font-bold text-white uppercase">{selectedOrder.service.game.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">Platform</p>
                                            <p className="text-xs font-bold text-white uppercase">{selectedOrder.platform || "Standard"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">Speed</p>
                                            <p className="text-xs font-bold text-white uppercase">{selectedOrder.completionSpeed || "Standard"}</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 italic">Selected Options</p>
                                        <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-2">
                                            {selectedOrder.selectedOptions ? (
                                                Object.entries(selectedOrder.selectedOptions as any).map(([key, value]: [string, any]) => (
                                                    <div key={key} className="flex justify-between items-center text-[11px]">
                                                        <span className="text-slate-500 font-bold uppercase">{key.replace(/_/g, ' ')}</span>
                                                        <span className="text-white font-black uppercase text-right pl-4">{String(value)}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-[10px] text-slate-700 italic font-medium">No custom options selected.</p>
                                            )}
                                        </div>
                                    </div>

                                    {selectedOrder.orderNotes && selectedOrder.orderNotes.trim().length > 0 && (
                                        <div className="pt-6 border-t border-white/5">
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 italic">Order Notes</p>
                                            <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                                                <p className="text-[12px] text-slate-200 leading-relaxed whitespace-pre-wrap">
                                                    {selectedOrder.orderNotes}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <SheetFooter className="mt-10 pt-6 border-t border-white/5">
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => updateOrderStatus(selectedOrder!.id, 'completed')}
                                disabled={selectedOrder?.status === 'completed'}
                                className="flex-1 h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-widest transition-all disabled:opacity-30 cursor-pointer"
                            >
                                Mark as Completed
                            </button>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="flex-1 h-12 rounded-2xl bg-white/5 border border-white/5 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-white transition-all cursor-pointer"
                            >
                                Close Details
                            </button>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
