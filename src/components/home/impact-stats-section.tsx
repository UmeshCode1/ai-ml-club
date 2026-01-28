"use client";

import { Stat } from "@/lib/database";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000;
            const increment = value / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {count.toLocaleString()}{suffix}
        </span>
    );
}

export function ImpactStatsSection({ stats }: { stats: Stat[] }) {
    return (
        <section className="py-24 md:py-32 relative z-10 overflow-hidden">
            {/* Background Gradient & Grid */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--neon-lime)]/5 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />

            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tighter">
                        Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-lime-text)] to-[var(--electric-cyan-text)]">Our Impact</span>
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium">
                        Exponential growth driven by localized innovation.
                    </p>
                </motion.div>

                {stats.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center p-4 sm:p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-neutral-200/50 dark:border-white/10 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-[var(--neon-lime)]/30 transition-all duration-300"
                            >
                                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--neon-lime-text)] mb-2">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-[10px] sm:text-xs lg:text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
