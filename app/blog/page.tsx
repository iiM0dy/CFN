import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";
import { BlogSearch } from "@/components/blog/blog-search";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Journal | CFNboost Intelligence",
    description: "Expert insights, strategic breakdowns, and frontline meta updates for elite gaming performance.",
};

export default async function BlogListingPage() {
    const posts = await prisma.blogPost.findMany({
        where: { isActive: true },
        orderBy: { publishedAt: 'desc' }
    });

    return (
        <div className="flex min-h-screen flex-col bg-[#050505] text-white overflow-x-hidden selection:bg-primary/30 selection:text-primary">
            {/* SEO Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        "name": "CFNboost Journal",
                        "url": "https://www.cfnboost.com/blog",
                        "blogPost": posts.map(post => ({
                            "@type": "BlogPosting",
                            "headline": post.title,
                            "image": `https://www.cfnboost.com${post.image || "/assets/blog/setup.png"}`,
                            "datePublished": post.publishedAt.toISOString()
                        }))
                    })
                }}
            />

            <main className="flex-1 w-full relative">
                {/* Modern Ambient Optics */}
                <div className="absolute top-0 left-0 w-full h-[1000px] pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
                    {/* Hero: Minimalist & High Impact */}
                    <section className="pt-24 pb-16">
                        <div className="border-b border-white/5 pb-12">
                            <div className="max-w-2xl">
                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
                                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-white to-primary bg-300% animate-gradient">Blogs</span>
                                </h1>
                                <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed max-w-xl border-l-2 border-primary/30 pl-6">
                                    "Winning starts with the right info. Read our latest guides and tips to stay ahead."
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Functional Content Feed */}
                    <section className="pb-32">
                        <BlogSearch posts={posts} />
                    </section>
                </div>

            </main>

            <Footer />
        </div>
    );
}
