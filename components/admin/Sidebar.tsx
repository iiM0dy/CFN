"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    ShoppingBag,
    CreditCard,
    Ticket,
    Gamepad2,
    Wrench,
    SlidersHorizontal,
    Users,
    Shield,
    MessageSquare,
    Megaphone,
    Star,
    FileText,
    Settings,
    ScrollText,
    ExternalLink,
    LogOut,
    X,
    ChevronRight,
} from "lucide-react";

interface NavItem {
    name: string;
    href: string;
    icon: React.ElementType;
    exists: boolean;
}

interface NavGroup {
    label: string;
    items: NavItem[];
}

const navGroups: NavGroup[] = [
    {
        label: "Main",
        items: [
            { name: "Overview", href: "/admin", icon: LayoutDashboard, exists: true },
        ],
    },
    {
        label: "Commerce",
        items: [
            { name: "Orders", href: "/admin/orders", icon: ShoppingBag, exists: true },
            { name: "Payments", href: "/admin/payments", icon: CreditCard, exists: false },
            { name: "Promo Codes", href: "/admin/promo-codes", icon: Ticket, exists: false },
        ],
    },
    {
        label: "Catalog",
        items: [
            { name: "Games", href: "/admin/games", icon: Gamepad2, exists: true },
            { name: "Services", href: "/admin/services", icon: Wrench, exists: true },
            { name: "Add-ons / Options", href: "/admin/addons", icon: SlidersHorizontal, exists: false },
        ],
    },
    {
        label: "Customers",
        items: [
            { name: "Users", href: "/admin/users", icon: Users, exists: true },
            { name: "Boosters", href: "/admin/boosters", icon: Shield, exists: false },
        ],
    },
    {
        label: "Support",
        items: [
            { name: "Live Chat", href: "/admin/chat", icon: MessageSquare, exists: true },
        ],
    },
    {
        label: "Marketing",
        items: [
            { name: "Announcements", href: "/admin/announcements", icon: Megaphone, exists: true },
            { name: "Reviews", href: "/admin/reviews", icon: Star, exists: true },
            { name: "Homepage Content", href: "/admin/homepage", icon: FileText, exists: false },
        ],
    },
    {
        label: "System",
        items: [
            { name: "Settings", href: "/admin/settings", icon: Settings, exists: false },
            { name: "Activity Log", href: "/admin/activity", icon: ScrollText, exists: false },
        ],
    },
];

export default function Sidebar({ mobileOpen, onMobileClose }: { mobileOpen?: boolean; onMobileClose?: () => void }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = ""; };
        }
    }, [mobileOpen]);

    const toggleGroup = (label: string) => {
        setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const isActive = (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    const sidebarContent = (
        <>
            {/* Logo */}
            <div className="h-14 flex items-center px-5 border-b border-white/5 shrink-0">
                <Link href="/admin" className="flex items-center gap-2.5 group">
                    <div className="size-7 rounded-md bg-primary flex items-center justify-center text-white text-xs font-black group-hover:rotate-6 transition-transform">
                        C
                    </div>
                    <span className="font-black tracking-tight text-sm text-white">
                        CFN<span className="text-primary">Boost</span>
                        <span className="text-[10px] text-slate-600 font-bold ml-1.5 uppercase tracking-widest">Admin</span>
                    </span>
                </Link>

                {/* Mobile close */}
                {onMobileClose && (
                    <button
                        onClick={onMobileClose}
                        className="ml-auto lg:hidden p-1 text-slate-500 hover:text-white transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X className="size-4" />
                    </button>
                )}
            </div>

            {/* Nav groups */}
            <nav className="flex-1 overflow-y-auto custom-scrollbar py-3 px-3 space-y-0.5">
                {navGroups.map((group) => {
                    const isCollapsed = collapsed[group.label];
                    return (
                        <div key={group.label}>
                            <button
                                onClick={() => toggleGroup(group.label)}
                                className="w-full flex items-center justify-between px-2 pt-4 pb-1.5 group cursor-pointer"
                                aria-expanded={!isCollapsed}
                            >
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.15em]">
                                    {group.label}
                                </span>
                                <ChevronRight
                                    className={`size-3 text-slate-700 transition-transform ${!isCollapsed ? "rotate-90" : ""}`}
                                />
                            </button>

                            {!isCollapsed && (
                                <div className="space-y-0.5">
                                    {group.items.map((item) => {
                                        const active = isActive(item.href);
                                        if (!item.exists) {
                                            return (
                                                <div
                                                    key={item.href}
                                                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-slate-700 cursor-not-allowed select-none"
                                                    title="Coming soon"
                                                >
                                                    <item.icon className="size-3.5" />
                                                    <span className="text-[13px] font-medium">{item.name}</span>
                                                    <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-slate-700 bg-white/3 px-1.5 py-0.5 rounded">
                                                        Soon
                                                    </span>
                                                </div>
                                            );
                                        }
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={onMobileClose}
                                                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                                                    active
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                                                }`}
                                            >
                                                <item.icon className={`size-3.5 ${active ? "text-primary" : ""}`} />
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Bottom actions */}
            <div className="px-3 py-3 border-t border-white/5 space-y-0.5 shrink-0">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-slate-500 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                    <ExternalLink className="size-3.5" />
                    Visit Website
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer"
                >
                    <LogOut className="size-3.5" />
                    Sign Out
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex w-56 bg-[#0A0A0A] border-r border-white/[0.06] flex-col h-screen sticky top-0 shrink-0">
                {sidebarContent}
            </aside>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onMobileClose}
                    />
                    <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#0A0A0A] border-r border-white/[0.06] flex flex-col animate-in slide-in-from-left duration-200">
                        {sidebarContent}
                    </aside>
                </div>
            )}
        </>
    );
}
