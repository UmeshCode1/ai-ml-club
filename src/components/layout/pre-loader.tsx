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

    useEffect(() => {
        if (index === COMMANDS.length) {
            // After the last word ("Inspire"), wait 1s before closing the loader
            const exitTimer = setTimeout(() => setIsLoading(false), 1000);
            return () => clearTimeout(exitTimer);
        }

        const timeout = setTimeout(
            () => {
                setIndex((prev) => prev + 1);
            },
            1000 // Each word gets 1s of fame
        );
        return () => clearTimeout(timeout);
    }, [index]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                        filter: "blur(30px)"
                    }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)] overflow-hidden"
                >
                    {/* Animated gradient background - very slow pulse */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            opacity: [0.03, 0.06, 0.03],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            background: "radial-gradient(circle at 50% 50%, var(--neon-lime) 0%, transparent 70%)",
                        }}
                    />

                    {/* Subtle grid pattern for high-tech feel */}
                    <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {/* Branding Section - OCT Bhopal */}
                    <div className="absolute top-12 md:top-16 left-0 w-full flex flex-col items-center pointer-events-none px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="space-y-1"
                        >
                            <span className="block text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase text-neutral-500">
                                AI & Machine Learning Club
                            </span>
                            <span className="block text-[8px] md:text-[9px] font-medium tracking-[0.3em] uppercase text-neutral-600">
                                Oriental College Of Technology, Bhopal
                            </span>
                        </motion.div>
                    </div>

                    {/* Main word animation - SINGLE WORD for better visibility */}
                    <div className="relative h-32 md:h-48 flex items-center justify-center w-full">
                        <AnimatePresence mode="wait">
                            {index < COMMANDS.length && (
                                <motion.div
                                    key={index}
                                    initial={{
                                        opacity: 0,
                                        y: 40,
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
                                        y: -40,
                                        scale: 1.1,
                                        filter: "blur(15px)"
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                    className="absolute"
                                >
                                    <h1 className="font-mono text-7xl md:text-[10rem] font-black tracking-tighter leading-none">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-[var(--neon-lime)] drop-shadow-[0_0_50px_rgba(212,255,0,0.3)]">
                                            {COMMANDS[index]}
                                        </span>
                                        <span className="text-[var(--electric-cyan)] animate-pulse shadow-[0_0_20px_rgba(0,240,255,0.4)]">.</span>
                                    </h1>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Minimalist Loading Dots */}
                    <div className="absolute bottom-12 md:bottom-16 w-full flex justify-center px-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-2"
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        opacity: [0.2, 1, 0.2],
                                        scale: [1, 1.25, 1],
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                    }}
                                    className="w-1.5 h-1.5 rounded-full bg-[var(--neon-lime)] shadow-[0_0_10px_rgba(212,255,0,0.5)]"
                                />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};






