"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useMemo, useId } from "react";
import { MOCK_EVENTS } from "@/lib/data";
import { HomeStat } from "@/lib/database";

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

        // Years running: Founded August 9, 2025
        const foundingDate = new Date("2025-08-09");
        const yearsRunning = Math.max(1, Math.floor((now.getTime() - foundingDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)) + 1);

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

export function ImpactStatsSection({ stats: dynamicStats }: { stats?: HomeStat[] }) {
    const computedStats = useStats();
    const sessionId = useId().replace(/:/g, "").toUpperCase();

    // Merge dynamic stats from Appwrite with computed fallbacks
    const stats = useMemo(() => {
        if (!dynamicStats || dynamicStats.length === 0) return computedStats;
        return dynamicStats.map(ds => ({
            value: parseInt(ds.value.replace(/,/g, '')) || 0,
            suffix: ds.suffix || "",
            label: ds.label
        }));
    }, [dynamicStats, computedStats]);

    return (
        <section className="py-24 relative z-10 overflow-hidden bg-white dark:bg-black text-neutral-900 dark:text-white transition-colors duration-500">
            {/* Telemetry Grid Background */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.15] pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(163,230,53,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(163,230,53,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-black via-transparent to-white dark:to-black" />
            </div>

            {/* Scanning Line Animation */}
            <motion.div
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-[2px] bg-[var(--neon-lime)]/40 z-[1] pointer-events-none shadow-[0_0_20px_var(--neon-lime)]"
            />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                    {/* Header Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl text-left"
                    >
                        <div className="flex items-center gap-3 mb-6 text-[var(--neon-lime-text)] font-mono text-xs tracking-[0.3em]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-lime)] animate-pulse" />
                            CORE_TELEMETRY.RUNNING
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none text-neutral-900 dark:text-white">
                            IMPACT <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-lime-text)] to-neutral-400 dark:to-neutral-600">
                                PERFORMANCE
                            </span>
                        </h2>
                        <p className="text-neutral-500 dark:text-neutral-400 font-mono text-sm leading-relaxed mb-8 max-w-sm">
                            Real-time intelligence harvesting and technical contribution metrics from our student-led engineering clusters.
                        </p>

                        {/* Terminal Style Metadata */}
                        <div className="p-4 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/5 font-mono text-[10px] text-neutral-500 dark:text-neutral-600 space-y-2 translate-z-0">
                            <div className="flex justify-between">
                                <span>$ SESSION_ID</span>
                                <span className="text-neutral-700 dark:text-neutral-400 uppercase">{sessionId || "INITIALIZING..."}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>$ NODE_LOCATION</span>
                                <span className="text-neutral-700 dark:text-neutral-400 font-bold">BHOPAL.MP.IN</span>
                            </div>
                            <div className="flex justify-between">
                                <span>$ SYSTEM_STATUS</span>
                                <span className="text-[var(--neon-lime-text)] font-bold">OPTIMIZED</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Grid Side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200 dark:bg-white/10 border border-neutral-200 dark:border-white/10 rounded-[32px] overflow-hidden backdrop-blur-md">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative p-10 bg-white dark:bg-black min-w-[240px] transition-colors"
                            >
                                {/* Stat Corner Marks */}
                                <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-neutral-200 dark:border-white/10 group-hover:border-[var(--neon-lime)] transition-colors" />
                                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-neutral-200 dark:border-white/10 group-hover:border-[var(--neon-lime)] transition-colors" />

                                <div className="flex flex-col items-start translate-z-0">
                                    <div className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white mb-2 tracking-tighter group-hover:text-[var(--neon-lime-text)] transition-colors">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors uppercase tracking-[0.25em]">
                                        {stat.label.replace(/ /g, '_')}
                                    </div>
                                </div>

                                {/* Mini Chart/Visual (Static) */}
                                <div className="mt-6 flex gap-1 h-3 items-end overflow-hidden will-change-transform">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                        <div
                                            key={i}
                                            className={`w-full bg-[var(--neon-lime)]/10 dark:bg-[var(--neon-lime)]/20 rounded-full transition-all duration-500 group-hover:bg-[var(--neon-lime)]`}
                                            style={{ height: `${(Math.sin((index + 1) * (i + 1)) + 1) * 50}%` }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
