"use client";

import { useState } from "react";
import {
    Search,
    Trash2,
    Star,
    CheckCircle2,
    XCircle,
    Clock,
} from "lucide-react";
import { toast } from "sonner";
import { updateReview, deleteReview } from "@/actions/review";

interface Review {
    id: string;
    username: string;
    rating: number;
    message: string | null;
    status: "pending" | "approved" | "rejected";
    isFeatured: boolean;
    createdAt: string;
    service?: {
        id: string;
        name: string;
        game?: { name: string } | null;
    } | null;
}

interface Props {
    initialReviews: Review[];
}

type FilterStatus = "all" | "pending" | "approved" | "rejected";

export default function ReviewsTable({ initialReviews }: Props) {
    const [items, setItems] = useState(initialReviews);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterStatus>("all");

    const filtered = items.filter((r) => {
        if (filter !== "all" && r.status !== filter) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return (
            r.username.toLowerCase().includes(q) ||
            r.message?.toLowerCase().includes(q) ||
            r.service?.name?.toLowerCase().includes(q) ||
            r.service?.game?.name?.toLowerCase().includes(q)
        );
    });

    const counts = {
        all: items.length,
        pending: items.filter((r) => r.status === "pending").length,
        approved: items.filter((r) => r.status === "approved").length,
        rejected: items.filter((r) => r.status === "rejected").length,
    };

    const handleStatus = async (id: string, status: string) => {
        const res = await updateReview(id, { status });
        if (res.success) {
            setItems((prev) =>
                prev.map((r) => (r.id === id ? { ...r, status: status as Review["status"] } : r))
            );
            toast.success(`Review ${status}.`);
        } else {
            toast.error(res.error);
        }
    };

    const handleFeatured = async (id: string, current: boolean) => {
        const res = await updateReview(id, { isFeatured: !current });
        if (res.success) {
            setItems((prev) =>
                prev.map((r) => (r.id === id ? { ...r, isFeatured: !current } : r))
            );
            toast.success(!current ? "Review featured." : "Review unfeatured.");
        } else {
            toast.error(res.error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this review permanently?")) return;
        const res = await deleteReview(id);
        if (res.success) {
            setItems((prev) => prev.filter((r) => r.id !== id));
            toast.success("Review deleted.");
        } else {
            toast.error(res.error);
        }
    };

    const statusConfig: Record<string, { icon: React.ElementType; class: string; label: string }> = {
        pending: { icon: Clock, class: "bg-amber-500/10 text-amber-400 border-amber-500/20", label: "Pending" },
        approved: { icon: CheckCircle2, class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", label: "Approved" },
        rejected: { icon: XCircle, class: "bg-red-500/10 text-red-400 border-red-500/20", label: "Rejected" },
    };

    const filterTabs: { key: FilterStatus; label: string }[] = [
        { key: "all", label: "All" },
        { key: "pending", label: "Pending" },
        { key: "approved", label: "Approved" },
        { key: "rejected", label: "Rejected" },
    ];

    return (
        <div>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-4">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-600" />
                    <input
                        type="text"
                        placeholder="Search reviews..."
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-white/10 outline-none transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-1">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={`px-3 py-1.5 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                                filter === tab.key
                                    ? "bg-white/[0.08] text-white"
                                    : "text-slate-500 hover:text-white hover:bg-white/[0.03]"
                            }`}
                        >
                            {tab.label}
                            <span className="ml-1 text-[10px] text-slate-600">
                                {counts[tab.key]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#0D0D0D] border border-white/[0.06] rounded-xl overflow-hidden">
                {filtered.length === 0 ? (
                    <div className="px-4 py-14 text-center">
                        <Star className="size-5 text-slate-700 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">
                            {items.length === 0
                                ? "No reviews yet."
                                : "No reviews match your filters."}
                        </p>
                        {items.length === 0 && (
                            <p className="text-xs text-slate-600 mt-1">
                                Reviews will appear here as customers submit them.
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[700px]">
                            <thead>
                                <tr className="border-b border-white/[0.04]">
                                    <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider">
                                        Service
                                    </th>
                                    <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider w-20">
                                        Rating
                                    </th>
                                    <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider">
                                        Review
                                    </th>
                                    <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider w-24">
                                        Status
                                    </th>
                                    <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider w-20">
                                        Date
                                    </th>
                                    <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider text-right w-32">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {filtered.map((r) => {
                                    const sc = statusConfig[r.status];
                                    return (
                                        <tr
                                            key={r.id}
                                            className="hover:bg-white/[0.02] transition-colors"
                                        >
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-medium text-slate-300">
                                                    {r.username}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-slate-400">
                                                    {r.service?.name ?? "—"}
                                                </span>
                                                {r.service?.game?.name && (
                                                    <span className="text-[10px] text-slate-600 ml-1">
                                                        ({r.service.game.name})
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-0.5">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`size-3 ${
                                                                i < r.rating
                                                                    ? "text-amber-400 fill-amber-400"
                                                                    : "text-slate-700"
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="text-xs text-slate-400 line-clamp-2 max-w-xs">
                                                    {r.message || "—"}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border inline-flex items-center gap-1 ${sc.class}`}
                                                >
                                                    <sc.icon className="size-3" />
                                                    {sc.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-slate-500">
                                                {new Date(r.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-1">
                                                    {r.status !== "approved" && (
                                                        <button
                                                            onClick={() =>
                                                                handleStatus(r.id, "approved")
                                                            }
                                                            className="p-1.5 hover:bg-emerald-500/10 rounded-md text-slate-500 hover:text-emerald-400 transition-colors"
                                                            aria-label="Approve review"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle2 className="size-3.5" />
                                                        </button>
                                                    )}
                                                    {r.status !== "rejected" && (
                                                        <button
                                                            onClick={() =>
                                                                handleStatus(r.id, "rejected")
                                                            }
                                                            className="p-1.5 hover:bg-red-500/10 rounded-md text-slate-500 hover:text-red-400 transition-colors"
                                                            aria-label="Reject review"
                                                            title="Reject"
                                                        >
                                                            <XCircle className="size-3.5" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() =>
                                                            handleFeatured(r.id, r.isFeatured)
                                                        }
                                                        className={`p-1.5 rounded-md transition-colors ${
                                                            r.isFeatured
                                                                ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                                                                : "text-slate-500 hover:bg-white/5 hover:text-amber-400"
                                                        }`}
                                                        aria-label={
                                                            r.isFeatured
                                                                ? "Unfeature review"
                                                                : "Feature review"
                                                        }
                                                        title={
                                                            r.isFeatured
                                                                ? "Unfeature"
                                                                : "Feature on homepage"
                                                        }
                                                    >
                                                        <Star
                                                            className={`size-3.5 ${
                                                                r.isFeatured ? "fill-amber-400" : ""
                                                            }`}
                                                        />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(r.id)}
                                                        className="p-1.5 hover:bg-red-500/10 rounded-md text-slate-500 hover:text-red-400 transition-colors"
                                                        aria-label="Delete review"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="size-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
