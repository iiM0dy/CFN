"use client";

import { Bell, Search, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const pageTitles: Record<string, string> = {
    "/admin": "Overview",
    "/admin/orders": "Orders",
    "/admin/services": "Services",
    "/admin/games": "Games",
    "/admin/users": "Users",
    "/admin/chat": "Live Chat",
    "/admin/announcements": "Announcements",
    "/admin/reviews": "Reviews",
};

export default function AdminHeader({ onMenuClick }: { onMenuClick?: () => void }) {
    const pathname = usePathname();
    const { data: session } = useSession();

    const title = pageTitles[pathname] ?? pathname.split("/").pop()?.replace(/-/g, " ") ?? "Admin";
    const userEmail = session?.user?.email ?? "Admin";
    const userInitial = userEmail[0]?.toUpperCase() ?? "A";

    return (
        <header className="h-14 bg-[#0A0A0A]/80 border-b border-white/[0.06] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40 backdrop-blur-xl shrink-0">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-1.5 hover:bg-white/5 rounded-md text-slate-400 transition-colors"
                    aria-label="Open navigation menu"
                >
                    <Menu className="size-4" />
                </button>
                <h1 className="text-sm font-semibold text-white capitalize">{title}</h1>
            </div>

            <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-600" />
                    <input
                        placeholder="Search..."
                        className="bg-white/[0.03] border border-white/[0.06] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:border-white/10 focus:bg-white/[0.05] outline-none w-48 transition-all"
                    />
                </div>

                {/* Notifications */}
                <button
                    className="p-1.5 hover:bg-white/5 rounded-md text-slate-500 hover:text-white transition-colors relative"
                    aria-label="View notifications"
                >
                    <Bell className="size-3.5" />
                </button>

                {/* Divider */}
                <div className="h-5 w-px bg-white/[0.06] mx-1" />

                {/* User */}
                <div className="flex items-center gap-2 pl-1">
                    <div className="size-7 rounded-md bg-white/[0.06] flex items-center justify-center text-[11px] font-semibold text-slate-300">
                        {userInitial}
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-xs font-medium text-slate-300 leading-none truncate max-w-[140px]">{userEmail}</p>
                        <p className="text-[10px] text-slate-600 mt-0.5">Admin</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
