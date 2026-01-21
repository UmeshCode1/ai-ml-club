"use client";

import { motion, useScroll, useSpring } from "framer-motion";
// import { useEffect, useState } from "react"; // This import might become unused if useState and useEffect are fully removed for 'mounted'

export function GlobalScrollProgress() {
    // const [mounted, setMounted] = useState(false); // Removed
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // useEffect(() => { // Removed
    //     setMounted(true);
    // }, []); // Removed

    // if (!mounted) return null; // Removed

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--neon-lime)] via-[var(--electric-cyan)] to-[var(--neon-lime)] z-[99999] origin-left"
            style={{ scaleX }}
        >
            {/* Glow Effect */}
            <div className="absolute inset-0 blur-[4px] bg-inherit opacity-50" />
        </motion.div>
    );
}
