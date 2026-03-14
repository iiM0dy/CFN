"use client"

import { useState } from "react"

export function ShareButton() {
    const [copied, setCopied] = useState(false)

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy!", err)
        }
    }

    return (
        <button
            onClick={handleShare}
            className="w-full py-3 px-4 rounded-lg bg-surface hover:bg-surface-light border border-white/5 text-[9px] font-black uppercase tracking-widest transition-all text-left flex items-center justify-between group"
        >
            <span className="flex items-center gap-2">
                {copied ? "Link Copied!" : "Share Link"}
                {copied && <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />}
            </span>
            <span className="material-symbols-outlined text-sm text-slate-600 group-hover:text-primary transition-colors">
                {copied ? "check" : "content_copy"}
            </span>
        </button>
    )
}
