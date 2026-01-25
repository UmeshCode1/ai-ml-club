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
            className="hidden md:block fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--neon-lime)] via-[var(--electric-cyan)] to-[var(--neon-lime)] z-[99999] origin-left shadow-[0_0_10px_var(--neon-lime)]"
            style={{ scaleX }}
        >
            {/* Pulsing Glow Effect */}
            <motion.div
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 blur-[3px] bg-inherit"
            />
        </motion.div>
    );
}
