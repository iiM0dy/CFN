import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const announcement = await prisma.announcement.findFirst({
            where: { isActive: true },
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(announcement);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { message, isActive } = await req.json();

        // Deactivate old announcements if this one is active
        if (isActive) {
            await prisma.announcement.updateMany({
                where: { isActive: true },
                data: { isActive: false }
            });
        }

        const newAnnouncement = await prisma.announcement.create({
            data: { message, isActive }
        });

        return NextResponse.json(newAnnouncement);
    } catch (error) {
        console.error("[ANNOUNCEMENT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE() {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        await prisma.announcement.deleteMany({
            where: { isActive: true }
        });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
