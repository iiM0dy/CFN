import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/prisma";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareButton } from "@/components/blog/share-button";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug }
    });

    if (!post) return { title: "Post Not Found | CFNboost" };

    return {
        title: `${post.title} | CFNboost Intelligence`,
        description: post.excerpt || `Elite tactical report: ${post.title}`,
        openGraph: {
            title: post.title,
            description: `Expert field report from the CFNboost command center.`,
            images: [{ url: post.image || "/assets/blog/setup.png", width: 1200, height: 630 }],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug }
    });

    if (!post || !post.isActive) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#050505] text-white selection:bg-primary/30 selection:text-primary">
            <ReadingProgress />

            {/* article JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "description": post.excerpt,
                        "image": `https://www.cfnboost.com${post.image || "/assets/blog/setup.png"}`,
                        "author": { "@type": "Person", "name": post.author || "Sector-01" },
                        "datePublished": post.publishedAt.toISOString(),
                        "publisher": { "@type": "Organization", "name": "CFNboost" }
                    })
                }}
            />

            <main className="flex-1 w-full relative">
                {/* Hero Header: Full Width Cinematic */}
                <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden border-b border-white/5">
                    <Image
                        src={post.image || "/assets/blog/setup.png"}
                        alt={post.title}
                        fill
                        className="object-cover scale-105 blur-sm opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-[#050505] via-transparent to-[#050505]" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                        <div className="max-w-[1440px] px-6 lg:px-10 w-full flex flex-col items-center">
                            <Link
                                href="/blog"
                                className="group inline-flex items-center gap-2 mb-12 text-[12px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-primary transition-all"
                            >
                                <span className="material-symbols-outlined text-sm group-hover:-translate-x-2 transition-transform">west</span>
                                Back to Blog
                            </Link>

                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded bg-primary/20 border border-primary/30 mb-8 backdrop-blur-xl">
                                <span className="text-[12px] font-black uppercase tracking-[0.2em] text-primary">{post.category}</span>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-black tracking-[calc(-0.05em)] uppercase mb-8 leading-[0.85] max-w-5xl">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center justify-center gap-8 py-6 px-10 rounded-full bg-white/5 border border-white/5 backdrop-blur-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                                        <span className="material-symbols-outlined text-sm text-primary">person</span>
                                    </div>
                                    <span className="text-[12px] font-black uppercase tracking-widest text-slate-400">Author: <span className="text-white">{post.author}</span></span>
                                </div>
                                <div className="hidden sm:block h-4 w-px bg-white/10" />
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                                        <span className="material-symbols-outlined text-sm text-primary">calendar_month</span>
                                    </div>
                                    <span className="text-[12px] font-black uppercase tracking-widest text-slate-400">Published: <span className="text-white">{new Date(post.publishedAt).toLocaleDateString()}</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Content Area */}
                <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
                    <div className="flex flex-col lg:flex-row gap-16 py-20">
                        {/* Sidebar: Tactical Controls */}
                        <aside className="lg:w-48 xl:w-64 order-2 lg:order-1">
                            <div className="sticky top-32 space-y-12">
                                <div>
                                    <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 border-l-2 border-primary pl-4">Post Info</h4>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Sector</span>
                                            <span className="text-[12px] font-black uppercase text-white tracking-widest">Global Mainnet</span>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Clearance</span>
                                            <span className="text-[12px] font-black uppercase text-emerald-400 tracking-widest">Public Access</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 border-l-2 border-primary pl-4">Actions</h4>
                                    <div className="flex flex-col gap-3">
                                        <ShareButton />
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Text Content */}
                        <article className="flex-1 max-w-4xl order-1 lg:order-2">
                            {/* Featured Media Box */}
                            <div className="relative aspect-21/9 rounded-4xl overflow-hidden border border-white/10 mb-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)]">
                                <Image src={post.image || "/assets/blog/setup.png"} alt={post.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-linear-to-t from-[#050505]/40 to-transparent" />
                            </div>

                            {/* Content Implementation */}
                            <div
                                className="prose prose-invert prose-p:text-slate-400 prose-p:text-lg prose-p:font-medium prose-p:leading-relaxed prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-white prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-12 prose-blockquote:rounded-3xl prose-blockquote:not-italic prose-blockquote:text-xl prose-blockquote:font-black prose-blockquote:text-primary prose-strong:text-white"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />


                        </article>
                    </div>

                    {/* Bottom CTA: Operational Shift */}
                    <div className="mb-32 p-1 rounded-4xl bg-linear-to-r from-primary/30 via-white/10 to-transparent">
                        <div className="p-16 rounded-[calc(2.5rem-4px)] bg-[#0A0A0A] flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left overflow-hidden relative">
                            <div className="absolute -right-20 -bottom-20 size-80 bg-primary/5 rounded-full blur-3xl" />
                            <div className="max-w-xl relative shrink-0">
                                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
                                    Ready to <span className="text-primary">Level Up?</span>
                                </h3>
                                <p className="text-slate-400 text-base font-medium leading-relaxed">
                                    "Our team is ready to help you win and reach the next level today."
                                </p>
                            </div>
                            <Link
                                href="/#games"
                                className="group relative h-20 px-16 rounded-2xl bg-primary flex items-center justify-center overflow-hidden hover:scale-105 transition-all duration-500 shadow-[0_20px_50px_-10px_rgba(175,18,37,0.5)] active:scale-95"
                            >
                                <span className="relative z-10 text-[12px] font-black uppercase tracking-[0.4em] text-white flex items-center gap-4">
                                    Start Now
                                    <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-transform">bolt</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
