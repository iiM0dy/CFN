import { auth } from "@/auth";
import { api } from "@/lib/api";
import OrdersTable from "@/components/admin/OrdersTable";

export default async function AdminOrdersPage() {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        return null; // Layout handles redirect
    }

    const token = (session?.user as any)?.accessToken;
    const serviceOrders = await api("/admin/orders", { token }).catch(() => []);

    return <OrdersTable initialOrders={serviceOrders} />;
}
