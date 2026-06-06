import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=EUR");
        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch exchange rate" }, { status: res.status });
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
