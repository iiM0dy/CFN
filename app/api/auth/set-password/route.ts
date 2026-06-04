import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { api } from "@/lib/api";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const response = await api("/user/set-password", {
      method: "POST",
      body: JSON.stringify(body),
      token
    });

    if (response?.error) {
      return NextResponse.json({ error: response.error }, { status: 400 });
    }

    return NextResponse.json(response);

  } catch (error: any) {
    console.error("[SET_PASSWORD_ERROR]", error);
    return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
  }
}
