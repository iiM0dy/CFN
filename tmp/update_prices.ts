import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function m() {
    const scrappyRange = await prisma.serviceOption.findFirst({ where: { label: 'Level range (Scrappy)' } });
    const specificRange = await prisma.serviceOption.findFirst({ where: { label: 'Level range (Specific bench)' } });

    if (scrappyRange) {
        await prisma.serviceOptionValue.upsert({
            where: {
                optionId_value: {
                    optionId: scrappyRange.id,
                    value: 'price_per_level'
                }
            },
            update: { priceModifier: '1.00' },
            create: {
                optionId: scrappyRange.id,
                label: 'Price Per Level',
                value: 'price_per_level',
                priceModifier: '1.00'
            }
        });
    }

    if (specificRange) {
        await prisma.serviceOptionValue.upsert({
            where: {
                optionId_value: {
                    optionId: specificRange.id,
                    value: 'price_per_level'
                }
            },
            update: { priceModifier: '3.00' },
            create: {
                optionId: specificRange.id,
                label: 'Price Per Level',
                value: 'price_per_level',
                priceModifier: '3.00'
            }
        });
    }
    console.log('Database updated with per-level prices.');
}
m().finally(() => prisma.$disconnect());
