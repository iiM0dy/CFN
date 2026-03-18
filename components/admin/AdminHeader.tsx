"use client";

import { Bell, Search, User, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
    const pathname = usePathname();

    // Convert pathname to title (e.g., /admin/orders -> Orders)
    const getTitle = () => {
        if (pathname === "/admin") return "Overview";
        const parts = pathname.split("/");
        const last = parts[parts.length - 1];
        return last.charAt(0).toUpperCase() + last.slice(1);
    };

    return (
        <header className="h-20 bg-[#0D0D0D]/80 border-b border-white/5 flex items-center justify-between px-10 sticky top-0 z-50 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <button className="lg:hidden p-2 hover:bg-white/5 rounded-lg text-slate-400">
                    <Menu className="size-5" />
                </button>
                <div className="flex items-center gap-3">
                    <div className="h-6 w-1 bg-primary rounded-full" />
                    <h2 className="text-lg font-black text-white uppercase tracking-wider">{getTitle()}</h2>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                    <input
                        placeholder="Search dashboard..."
                        className="bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:border-primary/50 outline-none w-64 transition-all"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-all relative">
                        <Bell className="size-4" />
                        <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-[#0D0D0D]" />
                    </button>

                    <div className="h-8 w-px bg-white/5 mx-2" />

                    <button className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-white/5 border border-white/5 rounded-xl hover:border-white/20 transition-all group">
                        <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <User className="size-4" />
                        </div>
                        <div className="text-left hidden sm:block">
                            <p className="text-[10px] font-black text-white uppercase tracking-tight">Admin User</p>
                            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">General Access</p>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
}
