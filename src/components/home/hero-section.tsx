"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { NeuralNetwork } from "@/components/ui/neural-network";
import { FloatingKeywords } from "@/components/ui/floating-keywords";

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-transparent pt-24 pb-20 px-4">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Neural Network Particle Animation */}
                <NeuralNetwork className="opacity-60 dark:opacity-40" />

                {/* Floating AI/ML Keywords */}
                <FloatingKeywords />

                {/* Micro-Gradient for Header Blending */}
                <div className="absolute top-0 left-0 w-full h-[250px] bg-gradient-to-b from-[var(--neon-lime)]/5 to-transparent z-0" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-[-40%] left-[-20%] w-[140%] h-[80%] bg-[var(--neon-lime)]/15 dark:bg-[var(--neon-lime)]/10 rounded-full blur-[120px] mix-blend-screen dark:mix-blend-normal"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-[var(--electric-cyan)]/15 dark:bg-[var(--electric-cyan)]/10 rounded-full blur-[120px] mix-blend-screen dark:mix-blend-normal"
                />

                {/* Gradient Mask to blend with next section */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[var(--background)] to-transparent" />
            </div>

            <div className="container relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="max-w-6xl mx-auto text-[clamp(2.25rem,6vw,5.5rem)] md:text-[clamp(3.5rem,7vw,8rem)] font-bold tracking-tighter text-neutral-900 dark:text-white mb-0 leading-[1.05]">
                        AI <span className="text-neutral-300 dark:text-neutral-700 mx-1">&</span> MACHINE
                    </h1>
                    <h1 className="max-w-6xl mx-auto text-[clamp(2.25rem,6vw,5.5rem)] md:text-[clamp(3.5rem,7vw,8rem)] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--electric-cyan-text)] via-[var(--neon-lime-text)] to-[var(--electric-cyan-text)] mb-8 pb-1 leading-[1.05]">
                        LEARNING CLUB
                    </h1>
                </motion.div>

                {/* Subtitle / Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto text-lg md:text-2xl font-medium tracking-widest text-[var(--neon-lime-text)] uppercase mb-12 font-mono"
                >
                    <BlurReveal
                        text="Innovate • Implement • Inspire"
                        delay={0.5}
                        duration={1.2}
                        className="justify-center text-[var(--neon-lime-text)] tracking-widest font-mono uppercase"
                    />
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center gap-6"
                >
                    <MagneticButton>
                        <Link
                            href="/join"
                            className="relative overflow-hidden inline-flex items-center justify-center px-10 py-4 text-base font-bold text-[var(--background)] transition-all duration-300 bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)] rounded-full hover:shadow-[0_0_40px_var(--neon-lime)] hover:-translate-y-1 group"
                        >
                            <span className="relative z-10 flex items-center">
                                Join the Revolution
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />
                        </Link>
                    </MagneticButton>

                    <MagneticButton>
                        <Link
                            href="/projects"
                            className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-neutral-700 dark:text-white transition-all duration-300 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-neutral-200 dark:border-white/10 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 hover:border-neutral-300 dark:hover:border-white/20 hover:-translate-y-1 shadow-[var(--shadow-sm)]"
                        >
                            <Play className="w-4 h-4 mr-2 fill-current" />
                            See Our Work
                        </Link>
                    </MagneticButton>
                </motion.div>

                {/* Scroll Down Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute bottom-[-100px] md:bottom-[-90px] left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden md:block"
                >
                    <MagneticButton>
                        <div className="w-[30px] h-[50px] rounded-full border border-neutral-400/30 dark:border-white/20 flex justify-center p-2 backdrop-blur-sm bg-white/50 dark:bg-black/20">
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1.5 h-1.5 rounded-full bg-[var(--neon-lime)] shadow-[0_0_10px_var(--neon-lime)]"
                            />
                        </div>
                    </MagneticButton>
                </motion.div>

            </div>
        </section>
    );
}
