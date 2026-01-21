"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COMMANDS = [
    "Innovate.",
    "Implement.",
    "Inspire."
];

export const PreLoader = () => {
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (index === COMMANDS.length) {
            setTimeout(() => setIsLoading(false), 300); // Reduced from 800ms
            return;
        }

        const timeout = setTimeout(
            () => {
                setIndex((prev) => prev + 1);
            },
            400 // Reduced from 1200ms for faster loading
        );
        return () => clearTimeout(timeout);
    }, [index]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="loader"
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)]"
                >
                    <AnimatePresence mode="wait">
                        {index < COMMANDS.length && (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.25 }}
                                className="absolute"
                            >
                                <h1 className="font-mono text-4xl md:text-7xl font-bold text-[var(--neon-lime)] tracking-tighter">
                                    {COMMANDS[index]}
                                </h1>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

