import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();

    if ((session?.user as any)?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { id } = await params;
        const { status } = await req.json();

        const updatedSession = await prisma.chatSession.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updatedSession);
    } catch (error) {
        console.error("[CHAT_STATUS_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
