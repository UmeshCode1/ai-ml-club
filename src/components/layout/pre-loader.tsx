"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COMMANDS = [
    "Innovate",
    "Implement",
    "Inspire"
];

export const PreLoader = () => {
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [showFinal, setShowFinal] = useState(false);

    useEffect(() => {
        if (index === COMMANDS.length) {
            // Show final combined tagline after a brief delay
            const finalTimer = setTimeout(() => setShowFinal(true), 50);
            const exitTimer = setTimeout(() => setIsLoading(false), 650);
            return () => {
                clearTimeout(finalTimer);
                clearTimeout(exitTimer);
            };
        }

        const timeout = setTimeout(
            () => {
                setIndex((prev) => prev + 1);
            },
            600 // ~600ms per word = 1.8s for all 3, + 600ms final + 100ms buffer = 2.5s
        );
        return () => clearTimeout(timeout);
    }, [index]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="loader"
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)] overflow-hidden"
                >
                    {/* Animated gradient background */}
                    <motion.div
                        className="absolute inset-0 opacity-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        style={{
                            background: "radial-gradient(circle at 50% 50%, var(--neon-lime) 0%, transparent 50%)",
                        }}
                    />

                    {/* Animated rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {[1, 2, 3].map((ring) => (
                            <motion.div
                                key={ring}
                                className="absolute rounded-full border border-[var(--neon-lime)]/20"
                                initial={{ width: 100, height: 100, opacity: 0 }}
                                animate={{
                                    width: [100, 300 + ring * 100],
                                    height: [100, 300 + ring * 100],
                                    opacity: [0.3, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: ring * 0.4,
                                    ease: "easeOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* Club branding */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 text-center"
                    >
                        <span className="text-xs font-bold tracking-[0.3em] uppercase text-neutral-500">
                            AI & Machine Learning Club
                        </span>
                    </motion.div>

                    {/* Main word animation */}
                    <div className="relative h-24 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {!showFinal && index < COMMANDS.length && (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -30, scale: 1.1 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                    className="absolute"
                                >
                                    <h1 className="font-mono text-5xl md:text-8xl font-black text-[var(--neon-lime)] tracking-tight">
                                        {COMMANDS[index]}
                                        <span className="text-[var(--electric-cyan)]">.</span>
                                    </h1>
                                </motion.div>
                            )}

                            {showFinal && (
                                <motion.div
                                    key="final"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                    className="absolute flex items-center gap-3 md:gap-4"
                                >
                                    {COMMANDS.map((word, i) => (
                                        <React.Fragment key={word}>
                                            <motion.span
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="font-mono text-2xl md:text-4xl font-bold text-[var(--neon-lime)]"
                                            >
                                                {word}
                                            </motion.span>
                                            {i < COMMANDS.length - 1 && (
                                                <span className="text-[var(--electric-cyan)] text-xl md:text-3xl">•</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Progress bar */}
                    <motion.div
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-neutral-800 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.div
                            className="h-full bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)]"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.3, ease: "easeInOut" }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

