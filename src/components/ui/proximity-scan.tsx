"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function ProximityScan() {
    const { scrollYProgress } = useScroll();
    const [scanText, setScanText] = useState("INITIALIZING_SCANNER...");

    // Smooth progress for the scan line
    const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["hero", "about", "stats", "features", "activities", "team"];
            const scrollPos = window.scrollY + window.innerHeight / 2;

            // This is a simplified section detection
            // In a real app we'd use Interaction Observer or refs
            const currentSection = Math.floor((scrollPos / document.body.scrollHeight) * sections.length);
            const sectionName = sections[currentSection] || "IDLE";

            setScanText(`SCAN_TARGET: ${sectionName.toUpperCase()} | STATUS: ANALYZING | DEPTH: ${(scrollYProgress.get() * 100).toFixed(2)}%`);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollYProgress]);

    return (
        <>
            {/* Global Scanning Line */}
            <motion.div
                style={{ top: y }}
                className="fixed left-0 w-full h-[1px] bg-[var(--neon-lime)]/40 z-[9999] pointer-events-none shadow-[0_0_15px_var(--neon-lime)] hidden lg:block"
            >
                <div className="absolute right-4 top-2 font-mono text-[9px] text-[var(--neon-lime-text)] bg-black/80 backdrop-blur-md px-3 py-1 rounded-sm border border-[var(--neon-lime)]/20 uppercase tracking-widest">
                    {scanText}
                </div>
            </motion.div>

            {/* Corner Metadata */}
            <div className="fixed bottom-10 left-10 z-[9999] font-mono text-[8px] text-neutral-500 dark:text-neutral-600 hidden xl:block uppercase tracking-[0.4em] [writing-mode:vertical-rl] opacity-40">
                OCT_AIML_CLUSTER_SYSTEM_v3.0.4 // INFRA_SECURE
            </div>
        </>
    );
}
