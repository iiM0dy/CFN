import { auth } from "@/auth";
import { api } from "@/lib/api";
import UsersTable from "@/components/admin/UsersTable";

export default async function AdminUsersPage() {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        return null; // Layout handles redirect
    }

    const token = (session?.user as any)?.accessToken;
    const users = await api("/admin/users", { token }).catch(() => []);

    const mappedUsers = users.map((u: any) => ({
        ...u,
        _count: { serviceOrders: u.serviceOrdersCount ?? 0 }
    }));

    return <UsersTable initialUsers={mappedUsers} />;
}
