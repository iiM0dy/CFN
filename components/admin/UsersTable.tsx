"use client"

import { Users, Search, MoreHorizontal, ShieldCheck, ShieldAlert, UserPlus, Mail, Calendar, Trash2, Settings, UserCog, UserMinus, Eye } from "lucide-react";
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

interface User {
    id: string;
    email: string | null;
    role: string;
    createdAt: any;
    _count: {
        serviceOrders: number;
    };
}

interface UsersTableProps {
    initialUsers: User[];
}

export default function UsersTable({ initialUsers }: UsersTableProps) {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isProcessing, setIsProcessing] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const toggleUserRole = async (user: User) => {
        const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";
        setIsProcessing(user.id);

        const promise = fetch(`/api/admin/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: newRole }),
        });

        toast.promise(promise, {
            loading: `Changing ${user.email}'s role to ${newRole}...`,
            success: (res) => {
                if (!res.ok) throw new Error("Update failed");
                setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: newRole } : u));
                return `User role updated to ${newRole}.`;
            },
            error: 'Failed to update user role.',
        });

        await promise.finally(() => setIsProcessing(null));
    };

    const handleDeleteUser = async (id: string, email: string | null) => {
        setIsProcessing(id);
        const promise = fetch(`/api/admin/users/${id}`, {
            method: "DELETE",
        });

        toast.promise(promise, {
            loading: `Deleting user ${email}...`,
            success: (res) => {
                if (!res.ok) throw new Error("Deletion failed");
                setUsers(prev => prev.filter(u => u.id !== id));
                return `User ${email} has been deleted.`;
            },
            error: 'Failed to delete user.',
        });

        await promise.finally(() => setIsProcessing(null));
    };

    return (
        <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0D0D0D] border border-white/5 p-6 rounded-3xl">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                        <Users className="size-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-white uppercase italic tracking-tight">Manage Users</h2>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Active users: {users.length}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
                        <input
                            placeholder="Search users..."
                            className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-xs text-white focus:border-indigo-500/50 outline-none w-full md:w-80 transition-all font-medium placeholder:text-slate-800"
                        />
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-[#0D0D0D] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Table>
                    <TableHeader className="bg-white/2 border-b border-white/5">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="px-8 h-12 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">User Info</TableHead>
                            <TableHead className="px-8 h-12 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Role</TableHead>
                            <TableHead className="px-8 h-12 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Orders</TableHead>
                            <TableHead className="px-8 h-12 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Joined Date</TableHead>
                            <TableHead className="px-8 h-12 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} className="hover:bg-white/1 border-b border-white/5 transition-colors group">
                                <TableCell className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-xl bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/5 text-xs font-black text-white uppercase group-hover:border-indigo-500/30 transition-all">
                                            {user.email ? user.email[0].toUpperCase() : "?"}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-white uppercase tracking-tight">{user.email || "No Email"}</p>
                                            <p className="text-[10px] text-slate-500 font-bold tracking-tight flex items-center gap-1 opacity-70">
                                                <Mail className="size-3" />
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-8 py-6">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest ${user.role === "ADMIN"
                                        ? "bg-primary/5 text-primary border-primary/20"
                                        : "bg-emerald-500/5 text-emerald-500 border-emerald-500/20"
                                        }`}>
                                        {user.role === "ADMIN" ? <ShieldAlert className="size-3" /> : <ShieldCheck className="size-3" />}
                                        {user.role}
                                    </div>
                                </TableCell>
                                <TableCell className="px-8 py-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-black text-white tracking-tighter">{user._count.serviceOrders}</p>
                                        <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest italic">Orders</p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-8 py-6">
                                    <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-[9px] tracking-tighter">
                                        <Calendar className="size-3" />
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </div>
                                </TableCell>
                                <TableCell className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => toggleUserRole(user)}
                                            disabled={isProcessing === user.id}
                                            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all cursor-pointer" title="Change Role"
                                        >
                                            <UserCog className="size-4" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                toast.error(`Delete User`, {
                                                    description: `Are you sure you want to delete ${user.email}?`,
                                                    action: {
                                                        label: 'Delete',
                                                        onClick: () => handleDeleteUser(user.id, user.email)
                                                    }
                                                });
                                            }}
                                            disabled={isProcessing === user.id}
                                            className="p-2.5 bg-red-500/10 hover:bg-red-500 border border-red-500/20 rounded-xl text-red-500 hover:text-white transition-all cursor-pointer" title="Delete User"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                        <button
                                            onClick={() => setSelectedUser(user)}
                                            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all cursor-pointer" title="View Details"
                                        >
                                            <Eye className="size-4" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* User Details Sheet */}
            <Sheet open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
                <SheetContent className="w-full sm:max-w-xl bg-[#080808] border-white/5 text-white">
                    <SheetHeader className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-6 w-1 bg-indigo-500 rounded-full" />
                            <SheetTitle className="text-xl font-black uppercase italic tracking-tighter text-white">User Information</SheetTitle>
                        </div>
                        <SheetDescription className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                            Details for {selectedUser?.email}
                        </SheetDescription>
                    </SheetHeader>

                    {selectedUser && (
                        <div className="space-y-8">
                            <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="size-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-500 text-2xl font-black border border-indigo-500/20">
                                        {selectedUser.email ? selectedUser.email[0].toUpperCase() : "?"}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white uppercase leading-none">{selectedUser.email || "No Email"}</h3>
                                        <p className="text-slate-500 text-sm mt-1">{selectedUser.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">Account Role</p>
                                        <p className="text-xs font-bold text-white uppercase">{selectedUser.role}</p>
                                    </div>
                                    <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">Total Orders</p>
                                        <p className="text-xs font-bold text-white uppercase">{selectedUser._count.serviceOrders} Orders</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <SheetFooter className="mt-10 pt-6 border-t border-white/5">
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="w-full h-12 rounded-2xl bg-white/5 border border-white/5 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-white transition-all cursor-pointer"
                        >
                            Close Details
                        </button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
