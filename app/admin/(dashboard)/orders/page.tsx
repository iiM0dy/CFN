import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import OrdersTable from "@/components/admin/OrdersTable";

export default async function AdminOrdersPage() {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        return null; // Layout handles redirect
    }

    const serviceOrders = await prisma.serviceOrder.findMany({
        include: {
            user: true,
            service: {
                include: { game: true }
            }
        },
        orderBy: { createdAt: "desc" }
    });

    return <OrdersTable initialOrders={serviceOrders} />;
}
