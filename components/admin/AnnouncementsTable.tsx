"use client";

import { useState } from "react";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    X,
    Check,
    Megaphone,
} from "lucide-react";
import { toast } from "sonner";
import {
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
} from "@/actions/announcement";

interface Announcement {
    id: string;
    message: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Props {
    initialAnnouncements: Announcement[];
}

export default function AnnouncementsTable({ initialAnnouncements }: Props) {
    const [items, setItems] = useState(initialAnnouncements);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Announcement | null>(null);
    const [form, setForm] = useState({ message: "", isActive: true });
    const [submitting, setSubmitting] = useState(false);

    const filtered = items.filter((a) =>
        a.message.toLowerCase().includes(search.toLowerCase())
    );

    const openCreate = () => {
        setEditing(null);
        setForm({ message: "", isActive: true });
        setModalOpen(true);
    };

    const openEdit = (a: Announcement) => {
        setEditing(a);
        setForm({ message: a.message, isActive: a.isActive });
        setModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.message.trim()) return toast.error("Message is required.");
        setSubmitting(true);
        try {
            if (editing) {
                const res = await updateAnnouncement(editing.id, form);
                if (res.success) {
                    setItems((prev) =>
                        prev.map((a) => {
                            if (a.id === editing.id) return { ...a, ...form };
                            if (form.isActive) return { ...a, isActive: false };
                            return a;
                        })
                    );
                    toast.success("Announcement updated.");
                    setModalOpen(false);
                } else {
                    toast.error(res.error);
                }
            } else {
                const res = await createAnnouncement(form);
                if (res.success) {
                    const created = res.announcement as any;
                    setItems((prev) => {
                        const updated = form.isActive
                            ? prev.map((a) => ({ ...a, isActive: false }))
                            : prev;
                        return [created, ...updated];
                    });
                    toast.success("Announcement created.");
                    setModalOpen(false);
                } else {
                    toast.error(res.error);
                }
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this announcement?")) return;
        try {
            const res = await deleteAnnouncement(id);
            if (res.success) {
                setItems((prev) => prev.filter((a) => a.id !== id));
                toast.success("Announcement deleted.");
            } else {
                toast.error(res.error);
            }
        } catch {
            toast.error("Something went wrong.");
        }
    };

    const handleToggleActive = async (a: Announcement) => {
        const newActive = !a.isActive;
        const res = await updateAnnouncement(a.id, { isActive: newActive });
        if (res.success) {
            setItems((prev) =>
                prev.map((item) => {
                    if (item.id === a.id) return { ...item, isActive: newActive };
                    if (newActive) return { ...item, isActive: false };
                    return item;
                })
            );
            toast.success(newActive ? "Announcement activated." : "Announcement deactivated.");
        } else {
            toast.error(res.error);
        }
    };

    return (
        <div>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-4">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-600" />
                    <input
                        type="text"
                        placeholder="Search announcements..."
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-white/10 outline-none transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0"
                >
                    <Plus className="size-3.5" />
                    New Announcement
                </button>
            </div>

            {/* Table */}
            <div className="bg-[#0D0D0D] border border-white/[0.06] rounded-xl overflow-hidden">
                {filtered.length === 0 ? (
                    <div className="px-4 py-14 text-center">
                        <Megaphone className="size-5 text-slate-700 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">
                            {items.length === 0
                                ? "No announcements yet."
                                : "No announcements match your search."}
                        </p>
                        {items.length === 0 && (
                            <p className="text-xs text-slate-600 mt-1">
                                Create one to display a banner across the site.
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[580px]">
                            <thead>
                                <tr className="border-b border-white/[0.04]">
                                    <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider">
                                        Message
                                    </th>
                                    <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider w-24">
                                        Status
                                    </th>
                                    <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider w-28">
                                        Created
                                    </th>
                                    <th className="px-4 py-2.5 text-[11px] font-medium text-slate-600 uppercase tracking-wider text-right w-28">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {filtered.map((a) => (
                                    <tr
                                        key={a.id}
                                        className="hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-4 py-3">
                                            <p className="text-xs text-slate-300 line-clamp-2 max-w-md">
                                                {a.message}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => handleToggleActive(a)}
                                                aria-label={a.isActive ? "Deactivate announcement" : "Activate announcement"}
                                                className={`text-[10px] font-semibold px-2 py-0.5 rounded border cursor-pointer transition-colors ${
                                                    a.isActive
                                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                                                        : "bg-white/[0.03] text-slate-500 border-white/[0.06] hover:bg-white/[0.06]"
                                                }`}
                                            >
                                                {a.isActive ? "Active" : "Inactive"}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-slate-500">
                                            {new Date(a.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => openEdit(a)}
                                                    className="p-1.5 hover:bg-white/5 rounded-md text-slate-500 hover:text-white transition-colors"
                                                    aria-label="Edit announcement"
                                                >
                                                    <Pencil className="size-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(a.id)}
                                                    className="p-1.5 hover:bg-red-500/10 rounded-md text-slate-500 hover:text-red-400 transition-colors"
                                                    aria-label="Delete announcement"
                                                >
                                                    <Trash2 className="size-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setModalOpen(false)}
                    />
                    <div className="relative z-10 w-full max-w-lg bg-[#0A0A0A] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                            <h2 className="text-sm font-semibold text-white">
                                {editing ? "Edit Announcement" : "New Announcement"}
                            </h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="p-1 text-slate-500 hover:text-white transition-colors"
                                aria-label="Close dialog"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-5 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-400">
                                    Message
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="e.g. 50% off all services this weekend!"
                                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 text-sm text-white placeholder:text-slate-700 focus:border-white/10 outline-none transition-all resize-none"
                                    value={form.message}
                                    onChange={(e) =>
                                        setForm({ ...form, message: e.target.value })
                                    }
                                />
                            </div>

                            <label className="flex items-center gap-2.5 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={form.isActive}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                isActive: e.target.checked,
                                            })
                                        }
                                    />
                                    <div className="w-9 h-5 bg-white/[0.06] border border-white/[0.08] rounded-full transition-all peer-checked:bg-emerald-500/20 peer-checked:border-emerald-500/30" />
                                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-slate-500 rounded-full transition-all peer-checked:left-[18px] peer-checked:bg-emerald-400" />
                                </div>
                                <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors">
                                    Active (visible on site)
                                </span>
                            </label>

                            <p className="text-[11px] text-slate-600 flex items-start gap-1.5">
                                <Megaphone className="size-3 mt-0.5 shrink-0" />
                                Only one announcement can be active. Activating this will deactivate others.
                            </p>

                            <div className="flex gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="flex-1 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 py-2.5 bg-primary hover:bg-primary-dark rounded-lg text-xs font-semibold text-white transition-colors disabled:opacity-40 cursor-pointer inline-flex items-center justify-center gap-1.5"
                                >
                                    {submitting ? (
                                        <span className="size-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Check className="size-3.5" />
                                            {editing ? "Save Changes" : "Create"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
