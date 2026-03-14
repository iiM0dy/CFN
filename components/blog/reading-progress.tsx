"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ReadingProgress() {
    const { scrollYProgress } = useScroll()

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <motion.div
            className="fixed top-[80px] left-0 right-0 h-1 bg-primary origin-left z-60 shadow-[0_0_10px_rgba(175,18,37,0.5)]"
            style={{ scaleX }}
        />
    )
}
