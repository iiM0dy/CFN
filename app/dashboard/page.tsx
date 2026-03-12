"use client";

import { useState } from "react";
import { useCurrency } from "@/context/currency-context";
import Link from "next/link";

export default function DashboardPage() {
    const { formatPrice } = useCurrency();
    return (
        <div className="flex min-h-[calc(100vh-5rem)] w-full overflow-hidden bg-[#181112] text-white antialiased font-[family-name:var(--font-space-grotesk)]">
            {/* Sidebar */}
            <aside className="hidden w-72 flex-col border-r border-[#38292b] bg-[#181112] md:flex">
                <div className="flex h-20 items-center gap-3 px-6 border-b border-[#38292b]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white text-xl">🎮</div>
                    <div className="flex flex-col">
                        <span className="text-lg font-black tracking-tight uppercase font-cairo">
                            <span className="text-primary">CFN</span>
                            <span className="text-white">BOOST</span>
                        </span>
                        <span className="text-xs font-medium text-[#b89da1]">Elite Boosting</span>
                    </div>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-6">
                    <div className="space-y-1">
                        <a href="#" className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2.5 text-white shadow-lg shadow-primary/20 transition-all">📊 <span className="text-sm font-medium">Dashboard</span></a>
                        <a href="#" className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#b89da1] hover:bg-[#38292b] hover:text-white transition-colors">📋 <span className="text-sm font-medium">My Orders</span></a>
                        <a href="#" className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#b89da1] hover:bg-[#38292b] hover:text-white transition-colors">👛 <span className="text-sm font-medium">Wallet</span></a>
                        <a href="#" className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#b89da1] hover:bg-[#38292b] hover:text-white transition-colors">
                            💬 <span className="text-sm font-medium">Support</span>
                            <span className="ml-auto rounded bg-primary/20 px-2 py-0.5 text-xs font-bold text-primary">2</span>
                        </a>
                    </div>
                    <div className="mt-8">
                        <h3 className="px-3 text-xs font-bold uppercase tracking-wider text-[#5c4d4f]">Account</h3>
                        <div className="mt-2 space-y-1">
                            <a href="#" className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#b89da1] hover:bg-[#38292b] hover:text-white transition-colors">⚙️ <span className="text-sm font-medium">Settings</span></a>
                            <Link href="/" className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#b89da1] hover:bg-[#38292b] hover:text-white transition-colors">🚪 <span className="text-sm font-medium">Log Out</span></Link>
                        </div>
                    </div>
                </nav>
                <div className="border-t border-[#38292b] p-4">
                    <div className="flex items-center gap-3 rounded-xl bg-[#261c1d] p-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-[#38292b]">
                            <img alt="User Avatar" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3eifItcad-BUbdhkXhY05muy5WQE1FC0oAQFkryQOkVkXPoxMr8C31yXcU1l9V7qZL8CfJ1r2vWVrfEJ_DODIHjUKHLIK-_f2xfgm3vhZ3ryoFS9f25tD_tGDoANVE802QgxLMaH_VqISJZkEEt5TK-8q_glB9lbfsxF0yerLGi31e7uXYGucOYlmoiSbMDsz1fQ_Kahh-tZuv_YQlTb8MY7oNwIAMKPDE8kr5eom74mS80sYjfaohfKe2uM9xYQIWfMnpXS3Uajg" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">Kai Cenat</span>
                            <span className="text-xs text-[#b89da1]">Premium Member</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex flex-1 flex-col overflow-hidden bg-[#181112]">

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="mx-auto max-w-7xl space-y-8">
                        {/* Stats Grid */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Wallet Card */}
                            <div className="relative overflow-hidden rounded-xl border border-[#38292b] bg-[#261c1d] p-6 transition-transform hover:-translate-y-1">
                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-[#b89da1]">Wallet Balance</span>
                                    <span className="text-xl">👛</span>
                                </div>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-white">{formatPrice(1250.00)}</span>
                                    <span className="text-sm font-medium text-emerald-500">+ {formatPrice(50.00)}</span>
                                </div>
                                <button className="mt-4 w-full rounded-lg bg-[#38292b] py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#4a3639] transition-colors">Top Up Balance</button>
                            </div>

                            {/* Active Orders Card */}
                            <div className="relative overflow-hidden rounded-xl border border-[#38292b] bg-[#261c1d] p-6 transition-transform hover:-translate-y-1">
                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-[#b89da1]">Active Orders</span>
                                    <span className="text-xl">🎮</span>
                                </div>
                                <div className="mt-4">
                                    <span className="text-3xl font-bold text-white">1</span>
                                    <span className="text-sm text-[#b89da1] ml-2">in progress</span>
                                </div>
                                <div className="mt-5 h-1.5 w-full rounded-full bg-[#38292b]">
                                    <div className="h-1.5 rounded-full bg-primary" style={{ width: "75%" }} />
                                </div>
                                <p className="mt-2 text-xs text-[#b89da1]">75% completion rate</p>
                            </div>

                            {/* Loyalty Card */}
                            <div className="relative overflow-hidden rounded-xl border border-[#38292b] bg-[#261c1d] p-6 transition-transform hover:-translate-y-1">
                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl" />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-[#b89da1]">Loyalty Points</span>
                                    <span className="text-xl">🎖️</span>
                                </div>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-white">450</span>
                                    <span className="text-sm font-medium text-emerald-500">+ 120 pts</span>
                                </div>
                                <p className="mt-4 text-xs font-medium text-[#b89da1]">Next Tier: Gold (50 pts away)</p>
                            </div>
                        </div>

                        {/* Active Boost Large Card */}
                        <div className="rounded-xl border border-[#38292b] bg-[#261c1d] overflow-hidden">
                            <div className="border-b border-[#38292b] bg-[#261c1d] px-6 py-4 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-white">Active Boost</h2>
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary border border-primary/20">
                                    <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-primary inline-block" />
                                    In Progress
                                </span>
                            </div>
                            <div className="flex flex-col md:flex-row">
                                <div className="relative h-48 w-full md:h-auto md:w-64 bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4UdPKN_3vxZunmIYvnUZhRzbuvJG306dz9ABtNMO2u6qwjgyrDB4RX7kJ_KvTr48qhSCiOzd563O2ql6ZA8GyXP_3CZpVkaxv7cfd1sT1MPhUwMzfrn8T_DkaaD5-R2vmD4Vt9M7s4sZAAQmBZV2vTIhl29oK2iix_0cy89GRFisjwK8TKQ9vIiWN6E3pyQCHKtpcv4gx9exB3lKOUdP2S8MseWAlXcdTAQWno2lP__BTF3Ok-o0rPsn2N4ej0pNQFICNo-UaTeal')` }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#261c1d] md:bg-gradient-to-r md:from-transparent md:to-[#261c1d]" />
                                </div>
                                <div className="flex-1 p-6">
                                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">League of Legends - Duo Queue</h3>
                                            <p className="text-sm text-[#b89da1] mt-1">Order #8821 • Started 2 hours ago</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-white">Booster &apos;Shadow&apos;</p>
                                                <p className="text-xs text-emerald-500">Online &amp; Playing</p>
                                            </div>
                                            <div className="h-10 w-10 overflow-hidden rounded-full border border-[#38292b]">
                                                <img alt="Booster Avatar" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlctrjxa7UTdtOZ0PqjQ9yGWyPH9Zl6TB5yztt7F6_NuqgRoCeAHidUuvgv8_S4YzPp0MLTG8gjt4XrrOeEyFU1y0n1rf6hMnsCJm-ha0iz-PP-piWE0MG9h555u3N9-g81oM56EtAYwp8fJzFxnu1JBIsg9vJ9nN--pWH_MMDu_UaiRvQX1Yvnbrv-fwJXyXnMD0pMH8oTOVcyIZZZAT1aBU5tQXgA2D3_5_6ElrC0hky1cTsRMRfDxWfVukCCu6iRP8oxA70fWo0" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-[#b89da1]">Progress (Platinum IV → Diamond I)</span>
                                            <span className="font-bold text-white">75%</span>
                                        </div>
                                        <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#38292b]">
                                            <div className="absolute h-full rounded-full bg-gradient-to-r from-primary to-red-600 transition-all duration-500" style={{ width: "75%" }} />
                                        </div>
                                        <div className="mt-2 flex justify-between text-xs text-[#b89da1]">
                                            <span>Current: Platinum I</span>
                                            <span>Est. Completion: 4 Hours</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Orders Table */}
                        <div className="rounded-xl border border-[#38292b] bg-[#261c1d] overflow-hidden">
                            <div className="flex items-center justify-between border-b border-[#38292b] px-6 py-4">
                                <h2 className="text-lg font-bold text-white">Recent History</h2>
                                <button className="text-xs font-bold text-primary hover:text-red-400">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[#1f1617] text-xs font-medium uppercase text-[#b89da1]">
                                        <tr>
                                            <th className="px-6 py-4">Order ID</th>
                                            <th className="px-6 py-4">Service</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#38292b] text-[#b89da1]">
                                        <tr className="hover:bg-[#38292b]/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white">#8821</td>
                                            <td className="px-6 py-4">League of Legends Duo</td>
                                            <td className="px-6 py-4">Oct 24, 2023</td>
                                            <td className="px-6 py-4 text-white font-bold">{formatPrice(125.00)}</td>
                                            <td className="px-6 py-4"><span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">Active</span></td>
                                            <td className="px-6 py-4 text-right"><button className="text-[#b89da1] hover:text-white">⋮</button></td>
                                        </tr>
                                        <tr className="hover:bg-[#38292b]/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white">#8755</td>
                                            <td className="px-6 py-4">Valorant Rank Boost</td>
                                            <td className="px-6 py-4">Oct 12, 2023</td>
                                            <td className="px-6 py-4 text-white font-bold">{formatPrice(85.00)}</td>
                                            <td className="px-6 py-4"><span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">Completed</span></td>
                                            <td className="px-6 py-4 text-right"><button className="text-[#b89da1] hover:text-white">⋮</button></td>
                                        </tr>
                                        <tr className="hover:bg-[#38292b]/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white">#8201</td>
                                            <td className="px-6 py-4">Apex Legends Coaching</td>
                                            <td className="px-6 py-4">Sep 28, 2023</td>
                                            <td className="px-6 py-4 text-white font-bold">{formatPrice(40.00)}</td>
                                            <td className="px-6 py-4"><span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">Completed</span></td>
                                            <td className="px-6 py-4 text-right"><button className="text-[#b89da1] hover:text-white">⋮</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Floating Support Widget */}
            <div className="fixed bottom-8 right-8 z-50">
                <button className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/40 hover:bg-red-700 transition-all hover:scale-105 text-2xl">
                    💬
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary">1</span>
                    <div className="absolute bottom-full right-0 mb-3 hidden w-48 rounded-lg bg-[#261c1d] p-3 shadow-xl border border-[#38292b] group-hover:block">
                        <p className="text-xs font-medium text-white">Support Online</p>
                        <p className="text-[10px] text-[#b89da1]">Typical reply time: 2m</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
