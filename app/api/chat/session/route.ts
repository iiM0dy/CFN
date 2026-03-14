import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userEmail, userName, userId } = body;

        // Try to find an active session for this user/email
        let session = await prisma.chatSession.findFirst({
            where: {
                OR: [
                    userId ? { userId } : {},
                    userEmail ? { userEmail } : {}
                ].filter(condition => Object.keys(condition).length > 0),
                status: "active"
            },
            include: {
                messages: {
                    orderBy: { createdAt: "asc" }
                }
            }
        });

        if (!session) {
            session = await prisma.chatSession.create({
                data: {
                    userId,
                    userEmail,
                    userName,
                    status: "active"
                },
                include: {
                    messages: true
                }
            });
        }

        return NextResponse.json(session);
    } catch (error) {
        console.error("Chat Session Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
