"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { GradientBorder } from "@/components/ui/gradient-border";

export function CTASection() {
    return (
        <section className="py-20 px-4 md:px-6 bg-white dark:bg-neutral-950">
            <div className="container mx-auto">
                <GradientBorder
                    containerClassName="relative rounded-[2.5rem] shadow-2xl overflow-hidden group"
                    className="bg-white/50 dark:bg-black/20 backdrop-blur-xl px-4 py-12 md:px-8 md:py-20 text-center"
                    duration={6}
                >

                    {/* Background Glows */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[-50%] left-[-20%] w-[70%] h-[70%] bg-[var(--electric-cyan)]/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-50%] right-[-20%] w-[70%] h-[70%] bg-[var(--neon-lime)]/10 rounded-full blur-[100px]" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)] text-[var(--background)] text-sm font-bold shadow-lg transform hover:scale-105 transition-transform cursor-default">
                            Join the Revolution 🚀
                        </div>

                        <h2 className="max-w-3xl text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                            Ready to Build <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--electric-cyan)] to-[var(--neon-lime)]">The Future?</span>
                        </h2>

                        <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 mb-10">
                            Join innovators, learners, and creators shaping tomorrow&apos;s technology.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href="/join"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-[var(--background)] transition-all duration-200 bg-[var(--neon-lime)] rounded-xl hover:shadow-[0_0_30px_var(--neon-lime)] transform hover:-translate-y-1"
                            >
                                Join the Club
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>

                            <Link
                                href="/events"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-neutral-900 dark:text-white transition-all duration-200 bg-transparent border border-neutral-200 dark:border-white/10 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 hover:border-neutral-300 dark:hover:border-white/20 transform hover:-translate-y-1"
                            >
                                <Calendar className="w-5 h-5 mr-2" />
                                Explore Events
                            </Link>
                        </div>
                    </div>
                </GradientBorder>
            </div>
        </section>
    );
}
