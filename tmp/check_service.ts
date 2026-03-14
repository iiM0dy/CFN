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

    const output = {
        name: service.name,
        basePrice: service.basePrice,
        options: service.options.map(o => ({
            label: o.label,
            type: o.type,
            minValue: o.minValue,
            maxValue: o.maxValue,
            values: o.values.map(v => ({
                label: v.label,
                value: v.value,
                priceModifier: v.priceModifier
            }))
        }))
    };
    console.log(JSON.stringify(output, null, 2));
}
m().finally(() => prisma.$disconnect());
