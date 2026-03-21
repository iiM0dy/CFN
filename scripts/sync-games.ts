import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const GAMES = [
  { name: "World of Warcraft", tag: "Raid • Leveling", bg: "https://i.postimg.cc/fRFFs36m/15-(4).png", character: "https://i.postimg.cc/4NfjQR6c/15-(3).png", href: "/wow/services" },
  { name: "ARC Raiders", tag: "Materials • Loot", bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "/arc-raiders/services" },
  { name: "Valorant", tag: "Rank • Coaching", bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "/valorant/services" },
  { name: "League of Legends", tag: "Rank • Duo Queue", bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "/lol/services" },
  { name: "Path Of Exile", tag: "Currency • Items", bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "/poe/services" },
  { name: "Path Of Exile 2", tag: "Currency • Items", bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Throne And Liberty", tag: "Currency • Items", bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Diablo IV", tag: "Power • Gold", bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Marvel Rivals", tag: "Currency • Items", bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Overwatch", tag: "Rank • Coaching", bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Destiny 2", tag: "Rank • Coaching", bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
  { name: "Call of Duty", tag: "MWIII • Warzone", bg: "https://i.postimg.cc/YCzk2Rg7/Refine-the-image-make-the-logo-inspired-shape-much-larger-and-more-integrated-into-the-background.png", href: "#" },
]

async function main() {
  console.log("Syncing games from app/page.tsx to DB...")
  for (const game of GAMES) {
    const slug = game.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    await prisma.gameService.upsert({
      where: { name: game.name },
      update: {
        bgImage: game.bg,
        charImage: game.character || null,
        href: game.href,
        slug: slug,
        description: game.tag || "",
      },
      create: {
        name: game.name,
        slug: slug,
        description: game.tag || "",
        bgImage: game.bg,
        charImage: game.character || null,
        href: game.href,
      }
    })
  }
  console.log("Sync complete.")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
