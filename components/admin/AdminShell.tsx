"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#080808]">
            <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <AdminHeader onMenuClick={() => setMobileOpen(true)} />
                <main className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-6">
                    <div className="max-w-[1400px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
