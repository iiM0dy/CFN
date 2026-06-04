import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import DashboardClient from "@/components/dashboard/DashboardClient";
import { auth } from "@/auth";

export default async function DashboardPage() {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;

    if (!token) {
        redirect("/login?callbackUrl=/dashboard");
    }

    // Fetch dashboard data from the Laravel API (user, orders, stats)
    const dashboardData = await api('/dashboard', { token }).catch(() => null);

    if (!dashboardData) {
        redirect("/login?callbackUrl=/dashboard");
    }

    const user = dashboardData.user ?? null;
    const allOrders = dashboardData.orders ?? [];
    const stats = dashboardData.stats ?? {
        totalSpent: 0,
        activeOrders: 0,
        completedOrders: 0
    };

    return (
        <DashboardClient
            user={user}
            orders={allOrders}
            stats={stats}
        />
    );
}
