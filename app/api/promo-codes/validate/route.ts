import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { code } = await request.json()
    
    if (!code) {
      return NextResponse.json(
        { error: "Please enter a promo code" },
        { status: 400 }
      )
    }

    const promoCode = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() }
    })

    if (!promoCode) {
      return NextResponse.json(
        { error: "Hmm, we couldn't find that code. Double-check and try again!" },
        { status: 404 }
      )
    }

    if (!promoCode.isActive) {
      return NextResponse.json(
        { error: "This code is no longer available" },
        { status: 400 }
      )
    }

    if (promoCode.expiresAt && new Date() > promoCode.expiresAt) {
      return NextResponse.json(
        { error: "This code has expired. Check out our active promotions!" },
        { status: 400 }
      )
    }

    if (promoCode.usageLimit && promoCode.usageCount >= promoCode.usageLimit) {
      return NextResponse.json(
        { error: "This code has reached its redemption limit" },
        { status: 400 }
      )
    }

    return NextResponse.json({
      valid: true,
      discount: Number(promoCode.discount),
      discountType: promoCode.discountType,
      name: promoCode.name
    })
  } catch (error) {
    console.error("Promo code validation error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
