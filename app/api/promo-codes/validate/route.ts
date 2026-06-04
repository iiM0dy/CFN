import { api } from "@/lib/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    
    if (!code) {
      return NextResponse.json(
        { error: "Please enter a promo code" },
        { status: 400 }
      );
    }

    const response = await api("/promo-codes/validate", {
      method: "POST",
      body: JSON.stringify({ code }),
    });

    if (response.error) {
      return NextResponse.json({ error: response.error }, { status: 400 });
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Promo code validation error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
