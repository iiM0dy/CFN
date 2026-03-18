import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // Protect all admin routes
    if ((session?.user as any)?.role !== "ADMIN") {
        redirect("/admin/login");
    }

    return (
        <div className="flex min-h-screen bg-[#050505]">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <AdminHeader />
                <main className="flex-1 overflow-y-auto custom-scrollbar px-10 py-10">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
