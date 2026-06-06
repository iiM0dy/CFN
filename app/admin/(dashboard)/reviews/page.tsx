import { auth } from "@/auth";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";
import ReviewsTable from "@/components/admin/ReviewsTable";

export default async function AdminReviewsPage() {
    const session = await auth();
    if ((session?.user as any)?.role !== "ADMIN") redirect("/admin/login");

    const token = (session?.user as any)?.accessToken;
    const res = await api<{ data: any[] }>("/admin/reviews", { token }).catch(() => ({ data: [] }));

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-lg font-semibold text-white">Reviews</h1>
                <p className="text-sm text-slate-500 mt-0.5">
                    Moderate user reviews, approve for display, and feature top picks on the homepage.
                </p>
            </div>
            <ReviewsTable initialReviews={res.data} />
        </div>
    );
}
