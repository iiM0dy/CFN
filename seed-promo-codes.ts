import { prisma } from "./lib/prisma"

async function seedPromoCodes() {
  const promoCodes = [
    {
      code: "WELCOME10",
      name: "Welcome Discount",
      discount: 10,
      discountType: "percentage",
      isActive: true,
      usageLimit: null,
      expiresAt: null
    },
    {
      code: "SAVE5",
      name: "$5 Off",
      discount: 5,
      discountType: "fixed",
      isActive: true,
      usageLimit: 100,
      expiresAt: new Date('2026-12-31')
    }
  ]

  for (const promo of promoCodes) {
    await prisma.promoCode.upsert({
      where: { code: promo.code },
      update: promo,
      create: promo
    })
  }

  console.log("✓ Promo codes seeded")
}

seedPromoCodes()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
