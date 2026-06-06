import AdminShell from "@/components/admin/AdminShell";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        redirect("/admin/login");
    }

    return <AdminShell>{children}</AdminShell>;
}
