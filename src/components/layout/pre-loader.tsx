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

export const PreLoader = () => {
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isDocumentReady, setIsDocumentReady] = useState(false);
    const { isMobile } = useDeviceType();

    // Device-specific timing
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
                        duration: 1.2,
                        ease: [0.7, 0, 0.3, 1],
                    }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] overflow-hidden"
                >
                    {/* Minimalist Micro-Grid Background */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(212,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(212,255,0,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />

                    {/* Main word animation with TextDecode */}
                    <div className="relative h-32 md:h-48 flex items-center justify-center w-full">
                        <AnimatePresence mode="wait">
                            {index < COMMANDS.length && (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute"
                                >
                                    <h1 className="font-mono text-5xl md:text-8xl font-black tracking-tighter uppercase italic">
                                        <TextDecode
                                            text={COMMANDS[index]}
                                            className="text-[var(--neon-lime)] drop-shadow-[0_0_30px_rgba(212,255,0,0.3)]"
                                        />
                                    </h1>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Status - Ultra Minimalist */}
                    <div className="absolute bottom-12 left-0 w-full flex flex-col items-center gap-4 opacity-30">
                        <div className="flex items-center gap-3">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        opacity: index >= i ? 1 : 0.3,
                                        scale: index === i ? 1.2 : 1,
                                        backgroundColor: index > i ? "#D4FF00" : "transparent"
                                    }}
                                    className="w-1.5 h-1.5 rounded-full border border-[var(--neon-lime)]/40 transition-all duration-500"
                                />
                            ))}
                        </div>
                        <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-neutral-500">
                            {index < COMMANDS.length ? "Loading Neural Assets" : "System Ready"}
                        </span>
                    </div>

                    {/* Corner Framing */}
                    <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-[var(--neon-lime)]/10" />
                    <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-[var(--neon-lime)]/10" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};








