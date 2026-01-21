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
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)] overflow-hidden"
                >
                    {/* Animated gradient background */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            background: "radial-gradient(circle at 50% 50%, rgba(212,255,0,0.08) 0%, transparent 60%)",
                        }}
                    />

                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

                    {/* Animated rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {[1, 2, 3].map((ring) => (
                            <motion.div
                                key={ring}
                                className="absolute rounded-full border border-[var(--neon-lime)]/10"
                                initial={{ width: 80, height: 80, opacity: 0 }}
                                animate={{
                                    width: [80, 400 + ring * 120],
                                    height: [80, 400 + ring * 120],
                                    opacity: [0.4, 0],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    delay: ring * 0.5,
                                    ease: "easeOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* Club branding */}
                    <motion.div
                        initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-10 text-center"
                    >
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-neutral-400">
                            AI & Machine Learning Club
                        </span>
                    </motion.div>

                    {/* Main word animation with blur effects */}
                    <div className="relative h-28 md:h-36 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {!showFinal && index < COMMANDS.length && (
                                <motion.div
                                    key={index}
                                    initial={{
                                        opacity: 0,
                                        y: 40,
                                        scale: 0.9,
                                        filter: "blur(12px)"
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        filter: "blur(0px)"
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -40,
                                        scale: 1.1,
                                        filter: "blur(12px)"
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                    className="absolute"
                                >
                                    <h1 className="font-mono text-6xl md:text-9xl font-black tracking-tight">
                                        <span className="text-[var(--neon-lime)] drop-shadow-[0_0_30px_rgba(212,255,0,0.3)]">
                                            {COMMANDS[index]}
                                        </span>
                                        <span className="text-[var(--electric-cyan)] drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">.</span>
                                    </h1>
                                </motion.div>
                            )}

                            {showFinal && (
                                <motion.div
                                    key="final"
                                    initial={{ opacity: 0, scale: 0.85, filter: "blur(15px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                    className="absolute flex items-center gap-2 md:gap-4"
                                >
                                    {COMMANDS.map((word, i) => (
                                        <React.Fragment key={word}>
                                            <motion.span
                                                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                transition={{ delay: i * 0.08, duration: 0.3 }}
                                                className="font-mono text-xl md:text-3xl lg:text-4xl font-bold text-[var(--neon-lime)] drop-shadow-[0_0_15px_rgba(212,255,0,0.25)]"
                                            >
                                                {word}
                                            </motion.span>
                                            {i < COMMANDS.length - 1 && (
                                                <motion.span
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.08 + 0.1 }}
                                                    className="text-[var(--electric-cyan)] text-lg md:text-2xl drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]"
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

                    {/* Progress bar */}
                    <motion.div
                        className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 w-40 md:w-56 h-[2px] bg-neutral-800/50 rounded-full overflow-hidden"
                        initial={{ opacity: 0, scaleX: 0.8 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                    >
                        <motion.div
                            className="h-full bg-gradient-to-r from-[var(--neon-lime)] via-[var(--electric-cyan)] to-[var(--neon-lime)] rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3.8, ease: "easeInOut" }}
                            style={{
                                boxShadow: "0 0 15px rgba(212,255,0,0.5)"
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


