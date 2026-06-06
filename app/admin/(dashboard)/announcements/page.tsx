import { auth } from "@/auth";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";
import AnnouncementsTable from "@/components/admin/AnnouncementsTable";

export default async function AdminAnnouncementsPage() {
    const session = await auth();
    if ((session?.user as any)?.role !== "ADMIN") redirect("/admin/login");

    const token = (session?.user as any)?.accessToken;
    const res = await api<{ data: any[] }>("/admin/announcements", { token }).catch(() => ({ data: [] }));

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-lg font-semibold text-white">Announcements</h1>
                <p className="text-sm text-slate-500 mt-0.5">
                    Manage site-wide banners displayed to all visitors.
                </p>
            </div>
            <AnnouncementsTable initialAnnouncements={res.data} />
        </div>
    );
}
