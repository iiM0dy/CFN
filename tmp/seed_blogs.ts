import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const blogs = [
        {
            title: "The Ultimate Guide to Modern Workshop Leveling",
            slug: "modern-workshop-leveling-guide",
            excerpt: "Mastering the workshop isn't just about grinding; it's about strategic resource allocation and timing.",
            category: "Strategy",
            author: "Sector-01",
            image: "/assets/blog/setup.png",
            content: `
        <p>Mastering the workshop isn't just about grinding; it's about strategic resource allocation and timing. In today's competitive landscape, the difference between a mid-tier player and an elite one is their ability to leverage every available asset in the game's economy.</p>
        <h2>Strategic Resource Allocation</h2>
        <p>When starting your level-up journey, focus first on the Scrappy modules. While they may seem basic, their efficiency per resource unit far outweighs more advanced benches in the early game. Once you've secured a stable foundation of automated processing, shifting your focus to Specific Benches becomes mandatory for high-tier gear manufacturing.</p>
        <blockquote>"Intel is nothing without execution. Put our professional strategies into action today with our elite gaming services."</blockquote>
        <p>The key takeaway is consistency. Log in daily, check your resource nodes, and ensure your queue is always occupied. By following our professional protocols, you'll see a 40% increase in leveling speed without increasing your playtime.</p>
      `
        },
        {
            title: "Why Low Latency is Your Secret Competitive Edge",
            slug: "low-latency-competitive-edge",
            excerpt: "Behind every elite performance is a optimized network. We break down the technical aspects of ping and packet loss.",
            category: "Tech",
            author: "Core-Admin",
            image: "/assets/blog/controller.png",
            content: `
        <p>Behind every elite performance is a optimized network. We break down the technical aspects of ping and packet loss. In a frame-perfect world, 10ms is the difference between life and death.</p>
        <h2>The Technical Layer</h2>
        <p>Many players assume that bandwidth is the only metric that matters. This is incorrect. While your download speed handles the texture streaming, your latency (ping) and jitter (variation in ping) are the real metrics of performance for multiplayer gaming.</p>
        <p>By optimizing your local network configuration, routing through prioritized nodes, and ensuring a stable ethernet connection, you can gain a 2-3 frame advantage over your opponents. In high-rank play, this is non-negotiable.</p>
      `
        },
        {
            title: "Building the Perfect In-Game Team Dynamic",
            slug: "perfect-team-dynamic-guide",
            excerpt: "Solo queuing is a gamble. Learn the communication protocols and role distributions that lead to 99% win rates.",
            category: "Guides",
            author: "Squad-Lead",
            image: "/assets/blog/teamwork.png",
            content: `
        <p>Solo queuing is a gamble. Learn the communication protocols and role distributions that lead to 99% win rates. Teamwork is not just about playing together; it's about operating as a single unit.</p>
        <h2>Communication Protocols</h2>
        <p>Ditch the toxic voice comms. Elite squads use standardized callouts and non-verbal cues. Every micro-action should be communicated in a concise, action-oriented manner.</p>
        <p>Role distributions should be based on individual strengths and current meta requirements. Don't force players into roles they're not comfortable with, but ensure every core necessity of the current patch is covered.</p>
      `
        }
    ];

    for (const blog of blogs) {
        await prisma.blogPost.upsert({
            where: { slug: blog.slug },
            update: blog,
            create: blog,
        });
    }

    console.log("3 Blogs seeded successfully");
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
