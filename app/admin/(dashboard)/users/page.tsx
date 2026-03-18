import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import UsersTable from "@/components/admin/UsersTable";

export default async function AdminUsersPage() {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        return null; // Layout handles redirect
    }

    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { serviceOrders: true } } }
    });

    return <UsersTable initialUsers={users} />;
}
