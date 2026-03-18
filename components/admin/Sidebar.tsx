"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    MessageSquare,
    Settings,
    LogOut,
    ExternalLink,
    Wrench
} from "lucide-react";

const menuItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Services", href: "/admin/services", icon: Wrench },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Live Chat", href: "/admin/chat", icon: MessageSquare },
];

export default function Sidebar() {
    const pathname = usePathname();

    const handleSignOut = () => {
        signOut({ callbackUrl: "/admin/login" });
    };

    return (
        <aside className="w-64 bg-[#0D0D0D] border-r border-white/5 flex flex-col h-screen sticky top-0">
            <div className="p-8">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white font-black group-hover:rotate-12 transition-transform">AW</div>
                    <span className="font-black tracking-tighter text-xl text-white">ADMIN<span className="text-primary italic">.</span></span>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-slate-500 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon className="size-4" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 space-y-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-white hover:bg-white/5 transition-all"
                >
                    <ExternalLink className="size-4" />
                    Visit Website
                </Link>
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
                >
                    <LogOut className="size-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
