"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GradientBorder } from "@/components/ui/gradient-border";
import { TextDecode } from "@/components/ui/text-decode";

const codeLines = [
    { text: "import tensorflow as tf", color: "purple" },
    { text: "from sklearn.model_selection import train_test_split", color: "purple" },
    { text: "", color: "default" },
    { text: "# Initialize Neural Network", color: "comment" },
    { text: "model = tf.keras.Sequential([", color: "default" },
    { text: "    tf.keras.layers.Dense(128, activation='relu'),", color: "default" },
    { text: "    tf.keras.layers.Dense(64, activation='relu'),", color: "default" },
    { text: "    tf.keras.layers.Dense(10, activation='softmax')", color: "default" },
    { text: "])", color: "default" },
    { text: "", color: "default" },
    { text: "model.compile(optimizer='adam', loss='categorical_crossentropy')", color: "default" },
    { text: "model.fit(X_train, y_train, epochs=50)", color: "default" },
    { text: "", color: "default" },
    { text: "# Model Accuracy: 98.7% ✓", color: "success" },
];

function getColorClass(color: string): string {
    switch (color) {
        case "purple": return "text-purple-500 dark:text-purple-400";
        case "comment": return "text-neutral-500 dark:text-neutral-500";
        case "success": return "text-green-500 dark:text-green-400";
        default: return "text-neutral-700 dark:text-neutral-300";
    }
}

export function AITerminalSection() {
    const [visibleLines, setVisibleLines] = useState<number[]>([]);
    const [metrics, setMetrics] = useState({ cpu: "0.0", ram: "0.0" });
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const hasStarted = useRef(false);

    useEffect(() => {
        if (isInView && !hasStarted.current) {
            hasStarted.current = true;
            codeLines.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleLines((prev) => [...prev, index]);
                }, index * 400);
            });
        }
    }, [isInView]);

    // Simulate real-time metrics
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics({
                cpu: (Math.random() * 15 + 20).toFixed(1),
                ram: (Math.random() * 5 + 40).toFixed(1)
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={ref} className="py-16 md:py-32 relative z-10 overflow-hidden bg-transparent">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--neon-lime)]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--neon-lime)]/10 text-[var(--neon-lime-text)] text-[10px] font-bold uppercase tracking-[0.3em] mb-6 border border-[var(--neon-lime)]/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-lime)] animate-pulse" />
                        Live Neural Core
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">
                        What We <span className="text-[var(--neon-lime-text)] relative">
                            Build
                            <svg className="absolute -bottom-2 left-0 w-full h-2 text-[var(--neon-lime)]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </span>
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
                        Architecting the future through production-grade machine learning and autonomous systems.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl mx-auto relative group"
                >
                    {/* Decorative bits */}
                    <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[var(--neon-lime)]/20 rounded-tl-3xl pointer-events-none" />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[var(--neon-lime)]/20 rounded-br-3xl pointer-events-none" />

                    <GradientBorder
                        containerClassName="rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                        className="bg-neutral-950 p-0 md:p-0"
                        duration={15}
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900/50 border-b border-neutral-800 backdrop-blur-md">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                <span className="ml-4 text-[10px] text-neutral-500 font-mono tracking-widest uppercase flex items-center gap-2">
                                    <TextDecode text="train_model.py" className="text-[var(--neon-lime)]/70" />
                                    <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-[8px]">bash</span>
                                </span>
                            </div>
                            <div className="hidden sm:flex items-center gap-6 font-mono text-[9px] uppercase tracking-tighter text-neutral-500">
                                <div className="flex flex-col items-end">
                                    <span className="text-neutral-600">CPU-LOAD</span>
                                    <span className="text-[var(--neon-lime)]/60">{metrics.cpu}%</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-neutral-600">RAM-USAGE</span>
                                    <span className="text-[var(--neon-lime)]/60">{metrics.ram}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Code Content */}
                        <div className="p-6 md:p-8 font-mono text-[11px] sm:text-[13px] leading-relaxed relative min-h-[400px]">
                            {/* Scanning line */}
                            <motion.div
                                animate={{ y: ["0%", "100%", "0%"] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-lime)]/20 to-transparent z-10 pointer-events-none"
                            />

                            <div className="relative z-0">
                                {codeLines.map((line, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={visibleLines.includes(index) ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.3 }}
                                        className="flex py-0.5"
                                    >
                                        <span className="text-neutral-700 select-none w-8 text-right mr-6 shrink-0 font-bold border-r border-neutral-800">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>
                                        <span className={`${getColorClass(line.color)} pl-2`}>
                                            {line.text}
                                            {visibleLines.length === index + 1 && (
                                                <motion.span
                                                    animate={{ opacity: [0, 1, 0] }}
                                                    transition={{ duration: 0.8, repeat: Infinity }}
                                                    className="inline-block w-2 h-4 bg-[var(--neon-lime)] ml-1 align-middle"
                                                />
                                            )}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </GradientBorder>
                </motion.div>
            </div>
        </section>
    );
}
