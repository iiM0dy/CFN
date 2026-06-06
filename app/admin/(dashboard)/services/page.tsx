import { auth } from "@/auth";
import { api } from "@/lib/api";
import ServicesTable from "@/components/admin/ServicesTable";

export default async function AdminServicesPage() {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        return null;
    }

    const token = (session?.user as any)?.accessToken;
    const [servicesRes, gamesRes] = await Promise.all([
        api<{ data: any[] }>("/admin/services", { token }).catch(() => ({ data: [] })),
        api<{ data: any[] }>("/admin/games", { token }).catch(() => ({ data: [] })),
    ]);

    return <ServicesTable initialServices={servicesRes.data} games={gamesRes.data} />;
}
