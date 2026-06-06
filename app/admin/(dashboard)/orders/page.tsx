import { auth } from "@/auth";
import { api } from "@/lib/api";
import OrdersTable from "@/components/admin/OrdersTable";

export default async function AdminOrdersPage() {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        return null; // Layout handles redirect
    }

    const token = (session?.user as any)?.accessToken;
    const res = await api<{ data: any[] }>("/admin/orders", { token }).catch(() => ({ data: [] }));

    return <OrdersTable initialOrders={res.data} />;
}
