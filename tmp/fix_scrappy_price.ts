import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const service = await prisma.service.findFirst({
        where: { name: 'Workshop Leveling' },
        include: { options: { include: { values: true } } }
    });

    if (!service) {
        console.error("Workshop Leveling service not found");
        return;
    }

    // Update Scrappy price per level to $3.00
    const scrappyRange = service.options.find(o => o.label === "Level range (Scrappy)");
    if (scrappyRange) {
        const priceVal = scrappyRange.values.find(v => v.value === 'price_per_level');
        if (priceVal) {
            await prisma.serviceOptionValue.update({
                where: { id: priceVal.id },
                data: { priceModifier: "3" }
            });
            console.log("Updated Scrappy price per level to $3.00");
        }
    }

    console.log("Prices updated successfully");
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
