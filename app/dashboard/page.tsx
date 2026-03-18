import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login?callbackUrl=/dashboard");
    }

    const userId = session.user.id as string;

    // Fetch user details for the sidebar/header
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    // Fetch Service Orders
    const serviceOrders = await prisma.serviceOrder.findMany({
        where: { userId },
        include: {
            service: {
                include: { game: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    // Fetch Product Orders
    const ecommerceOrders = await prisma.order.findMany({
        where: { userId },
        include: {
            items: {
                include: { product: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    // Format all orders into a uniform structure for the UI
    const allOrders = [
        ...serviceOrders.map(o => ({
            id: o.id,
            type: 'service',
            name: o.service.name,
            game: o.service.game.name,
            status: o.status,
            price: Number(o.totalPrice),
            createdAt: o.createdAt,
            updatedAt: o.updatedAt,
            details: o.selectedOptions
        })),
        ...ecommerceOrders.map(o => ({
            id: o.id,
            type: 'product',
            name: o.items.length > 0 ? `${o.items[0].product.name}${o.items.length > 1 ? ` +${o.items.length - 1} more` : ''}` : 'Package',
            game: 'Store',
            status: o.status.toLowerCase(),
            price: Number(o.total),
            createdAt: o.createdAt,
            updatedAt: o.updatedAt,
            details: null
        }))
    ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const stats = {
        totalSpent: allOrders.reduce((sum, o) => sum + o.price, 0),
        activeOrders: allOrders.filter(o => ['pending', 'active', 'paid'].includes(o.status)).length,
        completedOrders: allOrders.filter(o => o.status === 'completed' || o.status === 'delivered').length
    };

    return (
        <DashboardClient
            user={user}
            orders={allOrders}
            stats={stats}
        />
    );
}
