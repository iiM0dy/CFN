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
        console.log(JSON.stringify(s, null, 2));
    } else {
        console.log('Service not found');
    }
}
m().catch(console.error).finally(() => prisma.$disconnect());
