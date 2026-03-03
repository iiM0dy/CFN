import { prisma } from "./lib/prisma"

async function deleteOldService() {
  // Delete the old "Materials" service
  await prisma.service.delete({
    where: { id: "cmmaxcfmh000gc64le7tfxmov" }
  })
  
  console.log("Deleted old Materials service")
}

deleteOldService()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
