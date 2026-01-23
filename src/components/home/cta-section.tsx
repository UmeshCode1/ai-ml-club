"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GradientBorder } from "@/components/ui/gradient-border";

export function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-transparent pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[var(--neon-lime)]/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <GradientBorder
                    containerClassName="rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.1)] dark:shadow-[0_0_80px_rgba(32,125,255,0.05)]"
                    className="bg-white/50 dark:bg-black/40 backdrop-blur-xl p-12 md:p-24 text-center relative overflow-hidden"
                    borderWidth={1}
                    duration={15}
                >
                    {/* Inner Content */}
                    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-8 tracking-tight">
                                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-lime-text)] to-[var(--electric-cyan-text)]">Build The Future?</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-neutral-600 dark:text-neutral-300 mb-12 max-w-2xl"
                        >
                            Join innovators, learners, and creators shaping tomorrow&apos;s technology.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <MagneticButton>
                                <Link
                                    href="/join"
                                    className="relative overflow-hidden inline-flex items-center justify-center px-12 py-5 text-lg font-bold text-[var(--background)] transition-all duration-300 bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)] rounded-full hover:shadow-[0_0_40px_var(--neon-lime)] hover:-translate-y-1 group"
                                >
                                    <span className="relative z-10 flex items-center">
                                        Join the Club
                                        <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />
                                </Link>
                            </MagneticButton>

                            <div className="mt-8 flex gap-6 text-sm font-semibold text-neutral-500 uppercase tracking-widest justify-center">
                                <Link href="/events" className="hover:text-[var(--neon-lime-text)] transition-colors">Explore Events</Link>
                                <span>•</span>
                                <Link href="/contact" className="hover:text-[var(--electric-cyan-text)] transition-colors">Contact Us</Link>
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
