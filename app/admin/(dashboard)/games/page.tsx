import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import GamesTable from "@/components/admin/GamesTable";
import { redirect } from "next/navigation";

export default async function AdminGamesPage() {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        redirect("/admin/login");
    }

    const games = await prisma.gameService.findMany({
        orderBy: { order: "asc" }
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic">Game Management</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[12px] mt-1">Manage the game cards displayed on the homepage choose from 100+ section</p>
                </div>
            </div>
            
            <GamesTable initialGames={games} />
        </div>
    );
}
