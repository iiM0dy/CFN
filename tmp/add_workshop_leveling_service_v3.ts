import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const game = await prisma.gameService.findFirst({ where: { slug: "arc-raiders" } })
    if (!game) throw new Error("Game 'arc-raiders' not found")

    console.log("Creating service...")
    // Clean up if already exists partially (though v2 failed at line 6, so it shouldn't exist)
    const existing = await prisma.service.findFirst({ where: { name: "Workshop Leveling", gameId: game.id } })
    if (existing) {
        console.log("Service already exists, cleaning up...")
        await prisma.service.delete({ where: { id: existing.id } })
    }

    const service = await prisma.service.create({
        data: {
            name: "Workshop Leveling",
            description: "Enhance your Workshop capabilities by leveling up your benches and Scrappy. From basic scrap processing to advanced gear manufacturing, we help you master all aspects of the Workshop.",
            basePrice: 0.99,
            gameId: game.id,
            platforms: ["PC", "PlayStation", "Xbox"],
            completionMethods: ["Self-play (in-raid trade)", "Piloted"],
            maxQuantity: 1
        }
    })

    console.log("Adding options...")

    // 1. What should we level up?
    await prisma.serviceOption.create({
        data: {
            serviceId: service.id,
            label: "What should we level up?",
            type: "select",
            required: true,
            order: 1,
            values: {
                create: [
                    { label: "Scrappy", value: "scrappy", priceModifier: 0, order: 1, isDefault: true },
                    { label: "Specific bench (custom range)", value: "specific_bench", priceModifier: 0, order: 2 },
                    { label: "0 to max level (multiple choice)", value: "zero_to_max", priceModifier: 0, order: 3 }
                ]
            }
        }
    })

    // 2. Level range (Scrappy)
    await prisma.serviceOption.create({
        data: {
            serviceId: service.id,
            label: "Level range (Scrappy)",
            type: "range",
            required: false,
            order: 2,
            minValue: 1,
            maxValue: 5,
            step: 1
        }
    })

    // 3. Level range (Specific bench)
    await prisma.serviceOption.create({
        data: {
            serviceId: service.id,
            label: "Level range (Specific bench)",
            type: "range",
            required: false,
            order: 3,
            minValue: 0,
            maxValue: 3,
            step: 1
        }
    })

    // 4. Bench
    await prisma.serviceOption.create({
        data: {
            serviceId: service.id,
            label: "Bench",
            type: "select",
            required: false,
            order: 4,
            values: {
                create: [
                    { label: "Gunsmith", value: "gunsmith", order: 1, isDefault: true },
                    { label: "Gear Bench", value: "gear_bench", order: 2 },
                    { label: "Medical Lab", value: "medical_lab", order: 3 },
                    { label: "Explosives Station", value: "explosives_station", order: 4 },
                    { label: "Utility Station", value: "utility_station", order: 5 },
                    { label: "Refiner", value: "refiner", order: 6 }
                ]
            }
        }
    })

    // 5. Multiple choice (0 to max)
    await prisma.serviceOption.create({
        data: {
            serviceId: service.id,
            label: "Multiple choice (0 to max)",
            type: "checkboxes",
            required: false,
            order: 5,
            values: {
                create: [
                    { label: "Scrappy", value: "scrappy_max", priceModifier: 13.00, order: 1 },
                    { label: "Gunsmith", value: "gunsmith_max", priceModifier: 14.00, order: 2 },
                    { label: "Gear Bench", value: "gear_bench_max", priceModifier: 14.00, order: 3 },
                    { label: "Medical Lab", value: "medical_lab_max", priceModifier: 14.00, order: 4 },
                    { label: "Explosives Station", value: "explosives_station_max", priceModifier: 14.00, order: 5 },
                    { label: "Utility Station", value: "utility_station_max", priceModifier: 14.00, order: 6 },
                    { label: "Refiner", value: "refiner_max", priceModifier: 14.00, order: 7 }
                ]
            }
        }
    })

    // 6. Select completion speed
    await prisma.serviceOption.create({
        data: {
            serviceId: service.id,
            label: "Select completion speed",
            type: "select",
            required: true,
            order: 6,
            values: {
                create: [
                    { label: "Normal", value: "normal", priceModifier: 0, order: 1, isDefault: true },
                    { label: "Express", value: "express", priceModifier: 0.20, order: 2 },
                    { label: "Super Express", value: "super_express", priceModifier: 0.40, order: 3 }
                ]
            }
        }
    })

    console.log("Success! Workshop Leveling service fully created.")
}

main().catch(console.error).finally(() => prisma.$disconnect())
