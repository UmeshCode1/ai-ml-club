"use client";

import { motion } from "framer-motion";

const keywords = [
    { text: "TensorFlow", x: "10%", y: "20%", delay: 0 },
    { text: "PyTorch", x: "85%", y: "15%", delay: 1 },
    { text: "Neural Networks", x: "5%", y: "70%", delay: 2 },
    { text: "GPT-4", x: "80%", y: "65%", delay: 3 },
    { text: "Computer Vision", x: "15%", y: "45%", delay: 0.5 },
    { text: "NLP", x: "90%", y: "40%", delay: 1.5 },
    { text: "Deep Learning", x: "70%", y: "85%", delay: 2.5 },
    { text: "Transformers", x: "25%", y: "85%", delay: 3.5 },
];

export function FloatingKeywords({ className }: { className?: string }) {
    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
            {keywords.map((keyword, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: [0, 0.25, 0.25, 0],
                        y: [20, 0, 0, -20],
                    }}
                    transition={{
                        duration: 8,
                        delay: keyword.delay,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut",
                    }}
                    style={{ left: keyword.x, top: keyword.y }}
                    className="absolute text-xs sm:text-sm font-mono text-[var(--neon-lime-text)]/30 dark:text-neutral-600 tracking-wider"
                >
                    {keyword.text}
                </motion.span>
            ))}
        </div>
    );
}
