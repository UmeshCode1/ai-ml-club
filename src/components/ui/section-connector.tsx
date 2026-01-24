"use client";

import { motion } from "framer-motion";

export function SectionConnector() {
    return (
        <div className="relative h-24 w-full flex justify-center overflow-hidden pointer-events-none z-0">
            {/* Main Path SVG */}
            <svg width="2" height="100%" className="opacity-20 dark:opacity-40">
                <motion.line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="100%"
                    stroke="var(--neon-lime)"
                    strokeWidth="2"
                    strokeDasharray="4 8"
                    animate={{
                        strokeDashoffset: [0, -24],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </svg>

            {/* Glowing Pulse */}
            <motion.div
                animate={{
                    y: ["-20%", "120%"],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-0 w-[4px] h-20 bg-gradient-to-b from-transparent via-[var(--neon-lime)] to-transparent blur-sm"
            />
        </div>
    );
}
