import { prisma } from "../lib/prisma"

async function main() {
    const service = await prisma.service.findFirst({
        where: { name: "Weather Monitor System Project" },
        include: { options: { include: { values: true } } }
    })

    if (!service) {
        console.error("Service not found")
        return
    }

    const stagesOption = service.options.find(o => o.label === "Stages")
    if (stagesOption) {
        // Update type to checkboxes (plural) to match the inline grid look
        await prisma.serviceOption.update({
            where: { id: stagesOption.id },
            data: { type: "checkboxes" }
        })

        // Ensure first stage is default
        const firstStage = stagesOption.values.sort((a, b) => a.order - b.order)[0]
        await prisma.serviceOptionValue.update({
            where: { id: firstStage.id },
            data: { isDefault: true }
        })
        console.log(`Updated Stages to 'checkboxes' and set '${firstStage.label}' as default.`)
    }

    console.log("Update completed!")
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect())
