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
            const finalTimer = setTimeout(() => setShowFinal(true), 100);
            const exitTimer = setTimeout(() => setIsLoading(false), 1000); // 1s final reveal
            return () => {
                clearTimeout(finalTimer);
                clearTimeout(exitTimer);
            };
        }

        const timeout = setTimeout(
            () => {
                setIndex((prev) => prev + 1);
            },
            1000 // 1s per word = 3s total for words
        );
        return () => clearTimeout(timeout);
    }, [index]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="loader"
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                        filter: "blur(20px)"
                    }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)] overflow-hidden"
                >
                    {/* Animated gradient background */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            background: "radial-gradient(circle at 50% 50%, rgba(212,255,0,0.06) 0%, transparent 70%)",
                        }}
                    />

                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {/* Animated rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {[1, 2, 3].map((ring) => (
                            <motion.div
                                key={ring}
                                className="absolute rounded-full border border-[var(--neon-lime)]/5"
                                initial={{ width: 60, height: 60, opacity: 0 }}
                                animate={{
                                    width: [60, 500 + ring * 150],
                                    height: [60, 500 + ring * 150],
                                    opacity: [0.3, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: ring * 0.6,
                                    ease: "easeOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* Branding Section */}
                    <div className="absolute top-12 md:top-16 left-0 w-full flex flex-col items-center pointer-events-none px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-2"
                        >
                            <span className="block text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-neutral-500">
                                AI & Machine Learning Club
                            </span>
                            <span className="block text-[9px] md:text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-600/80">
                                Oriental College Of Technology, Bhopal
                            </span>
                        </motion.div>
                    </div>

                    {/* Main word animation with blur effects */}
                    <div className="relative h-32 md:h-48 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {!showFinal && index < COMMANDS.length && (
                                <motion.div
                                    key={index}
                                    initial={{
                                        opacity: 0,
                                        y: 50,
                                        scale: 0.9,
                                        filter: "blur(15px)"
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        filter: "blur(0px)"
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -50,
                                        scale: 1.1,
                                        filter: "blur(15px)"
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                    className="absolute"
                                >
                                    <h1 className="font-mono text-7xl md:text-9xl font-black tracking-tight flex items-baseline">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-[var(--neon-lime)] to-[var(--neon-lime)]/80 drop-shadow-[0_0_40px_rgba(212,255,0,0.2)]">
                                            {COMMANDS[index]}
                                        </span>
                                        <span className="text-[var(--electric-cyan)] ml-1 animate-pulse drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">.</span>
                                    </h1>
                                </motion.div>
                            )}

                            {showFinal && (
                                <motion.div
                                    key="final"
                                    initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                    className="absolute flex items-center gap-2 md:gap-5"
                                >
                                    {COMMANDS.map((word, i) => (
                                        <React.Fragment key={word}>
                                            <motion.span
                                                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                transition={{ delay: i * 0.12, duration: 0.4 }}
                                                className="font-mono text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--neon-lime)] drop-shadow-[0_0_20px_rgba(212,255,0,0.2)]"
                                            >
                                                {word}
                                            </motion.span>
                                            {i < COMMANDS.length - 1 && (
                                                <motion.span
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.12 + 0.15 }}
                                                    className="text-[var(--electric-cyan)] text-xl md:text-3xl opacity-60"
                                                >
                                                    •
                                                </motion.span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Status Indicating System Load */}
                    <div className="absolute bottom-12 md:bottom-16 w-full flex justify-center px-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-3"
                        >
                            <div className="flex gap-1.5">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            opacity: [0.2, 1, 0.2],
                                            scale: [0.8, 1, 0.8],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                        className="w-1.5 h-1.5 rounded-full bg-[var(--neon-lime)]"
                                    />
                                ))}
                            </div>
                            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-mono text-neutral-600">
                                Synchronizing Neural Network
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};



