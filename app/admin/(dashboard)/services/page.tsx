import { auth } from "@/auth";
import { api } from "@/lib/api";
import ServicesTable from "@/components/admin/ServicesTable";

export default async function AdminServicesPage() {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        return null; // Layout handles redirect
    }

    const token = (session?.user as any)?.accessToken;
    const services = await api("/admin/services", { token }).catch(() => []);

    return <ServicesTable initialServices={services} />;
}
