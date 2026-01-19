"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const codeLines = [
    { text: "import tensorflow as tf", delay: 0 },
    { text: "from sklearn.model_selection import train_test_split", delay: 800 },
    { text: "", delay: 1400 },
    { text: "# Initialize Neural Network", delay: 1600 },
    { text: "model = tf.keras.Sequential([", delay: 2200 },
    { text: "    tf.keras.layers.Dense(128, activation='relu'),", delay: 2800 },
    { text: "    tf.keras.layers.Dense(64, activation='relu'),", delay: 3400 },
    { text: "    tf.keras.layers.Dense(10, activation='softmax')", delay: 4000 },
    { text: "])", delay: 4600 },
    { text: "", delay: 5000 },
    { text: "model.compile(optimizer='adam', loss='categorical_crossentropy')", delay: 5200 },
    { text: "model.fit(X_train, y_train, epochs=50)", delay: 5800 },
    { text: "", delay: 6400 },
    { text: "# Model Accuracy: 98.7% ✓", delay: 6600 },
];

export function CodeTypingEffect({ className }: { className?: string }) {
    const [visibleLines, setVisibleLines] = useState<number[]>([]);
    const [currentTyping, setCurrentTyping] = useState<number>(0);

    useEffect(() => {
        codeLines.forEach((line, index) => {
            setTimeout(() => {
                setVisibleLines((prev) => [...prev, index]);
                setCurrentTyping(index + 1);
            }, line.delay);
        });

        // Loop the animation
        const resetTimer = setTimeout(() => {
            setVisibleLines([]);
            setCurrentTyping(0);
        }, 8000);

        return () => clearTimeout(resetTimer);
    }, []);

    return (
        <div className={`font-mono text-xs sm:text-sm leading-relaxed ${className}`}>
            {codeLines.map((line, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={visibleLines.includes(index) ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3 }}
                    className="flex"
                >
                    <span className="text-neutral-500 dark:text-neutral-600 select-none w-6 text-right mr-4">
                        {index + 1}
                    </span>
                    <span className={getLineColor(line.text)}>
                        {line.text}
                        {currentTyping === index + 1 && (
                            <span className="inline-block w-2 h-4 bg-[var(--neon-lime)] ml-1 animate-pulse" />
                        )}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}

function getLineColor(text: string): string {
    if (text.startsWith("#")) return "text-neutral-500 dark:text-neutral-500";
    if (text.startsWith("import") || text.startsWith("from")) return "text-purple-600 dark:text-purple-400";
    if (text.includes("=")) return "text-neutral-800 dark:text-neutral-200";
    if (text.includes("✓")) return "text-green-600 dark:text-green-400";
    return "text-neutral-700 dark:text-neutral-300";
}
