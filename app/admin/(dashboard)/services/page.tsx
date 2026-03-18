import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ServicesTable from "@/components/admin/ServicesTable";

export default async function AdminServicesPage() {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        return null; // Layout handles redirect
    }

    const services = await prisma.service.findMany({
        include: { game: true },
        orderBy: { game: { name: "asc" } }
    });

    return <ServicesTable initialServices={services} />;
}
