"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Megaphone } from "lucide-react";

export default function AnnouncementBar() {
    const [announcement, setAnnouncement] = useState<{ message: string } | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const res = await fetch("/api/announcement");
                const data = await res.json();
                if (data && data.message) {
                    setAnnouncement(data);
                }
            } catch (error) {
                console.error("Failed to fetch announcement");
            }
        };
        fetchAnnouncement();
    }, []);

    if (!announcement || !isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-primary text-white overflow-hidden relative"
            >
                <div className="max-w-[1440px] mx-auto px-6 h-10 flex items-center justify-center gap-3">
                    <Megaphone className="size-3.5 animate-bounce" />
                    <p className="text-[14px] font-black uppercase tracking-widest text-center truncate px-10">
                        {announcement.message}
                    </p>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="size-3" />
                    </button>
                </div>
                <div className="absolute bottom-0 left-0 h-px w-full bg-white/20" />
            </motion.div>
        </AnimatePresence>
    );
}
