"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GradientBorder } from "@/components/ui/gradient-border";

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
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const hasStarted = useRef(false);

    useEffect(() => {
        if (isInView && !hasStarted.current) {
            hasStarted.current = true;
            codeLines.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleLines((prev) => [...prev, index]);
                }, index * 800);
            });
        }
    }, [isInView]);

    return (
        <section ref={ref} className="py-16 md:py-24 relative z-10 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block px-3 py-1 rounded-full bg-[var(--electric-cyan)]/10 text-[var(--electric-cyan-text)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--electric-cyan)]/20">
                        Live Code Preview
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                        What We <span className="text-[var(--neon-lime-text)]">Build</span>
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Real AI/ML models, trained and deployed by our members.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    <GradientBorder
                        containerClassName="rounded-2xl shadow-2xl"
                        className="bg-neutral-950 p-6 md:p-8"
                        duration={12}
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-neutral-800">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="ml-4 text-xs text-neutral-500 font-mono">train_model.py — AIML Club</span>
                        </div>

                        {/* Code Content */}
                        <div className="font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                            {codeLines.map((line, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={visibleLines.includes(index) ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.3 }}
                                    className="flex"
                                >
                                    <span className="text-neutral-600 select-none w-6 text-right mr-4 shrink-0">
                                        {index + 1}
                                    </span>
                                    <span className={getColorClass(line.color)}>
                                        {line.text}
                                        {visibleLines.length === index + 1 && (
                                            <span className="inline-block w-2 h-4 bg-[var(--neon-lime)] ml-1 animate-[pulse_2.5s_infinite]" />
                                        )}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </GradientBorder>
                </motion.div>
            </div>
        </section>
    );
}
