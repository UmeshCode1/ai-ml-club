"use client";

import { motion } from "framer-motion";
import { FloatingCard } from "@/components/ui/floating-card";
import { GradientBorder } from "@/components/ui/gradient-border";

export function AboutSection() {
    return (
        <section className="py-24 bg-white dark:bg-neutral-950 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-start"
                    >
                        <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-[var(--neon-lime)]/10 text-[var(--neon-lime-text)] text-sm font-semibold tracking-widest uppercase font-mono border border-[var(--neon-lime)]/20">
                            Est. 2025
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                            About <span className="text-[var(--neon-lime-text)]">AIML Club</span>
                        </h2>

                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                            The AI & Machine Learning Club at Oriental College of Technology is a student-driven ecosystem dedicated to exploring the frontiers of Artificial Intelligence.
                            <br /><br />
                            We don&apos;t just learn; we build. From workshops and hackathons to real-world projects, we provide the platform for students to turn theoretical knowledge into practical innovation.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {["Workshops", "Hackathons", "Research", "Networking"].map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-6 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 font-medium text-sm hover:border-[var(--neon-lime)] transition-colors cursor-default"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Image/Visual */}
                    <div className="relative">
                        <FloatingCard delay={0.2}>
                            <GradientBorder
                                containerClassName="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group"
                                className="bg-neutral-900"
                                duration={10}
                            >
                                {/* Grid Pattern Overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0" />

                                <div className="absolute inset-0 bg-neutral-900/10 dark:bg-neutral-900/40 group-hover:opacity-0 transition-opacity duration-500 z-10" />

                                {/* Placeholder Content */}
                                {/* Animated Data Visual */}
                                <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
                                    <div className="flex gap-4 opacity-20">
                                        {[...Array(3)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-px h-32 bg-gradient-to-b from-transparent via-[var(--neon-lime)] to-transparent"
                                                animate={{ height: ["0%", "100%", "0%"], opacity: [0, 1, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                            />
                                        ))}
                                    </div>
                                    <span className="mt-6 text-neutral-500 dark:text-neutral-600 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">
                                        Terminals Active
                                    </span>
                                </div>

                                <div className="absolute bottom-6 left-6 z-20">
                                    <div className="h-1 w-12 bg-[var(--neon-lime)] mb-2 rounded-full shadow-[0_0_10px_var(--neon-lime)]"></div>
                                    <h3 className="text-white text-xl font-bold">Club Moments</h3>
                                    <p className="text-white/80 text-sm">Capturing our journey of innovation</p>
                                </div>
                            </GradientBorder>
                        </FloatingCard>

                        {/* Decorative blob behind */}
                        <div className="absolute -z-10 top-[-10%] right-[-10%] w-[80%] h-[80%] bg-[var(--neon-lime)]/10 rounded-full blur-[80px]" />
                    </div>
                </div>
            </div>
        </section>
    );
}
