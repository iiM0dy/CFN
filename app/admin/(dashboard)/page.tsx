import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import AdminOverview from "@/components/admin/AdminOverview";
import { auth } from "@/auth";

export default async function AdminPage() {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;

    if (!token) {
        redirect("/");
    }

    const data = await api('/admin/dashboard-stats', { token }).catch(() => null);

    if (!data) {
        redirect("/");
    }

    return (
        <AdminOverview
            stats={data.stats ?? { totalOrders: 0, pendingOrders: 0, revenue: 0, totalUsers: 0 }}
            recentOrders={data.recentOrders ?? []}
            analytics={data.analytics ?? []}
        />
    );
}
