import { prisma } from "../lib/prisma"

async function main() {
    const service = await prisma.service.findFirst({
        where: { name: "Weather Monitor System Project" },
        include: { options: { include: { values: true } } }
    })

    if (!service) {
        console.log("Service not found")
        return
    }

    console.log("Service:", service.name)
    service.options.forEach(opt => {
        console.log(`Option: ${opt.label} (${opt.type})`)
        opt.values.forEach(val => {
            console.log(`  - ${val.label}: ${val.value} (isDefault: ${val.isDefault})`)
        })
    })
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect())
