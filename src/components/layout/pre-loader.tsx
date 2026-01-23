"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceType } from "@/hooks/use-device-type";
import { TextDecode } from "@/components/ui/text-decode";

const COMMANDS = [
    "Innovate",
    "Implement",
    "Inspire"
];

const SYSTEM_LOGS = [
    "Initializing neural core...",
    "Syncing datasets...",
    "Optimizing experience...",
    "Establishing connection...",
    "Applying cyber-academic protocols..."
];

export const PreLoader = () => {
    const [index, setIndex] = useState(0);
    const [logIndex, setLogIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isDocumentReady, setIsDocumentReady] = useState(false);
    const [uptime, setUptime] = useState(0);
    const { isMobile, device } = useDeviceType();

    // Device-specific timing: faster on mobile, more cinematic on desktop
    const wordDuration = isMobile ? 800 : 1200;

    useEffect(() => {
        const handleReady = () => {
            if (document.readyState === "complete") {
                setIsDocumentReady(true);
            }
        };

        if (document.readyState === "complete") {
            const timeout = setTimeout(() => setIsDocumentReady(true), 100);
            return () => clearTimeout(timeout);
        } else {
            window.addEventListener("load", handleReady);
            return () => window.removeEventListener("load", handleReady);
        }
    }, []);

    // Uptime counter for that tactical feel
    useEffect(() => {
        const timer = setInterval(() => {
            setUptime(prev => prev + 0.01);
        }, 10);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (index === COMMANDS.length) {
            if (isDocumentReady) {
                const exitTimer = setTimeout(() => setIsLoading(false), 800);
                return () => clearTimeout(exitTimer);
            }
            return;
        }

        const timeout = setTimeout(
            () => {
                setIndex((prev) => prev + 1);
                setLogIndex((prev) => (prev + 1) % SYSTEM_LOGS.length);
            },
            wordDuration
        );
        return () => clearTimeout(timeout);
    }, [index, isDocumentReady, wordDuration]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        clipPath: "circle(0% at 50% 50%)",
                        filter: "blur(20px)",
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.7, 0, 0.3, 1],
                        opacity: { duration: 0.8 }
                    }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] overflow-hidden"
                >
                    {/* Dynamic grid background */}
                    <motion.div
                        animate={{
                            opacity: [0.03, 0.08, 0.03],
                            scale: [1, 1.02, 1],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-[linear-gradient(rgba(212,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,255,0,0.05)_1px,transparent_1px)] bg-[size:60px_60px] md:bg-[size:80px_80px]"
                    />

                    {/* Top Stats Bar */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none opacity-40 font-mono text-[10px] uppercase tracking-wider">
                        <div className="flex flex-col gap-1">
                            <span className="text-[var(--neon-lime)]">Device: {device}</span>
                            <span>Status: Initializing</span>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span>Uptime: {uptime.toFixed(2)}s</span>
                            <span>Protocol: v2.0.4-LXC</span>
                        </div>
                    </div>

                    {/* Branding Section */}
                    <div className="absolute top-24 md:top-32 left-0 w-full flex flex-col items-center pointer-events-none px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="space-y-3"
                        >
                            <span className="block text-[10px] md:text-xs font-bold tracking-[0.6em] uppercase text-neutral-400">
                                AI & Machine Learning Club
                            </span>
                            <div className="flex items-center justify-center gap-4">
                                <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent via-[var(--neon-lime)]/40 to-transparent" />
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon-lime)]/40 animate-pulse" />
                                <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent via-[var(--neon-lime)]/40 to-transparent" />
                            </div>
                            <span className="block text-[8px] md:text-[9px] font-medium tracking-[0.4em] uppercase text-neutral-500 max-w-xs mx-auto">
                                Oriental College Of Technology, Bhopal
                            </span>
                        </motion.div>
                    </div>

                    {/* Main word animation with TextDecode */}
                    <div className="relative h-40 md:h-64 flex items-center justify-center w-full">
                        <AnimatePresence mode="wait">
                            {index < COMMANDS.length && (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(15px)" }}
                                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -30, scale: 1.1, filter: "blur(15px)" }}
                                    transition={{ duration: wordDuration * 0.0006, ease: [0.33, 1, 0.68, 1] }}
                                    className="absolute"
                                >
                                    <h1 className="font-mono text-5xl sm:text-7xl md:text-[10rem] font-black tracking-tighter leading-none">
                                        <TextDecode
                                            text={COMMANDS[index]}
                                            className="text-[var(--neon-lime)] drop-shadow-[0_0_40px_rgba(212,255,0,0.4)] block text-center"
                                        />
                                    </h1>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Status Console & Logs */}
                    <div className="absolute bottom-24 md:bottom-28 w-full flex flex-col items-center gap-8 px-8">
                        {/* Dynamic Log Line */}
                        <div className="h-4 flex items-center justify-center overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={logIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 0.6, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-[9px] md:text-[11px] font-mono tracking-widest uppercase text-[var(--neon-lime)]/80 italic"
                                >
                                    {`>> ${SYSTEM_LOGS[logIndex]}`}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        {/* Progress Pips */}
                        <div className="flex items-center gap-4">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        opacity: index > i ? 1 : 0.3,
                                        scale: index === i ? 1.4 : 1,
                                        backgroundColor: index > i ? "#D4FF00" : "transparent"
                                    }}
                                    className={`w-2 h-2 rounded-full border border-[var(--neon-lime)]/40 transition-colors duration-500`}
                                />
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            className="text-[10px] uppercase tracking-[0.3em] font-mono text-neutral-500 mt-2"
                        >
                            {index < COMMANDS.length ? "Initializing Neural Core" : (isDocumentReady ? "Ready to Manifest" : "Awaiting Assets")}
                        </motion.div>
                    </div>

                    {/* Scanner Line Overlay */}
                    <motion.div
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--neon-lime)]/5 to-transparent h-1/4 w-full pointer-events-none z-10 opacity-30"
                    />

                    {/* Corner Frame Accents */}
                    <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[var(--neon-lime)]/20 rounded-tl-xl" />
                    <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[var(--neon-lime)]/20 rounded-tr-xl" />
                    <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[var(--neon-lime)]/20 rounded-bl-xl" />
                    <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[var(--neon-lime)]/20 rounded-br-xl" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};








