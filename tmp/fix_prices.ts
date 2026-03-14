import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function m() {
    const service = await prisma.service.findFirst({
        where: { name: 'Workshop Leveling' },
        include: {
            options: {
                include: {
                    values: true
                }
            }
        }
    });

    if (!service) {
        console.log('Service not found');
        return;
    }

    for (const option of service.options) {
        if (option.label === 'Level range (Scrappy)') {
            const existing = option.values.find(v => v.value === 'price_per_level');
            if (existing) {
                await prisma.serviceOptionValue.update({
                    where: { id: existing.id },
                    data: { priceModifier: 1.00 }
                });
            } else {
                await prisma.serviceOptionValue.create({
                    data: {
                        optionId: option.id,
                        label: 'Price Per Level',
                        value: 'price_per_level',
                        priceModifier: 1.00,
                        order: 0
                    }
                });
            }
            console.log('Updated Scrappy per-level price');
        } else if (option.label === 'Level range (Specific bench)') {
            const existing = option.values.find(v => v.value === 'price_per_level');
            if (existing) {
                await prisma.serviceOptionValue.update({
                    where: { id: existing.id },
                    data: { priceModifier: 3.00 }
                });
            } else {
                await prisma.serviceOptionValue.create({
                    data: {
                        optionId: option.id,
                        label: 'Price Per Level',
                        value: 'price_per_level',
                        priceModifier: 3.00,
                        order: 0
                    }
                });
            }
            console.log('Updated Bench per-level price');
        }
    }
}
m().catch(console.error).finally(() => prisma.$disconnect());
