"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GradientBorder } from "@/components/ui/gradient-border";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export function CTASection() {
    const { scrollToId } = useSmoothScroll();

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-transparent pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[var(--neon-lime)]/5 dark:bg-[var(--neon-lime)]/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/4 right-1/4 w-[40%] h-[40%] bg-[var(--electric-cyan)]/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <GradientBorder
                    containerClassName="rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
                    className="bg-white/80 dark:bg-neutral-900/60 backdrop-blur-3xl p-8 md:p-24 text-center relative overflow-hidden border border-neutral-200 dark:border-white/5"
                    borderWidth={1.5}
                    duration={10}
                >
                    {/* Inner Content */}
                    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-5xl md:text-8xl font-black text-neutral-900 dark:text-white mb-8 tracking-tight leading-[0.9]">
                                Empower Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-lime-text)] via-[var(--electric-cyan-text)] to-[var(--neon-lime-text)]">
                                    Intelligent Edge
                                </span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-14 max-w-3xl font-medium leading-relaxed"
                        >
                            Join the elite league of AI innovators at OCT. Whether you&apos;re a beginner or a pro, we have a desk waiting for you.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="w-full flex flex-col items-center"
                        >
                            <MagneticButton>
                                <button
                                    onClick={() => scrollToId("newsletter", 2500)}
                                    className="relative overflow-hidden inline-flex items-center justify-center px-12 py-6 text-xl font-black text-black transition-all duration-300 bg-[var(--neon-lime)] rounded-full hover:shadow-[0_0_60px_rgba(var(--neon-lime-rgb),0.5)] hover:-translate-y-2 group"
                                >
                                    <span className="relative z-10 flex items-center">
                                        BECOME A MEMBER
                                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent z-0" />
                                </button>
                            </MagneticButton>

                            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-xs font-black text-neutral-400 uppercase tracking-[0.3em] justify-center items-center">
                                <Link href="/events" className="hover:text-[var(--neon-lime-text)] transition-colors">INITIATIVES</Link>
                                <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                                <Link href="/team" className="hover:text-[var(--electric-cyan-text)] transition-colors">THE TEAM</Link>
                                <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                                <Link href="/contact" className="hover:text-white transition-colors text-xs">CONTACT OFFICE</Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Decorative Grid */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none" />
                </GradientBorder>
            </div>
        </section>
    );
}
