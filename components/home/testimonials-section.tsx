"use client"

import { MessageSquareQuote } from "lucide-react"

interface Review {
    quote: string
    author: string
    tag: string
    avatar: string
}

function StarRating() {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, j) => (
                <svg key={j} className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674 4.911.017c.969.004 1.371 1.24.588 1.81l-3.97 2.883 1.485 4.686c.285.9-.755 1.65-1.54 1.118L10 15.347l-3.944 2.768c-.784.55-1.825-.218-1.54-1.118l1.485-4.686-3.97-2.883c-.783-.57-.38-1.806.588-1.81l4.911-.017 1.519-4.674z" />
                </svg>
            ))}
        </div>
    )
}

function ReviewCard({ testimonial, featured }: { testimonial: Review; featured?: boolean }) {
    return (
        <div className={`relative flex flex-col rounded-xl border bg-[#0c0c0c] p-6 transition-all duration-300 ${
            featured
                ? "border-primary/30 shadow-[0_0_30px_rgba(175,18,37,0.12)]"
                : "border-white/[0.06] hover:border-white/10"
        }`}>
            <StarRating />

            <p className="text-gray-300 text-[13px] leading-relaxed mt-4 mb-5 flex-1 line-clamp-5">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                {testimonial.avatar ? (
                    <div
                        className="size-9 rounded-full bg-primary/10 border border-white/10 bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url('${testimonial.avatar}')` }}
                        aria-hidden="true"
                    />
                ) : (
                    <div className="size-9 rounded-full bg-primary/10 border border-white/10 flex items-center justify-center shrink-0">
                        <span className="text-[11px] font-bold text-primary">
                            {testimonial.author.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                        </span>
                    </div>
                )}
                <div className="min-w-0">
                    <h5 className="text-white font-medium text-[13px] truncate">{testimonial.author}</h5>
                    <span className="text-[11px] text-gray-500 truncate block">
                        {testimonial.tag}
                    </span>
                </div>
            </div>
        </div>
    )
}

function ReviewSkeleton() {
    return (
        <div className="rounded-xl border border-white/[0.06] bg-[#0c0c0c] p-6">
            <div className="skeleton h-2.5 w-24 mb-4" />
            <div className="space-y-1.5 mb-5">
                <div className="skeleton h-2.5 w-full" />
                <div className="skeleton h-2.5 w-full" />
                <div className="skeleton h-2.5 w-3/4" />
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="skeleton size-9 rounded-full" />
                <div>
                    <div className="skeleton h-2.5 w-20 mb-1.5" />
                    <div className="skeleton h-2 w-28" />
                </div>
            </div>
        </div>
    )
}

export function TestimonialsSection({ reviews = [], loading = false }: { reviews?: Review[]; loading?: boolean }) {
    const hasReviews = !loading && reviews.length > 0

    // Hide section entirely when no reviews and not loading (production-ready)
    if (!loading && reviews.length === 0) {
        return null
    }

    return (
        <section className="py-16 bg-[#050505]">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

                <div className="flex items-center justify-between mb-10">
                    <div>
                        <div className="h-px w-12 bg-primary mb-4" />
                        <h2 className="font-cairo text-3xl md:text-[34px] font-bold text-white tracking-tight uppercase">
                            What Players <span className="text-primary">Say</span>
                        </h2>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <ReviewSkeleton />
                        <ReviewSkeleton />
                        <ReviewSkeleton />
                    </div>
                ) : hasReviews ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {reviews.map((t, i) => (
                            <ReviewCard key={t.author} testimonial={t} featured={i === 1} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-14 text-center">
                        <div className="size-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-4">
                            <MessageSquareQuote className="size-5 text-gray-600" />
                        </div>
                        <p className="text-gray-400 text-sm font-medium mb-1">No reviews yet</p>
                        <p className="text-gray-600 text-xs max-w-sm">
                            Customer feedback will appear here once verified reviews are available.
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
