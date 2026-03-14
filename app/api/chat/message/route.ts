import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { sessionId, text, sender, isAdmin } = body;

        const message = await prisma.chatMessage.create({
            data: {
                sessionId,
                text,
                sender,
                isAdmin: isAdmin || false
            }
        });

        // Update session timestamp
        await prisma.chatSession.update({
            where: { id: sessionId },
            data: { updatedAt: new Date() }
        });

        return NextResponse.json(message);
    } catch (error) {
        console.error("Chat Message Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
