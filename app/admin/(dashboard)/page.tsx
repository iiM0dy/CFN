import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminOverview from "@/components/admin/AdminOverview";

export default async function AdminPage() {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        redirect("/");
    }

    const [
        ecommerceOrderCount,
        serviceOrderCount,
        pendingEcommerce,
        pendingService,
        ecommerceRevenue,
        serviceRevenue,
        userCount,
        recentEcommerce,
        recentServices,
        categoryStatsRaw
    ] = await Promise.all([
        prisma.order.count(),
        prisma.serviceOrder.count(),
        prisma.order.count({ where: { status: "PENDING" } }),
        prisma.serviceOrder.count({ where: { status: "pending" } }),
        prisma.order.aggregate({ _sum: { total: true } }),
        prisma.serviceOrder.aggregate({ _sum: { totalPrice: true } }),
        prisma.user.count(),
        prisma.order.findMany({ take: 3, orderBy: { createdAt: 'desc' }, include: { user: true } }),
        prisma.serviceOrder.findMany({
            take: 7,
            orderBy: { createdAt: 'desc' },
            include: { user: true, service: { include: { game: true } } }
        }),
        prisma.serviceOrder.findMany({
            include: { service: { include: { game: true } } }
        })
    ]);

    // Calculate real category stats
    const categoryCounts: Record<string, number> = {};
    categoryStatsRaw.forEach(order => {
        const gameName = order.service.game.name;
        categoryCounts[gameName] = (categoryCounts[gameName] || 0) + 1;
    });

    const totalServiceOrders = categoryStatsRaw.length;
    const analytics = Object.entries(categoryCounts)
        .map(([label, count]) => ({
            label,
            value: totalServiceOrders > 0 ? Math.round((count / totalServiceOrders) * 100) : 0,
            color: label === "Valorant" ? "bg-primary" :
                label === "League of Legends" ? "bg-[#00CF91]" :
                    label === "Counter-Strike 2" ? "bg-[#FFB800]" : "bg-white/20"
        }))
        .sort((a, b) => b.value - a.value);

    const combinedRecent = [
        ...recentEcommerce.map(o => ({
            id: o.id,
            user: o.user,
            status: o.status === "PENDING" ? "pending" : "paid",
            total: Number(o.total),
            createdAt: o.createdAt,
            type: "product"
        })),
        ...recentServices.map(o => ({
            id: o.id,
            user: o.user,
            status: o.status,
            total: Number(o.totalPrice),
            createdAt: o.createdAt,
            type: "service"
        }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10);

    return (
        <AdminOverview
            stats={{
                totalOrders: ecommerceOrderCount + serviceOrderCount,
                pendingOrders: pendingEcommerce + pendingService,
                revenue: Number(ecommerceRevenue._sum.total || 0) + Number(serviceRevenue._sum.totalPrice || 0),
                totalUsers: userCount
            }}
            recentOrders={combinedRecent}
            analytics={analytics}
        />
    );
}
