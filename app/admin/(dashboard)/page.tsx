import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import AdminOverview from "@/components/admin/AdminOverview";
import { auth } from "@/auth";

export default async function AdminPage() {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;

    if (!token) {
        redirect("/admin/login");
    }

    const raw = await api("/admin/dashboard-stats", { token }).catch(() => null);

    if (!raw) {
        redirect("/admin/login");
    }

    const data = {
        orderCount: raw.orderCount ?? 0,
        serviceOrderCount: raw.serviceOrderCount ?? 0,
        pendingOrderCount: raw.pendingOrderCount ?? 0,
        pendingServiceOrderCount: raw.pendingServiceOrderCount ?? 0,
        totalRevenue: raw.totalRevenue ?? 0,
        totalServiceRevenue: raw.totalServiceRevenue ?? 0,
        userCount: raw.userCount ?? 0,
        latestOrders: raw.latestOrders ?? [],
        openChats: raw.openChats ?? 0,
        activeOrderCount: raw.activeOrderCount ?? 0,
        completedOrderCount: raw.completedOrderCount ?? 0,
        gamesCount: raw.gamesCount ?? 0,
        servicesCount: raw.servicesCount ?? 0,
        missingPriceCount: raw.missingPriceCount ?? 0,
        missingImageCount: raw.missingImageCount ?? 0,
        featuredCount: raw.featuredCount ?? 0,
    };

    return <AdminOverview data={data} />;
}
