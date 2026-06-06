import { auth } from "@/auth";
import { api } from "@/lib/api";
import UsersTable from "@/components/admin/UsersTable";

export default async function AdminUsersPage() {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        return null; // Layout handles redirect
    }

    const token = (session?.user as any)?.accessToken;
    const res = await api<{ data: any[] }>("/admin/users", { token }).catch(() => ({ data: [] }));

    const mappedUsers = res.data.map((u: any) => ({
        ...u,
        _count: { serviceOrders: u.serviceOrdersCount ?? 0 }
    }));

    return <UsersTable initialUsers={mappedUsers} />;
}
