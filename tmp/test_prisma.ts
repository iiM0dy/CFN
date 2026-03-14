import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
async function main() {
    const services = await prisma.service.findMany({ take: 1 })
    console.log("Connected! Found services:", services.length)
}
main().catch(console.error).finally(() => prisma.$disconnect())
