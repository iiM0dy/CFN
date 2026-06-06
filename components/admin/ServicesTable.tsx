"use client"

import { Wrench, Search, Plus, Edit3, Trash2, Gamepad2, Tag, Loader2, Save, X, Star, List } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { useState } from "react";

interface Service {
    id: string;
    name: string;
    description: string | null;
    basePrice: any;
    game: { name: string };
    isFeatured: boolean;
}

interface Game {
    id: string;
    name: string;
}

interface ServicesTableProps {
    initialServices: Service[];
    games: Game[];
}

const DEFAULT_PLATFORMS = ["PC", "PlayStation", "Xbox", "Nintendo Switch"];
const DEFAULT_SPEEDS = ["standard", "express", "instant"];

export default function ServicesTable({ initialServices, games }: ServicesTableProps) {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [isProcessing, setIsProcessing] = useState<string | null>(null);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreateSheet, setShowCreateSheet] = useState(false);

    const [newService, setNewService] = useState({
        name: "",
        gameId: games[0]?.id || "",
        basePrice: "",
        description: "",
        image: "",
        platforms: ["PC"] as string[],
        completionMethods: ["standard"] as string[],
        maxQuantity: "15",
        isFeatured: false,
    });

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const resetCreateForm = () => {
        setNewService({
            name: "",
            gameId: games[0]?.id || "",
            basePrice: "",
            description: "",
            image: "",
            platforms: ["PC"],
            completionMethods: ["standard"],
            maxQuantity: "15",
            isFeatured: false,
        });
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newService.name || !newService.gameId || !newService.basePrice) {
            return toast.error("Please fill in all required fields.");
        }

        setIsProcessing("create");
        const promise = fetch("/api/admin/services", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: newService.name,
                gameId: newService.gameId,
                basePrice: Number(newService.basePrice),
                description: newService.description || null,
                image: newService.image || null,
                platforms: newService.platforms,
                completionMethods: newService.completionMethods,
                maxQuantity: Number(newService.maxQuantity) || 15,
                isFeatured: newService.isFeatured,
            }),
        });

        toast.promise(promise, {
            loading: "Creating service...",
            success: (res) => {
                if (!res.ok) throw new Error("Creation failed");
                return res.json();
            },
            error: "Failed to create service.",
        });

        try {
            const res = await promise;
            if (res.ok) {
                const created = await res.json();
                const newSvc = created.data ?? created;
                const gameName = games.find(g => g.id === newService.gameId)?.name || "";
                setServices(prev => [...prev, {
                    ...newSvc,
                    game: { name: gameName },
                }]);
                setShowCreateSheet(false);
                resetCreateForm();
            }
        } finally {
            setIsProcessing(null);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        setIsProcessing(id);
        const promise = fetch(`/api/admin/services/${id}`, {
            method: "DELETE",
        });

        toast.promise(promise, {
            loading: `Removing ${name}...`,
            success: (res) => {
                if (!res.ok) throw new Error("Deletion failed");
                setServices(prev => prev.filter(s => s.id !== id));
                return `Service "${name}" removed.`;
            },
            error: 'Failed to delete service.',
        });

        await promise.finally(() => setIsProcessing(null));
    };

    const handleUpdateService = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingService) return;

        setIsProcessing(editingService.id);
        const promise = fetch(`/api/admin/services/${editingService.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: editingService.name,
                basePrice: editingService.basePrice,
                description: editingService.description,
                isFeatured: editingService.isFeatured
            }),
        });

        toast.promise(promise, {
            loading: "Updating service details...",
            success: (res) => {
                if (!res.ok) throw new Error("Update failed");
                setServices(prev => prev.map(s => s.id === editingService.id ? editingService : s));
                setEditingService(null);
                return "Service details updated.";
            },
            error: "Failed to update service.",
        });

        await promise.finally(() => setIsProcessing(null));
    };

    const toggleArrayItem = (arr: string[], item: string): string[] => {
        return arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];
    };

    return (
        <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0D0D0D] border border-white/5 p-6 rounded-3xl">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                        <Wrench className="size-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-white uppercase italic tracking-tight">Manage Services</h2>
                        <p className="text-slate-500 text-[14px] font-bold uppercase tracking-widest">Active services: {services.length}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Find service..."
                            className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-[14px] text-white focus:border-emerald-500/50 outline-none w-full md:w-80 transition-all font-medium placeholder:text-slate-800"
                        />
                    </div>
                    <button
                        onClick={() => { resetCreateForm(); setShowCreateSheet(true); }}
                        className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-[14px] font-black text-white transition-all uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                        <Plus className="size-4" />
                        New Service
                    </button>
                </div>
            </div>

            {/* Services Table */}
            <div className="bg-[#0D0D0D] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Table>
                    <TableHeader className="bg-white/2 border-b border-white/5">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="px-8 h-12 text-[14px] font-black text-slate-500 uppercase tracking-[0.2em]">Service Name</TableHead>
                            <TableHead className="px-8 h-12 text-[14px] font-black text-slate-500 uppercase tracking-[0.2em]">Game</TableHead>
                            <TableHead className="px-8 h-12 text-[14px] font-black text-slate-500 uppercase tracking-[0.2em]">Price</TableHead>
                            <TableHead className="px-8 h-12 text-[14px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</TableHead>
                            <TableHead className="px-8 h-12 text-[14px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredServices.map((service) => (
                            <TableRow key={service.id} className="hover:bg-white/1 border-b border-white/5 transition-colors group">
                                <TableCell className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-xl bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/5 text-[14px] font-black text-emerald-500 group-hover:border-emerald-500/30 transition-all uppercase">
                                            {service.name[0]}{service.name[1]}
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-black text-white uppercase tracking-tight flex items-center gap-2">
                                                {service.name}
                                                {service.isFeatured && <Star className="size-3 text-yellow-500 fill-yellow-500" />}
                                            </p>
                                            <p className="text-[14px] text-slate-600 font-bold uppercase tracking-tighter mt-0.5">ID: {service.id.slice(0, 8).toUpperCase()}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-8 py-6">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 w-fit">
                                        <Gamepad2 className="size-3 text-slate-400" />
                                        <span className="text-[14px] font-black text-slate-300 uppercase tracking-tight">{service.game.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-8 py-6">
                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-[14px] font-black text-white tracking-tighter">${Number(service.basePrice).toFixed(2)}</p>
                                        <p className="text-[14px] text-slate-600 font-bold uppercase tracking-widest italic flex items-center gap-1">
                                            <Tag className="size-2.5" />
                                            Base Price
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-8 py-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[14px] font-black uppercase tracking-widest">
                                        <div className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        Active
                                    </div>
                                </TableCell>
                                <TableCell className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => setEditingService(service)}
                                            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all cursor-pointer" title="Edit Service"
                                        >
                                            <Edit3 className="size-4" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                toast.error(`Delete Service`, {
                                                    description: `Are you sure you want to delete ${service.name}?`,
                                                    action: {
                                                        label: 'Confirm Delete',
                                                        onClick: () => handleDelete(service.id, service.name)
                                                    }
                                                });
                                            }}
                                            disabled={isProcessing === service.id}
                                            className="p-2.5 bg-primary/5 hover:bg-primary border border-primary/20 rounded-xl text-primary hover:text-white transition-all cursor-pointer" title="Delete Service"
                                        >
                                            {isProcessing === service.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredServices.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-16 text-slate-600 font-bold uppercase tracking-widest text-[14px]">
                                    No services found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Create Service Sheet */}
            <Sheet open={showCreateSheet} onOpenChange={(open) => { if (!open) { setShowCreateSheet(false); resetCreateForm(); } }}>
                <SheetContent className="w-full sm:max-w-xl bg-[#080808] border-white/5 text-white overflow-y-auto custom-scrollbar">
                    <SheetHeader className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-6 w-1 bg-emerald-500 rounded-full" />
                            <SheetTitle className="text-xl font-black uppercase italic tracking-tighter text-white">New Service</SheetTitle>
                        </div>
                        <SheetDescription className="text-slate-500 text-[14px] font-bold uppercase tracking-widest">
                            Create a new service listing
                        </SheetDescription>
                    </SheetHeader>

                    <form onSubmit={handleCreate} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[14px] font-black text-slate-500 uppercase tracking-widest pl-1">Service Name *</label>
                                <input
                                    value={newService.name}
                                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                                    placeholder="e.g. Level Boost"
                                    required
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-[14px] text-white focus:border-emerald-500 transition-all outline-none font-bold placeholder:text-slate-700"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-black text-slate-500 uppercase tracking-widest pl-1">Game *</label>
                                <select
                                    value={newService.gameId}
                                    onChange={(e) => setNewService({ ...newService, gameId: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-[14px] text-white focus:border-emerald-500 transition-all outline-none font-bold appearance-none"
                                >
                                    {games.map((game) => (
                                        <option key={game.id} value={game.id} className="bg-[#080808]">{game.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-black text-slate-500 uppercase tracking-widest pl-1">Base Price ($) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={newService.basePrice}
                                    onChange={(e) => setNewService({ ...newService, basePrice: e.target.value })}
                                    placeholder="0.00"
                                    required
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-[14px] text-white focus:border-emerald-500 transition-all outline-none font-bold placeholder:text-slate-700"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-black text-slate-500 uppercase tracking-widest pl-1">Description</label>
                                <textarea
                                    value={newService.description}
                                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                    placeholder="Optional description..."
                                    className="w-full h-24 bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-[14px] text-white focus:border-emerald-500 transition-all outline-none font-bold resize-none placeholder:text-slate-700"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-black text-slate-500 uppercase tracking-widest pl-1">Image URL</label>
                                <input
                                    type="url"
                                    value={newService.image}
                                    onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-[14px] text-white focus:border-emerald-500 transition-all outline-none font-bold placeholder:text-slate-700"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[14px] font-black text-slate-500 uppercase tracking-widest pl-1">Max Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={newService.maxQuantity}
                                    onChange={(e) => setNewService({ ...newService, maxQuantity: e.target.value })}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-[14px] text-white focus:border-emerald-500 transition-all outline-none font-bold"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[14px] font-black text-slate-500 uppercase tracking-widest pl-1">Platforms *</label>
                                <div className="flex flex-wrap gap-2">
                                    {DEFAULT_PLATFORMS.map((platform) => (
                                        <button
                                            key={platform}
                                            type="button"
                                            onClick={() => setNewService({ ...newService, platforms: toggleArrayItem(newService.platforms, platform) })}
                                            className={`px-4 py-2 rounded-xl text-[14px] font-bold border transition-all cursor-pointer ${newService.platforms.includes(platform)
                                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                                                : "bg-white/5 border-white/5 text-slate-500 hover:text-white"
                                                }`}
                                        >
                                            {platform}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[14px] font-black text-slate-500 uppercase tracking-widest pl-1">Completion Methods *</label>
                                <div className="flex flex-wrap gap-2">
                                    {DEFAULT_SPEEDS.map((speed) => (
                                        <button
                                            key={speed}
                                            type="button"
                                            onClick={() => setNewService({ ...newService, completionMethods: toggleArrayItem(newService.completionMethods, speed) })}
                                            className={`px-4 py-2 rounded-xl text-[14px] font-bold border capitalize transition-all cursor-pointer ${newService.completionMethods.includes(speed)
                                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                                                : "bg-white/5 border-white/5 text-slate-500 hover:text-white"
                                                }`}
                                        >
                                            {speed}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={newService.isFeatured}
                                    onChange={(e) => setNewService({ ...newService, isFeatured: e.target.checked })}
                                    className="size-4 rounded border-white/10 bg-white/5 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                                />
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-black text-white uppercase tracking-tight">Featured Service</span>
                                    <span className="text-[14px] text-slate-500 font-bold">Display this service prominently on the homepage.</span>
                                </div>
                            </label>
                        </div>

                        <SheetFooter className="pt-6 flex flex-col gap-3">
                            <button
                                type="submit"
                                disabled={isProcessing === "create"}
                                className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 rounded-2xl flex items-center justify-center text-white font-black text-[14px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer gap-2"
                            >
                                {isProcessing === "create" ? <Loader2 className="size-5 animate-spin" /> : <Save className="size-5" />}
                                Create Service
                            </button>
                            <button
                                type="button"
                                onClick={() => { setShowCreateSheet(false); resetCreateForm(); }}
                                className="w-full h-12 bg-white/5 border border-white/5 text-slate-400 font-bold text-[14px] uppercase tracking-widest hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                                <X className="size-4" />
                                Cancel
                            </button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>

            {/* Edit Service Sheet */}
            <Sheet open={!!editingService} onOpenChange={(open) => !open && setEditingService(null)}>
                <SheetContent className="w-full sm:max-w-xl bg-[#080808] border-white/5 text-white">
                    <SheetHeader className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-6 w-1 bg-emerald-500 rounded-full" />
                            <SheetTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Edit Service</SheetTitle>
                        </div>
                        <SheetDescription className="text-slate-500 text-[14px] font-bold uppercase tracking-widest">
                            Update details for {editingService?.name}
                        </SheetDescription>
                    </SheetHeader>

                    {editingService && (
                        <form onSubmit={handleUpdateService} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[14px] font-black text-slate-500 uppercase tracking-widest pl-1">Service Name</label>
                                    <input
                                        value={editingService.name}
                                        onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-[14px] text-white focus:border-emerald-500 transition-all outline-none font-bold"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[14px] font-black text-slate-500 uppercase tracking-widest pl-1">Base Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={editingService.basePrice}
                                        onChange={(e) => setEditingService({ ...editingService, basePrice: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-[14px] text-white focus:border-emerald-500 transition-all outline-none font-bold"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[14px] font-black text-slate-500 uppercase tracking-widest pl-1">Description</label>
                                    <textarea
                                        value={editingService.description || ""}
                                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                        className="w-full h-32 bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-[14px] text-white focus:border-emerald-500 transition-all outline-none font-bold resize-none"
                                    />
                                </div>
                                
                                <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={editingService.isFeatured}
                                        onChange={(e) => setEditingService({ ...editingService, isFeatured: e.target.checked })}
                                        className="size-4 rounded border-white/10 bg-white/5 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-black text-white uppercase tracking-tight">Featured Service</span>
                                        <span className="text-[14px] text-slate-500 font-bold">Display this service prominently on the homepage.</span>
                                    </div>
                                </label>
                            </div>

                            <SheetFooter className="pt-6 flex flex-col gap-3">
                                <button
                                    type="submit"
                                    disabled={isProcessing === editingService.id}
                                    className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 rounded-2xl flex items-center justify-center text-white font-black text-[14px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer gap-2"
                                >
                                    {isProcessing === editingService.id ? <Loader2 className="size-5 animate-spin" /> : <Save className="size-5" />}
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingService(null)}
                                    className="w-full h-12 bg-white/5 border border-white/5 text-slate-400 font-bold text-[14px] uppercase tracking-widest hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <X className="size-4" />
                                    Cancel
                                </button>
                            </SheetFooter>
                        </form>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
