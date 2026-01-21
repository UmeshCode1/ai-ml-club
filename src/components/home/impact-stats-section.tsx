"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { MOCK_EVENTS } from "@/lib/data";

// Calculate dynamic stats
function useStats() {
    return useMemo(() => {
        // Active Members: Start at 1390, add 10 per week since Jan 1, 2025
        const startDate = new Date("2025-01-01");
        const now = new Date();
        const weeksPassed = Math.floor((now.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
        const activeMembers = 1390 + (weeksPassed * 10);

        // Events count from actual data
        const eventsCount = MOCK_EVENTS.length;

        // Years running: 2024 is year 1, calculate based on current year
        const foundingYear = 2024;
        const currentYear = now.getFullYear();
        const yearsRunning = currentYear - foundingYear + 1;

        // Projects shipped (can be updated from data later)
        const projectsShipped = 5;

        return [
            { value: activeMembers, suffix: "+", label: "Active Members" },
            { value: projectsShipped, suffix: "+", label: "Projects Shipped" },
            { value: eventsCount, suffix: "+", label: "Events Hosted" },
            { value: yearsRunning, suffix: "", label: "Years Running" },
        ];
    }, []);
}

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

export function ImpactStatsSection() {
    const stats = useStats();

    return (
        <section className="py-20 md:py-28 relative z-10 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--neon-lime)]/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                        Our Impact in Numbers
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Building a legacy of innovation, one project at a time.
                    </p>
                </motion.div>

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
            </div>
        </section>
    );
}
