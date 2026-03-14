import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function m() {
    const s = await prisma.service.findFirst({
        where: { name: 'Workshop Leveling' },
        include: {
            options: {
                include: {
                    values: true
                }
            }
        }
    });
    if (s) {
        console.log('--- SERVICE ---');
        console.log('Name:', s.name);
        console.log('BasePrice:', s.basePrice);
        s.options.sort((a, b) => a.order - b.order).forEach(o => {
            console.log('--- OPTION ---');
            console.log('Label:', o.label, '| Type:', o.type, '| Min:', o.minValue, '| Max:', o.maxValue);
            o.values.sort((a, b) => a.order - b.order).forEach(v => {
                console.log('  Value:', v.label, '| ValueVal:', v.value, '| Price:', v.priceModifier);
            });
        });
    } else {
        console.log('Service not found');
    }
}
m().catch(console.error).finally(() => prisma.$disconnect());
