import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function m() {
    const options = await prisma.serviceOption.findMany({
        where: { label: { contains: 'Level range' } },
        include: { values: true }
    });
    console.log(JSON.stringify(options, null, 2));
}
m().finally(() => prisma.$disconnect());
