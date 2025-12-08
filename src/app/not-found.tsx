"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, AlertTriangle } from "lucide-react";
import { GradientBorder } from "@/components/ui/gradient-border";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 via-black to-black z-0" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--neon-lime)]/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--electric-cyan)]/10 rounded-full blur-[100px] animate-pulse delay-700" />

            {/* Content */}
            <div className="relative z-10 max-w-2xl w-full text-center px-4">
                <GradientBorder
                    containerClassName="rounded-3xl shadow-2xl backdrop-blur-md"
                    className="bg-[var(--card-bg)]/50 p-8 md:p-12 border border-[var(--card-border)]"
                    duration={10}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 inline-block"
                    >
                        <div className="relative">
                            <h1 className="text-[100px] md:text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-transparent leading-none select-none">
                                404
                            </h1>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <AlertTriangle className="w-20 h-20 text-[var(--neon-lime)] drop-shadow-[0_0_15px_rgba(212,255,0,0.5)]" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Lost in the Neural Network?
                        </h2>
                        <p className="text-neutral-400 text-lg mb-8 max-w-lg mx-auto">
                            The page you are looking for seems to have been disconnected from the mainframe or does not exist in this dimension.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <MagneticButton>
                                <Link
                                    href="/"
                                    className="px-8 py-3 rounded-xl bg-[var(--neon-lime)] text-black font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(212,255,0,0.4)] transition-all"
                                >
                                    <Home size={20} />
                                    Return Home
                                </Link>
                            </MagneticButton>

                            <MagneticButton>
                                <Link
                                    href="/suggestions"
                                    className="px-8 py-3 rounded-xl border border-white/10 text-white font-medium flex items-center gap-2 hover:bg-white/5 transition-all"
                                >
                                    <Search size={20} />
                                    Report Broken Link
                                </Link>
                            </MagneticButton>
                        </div>
                    </motion.div>
                </GradientBorder>
            </div>
        </div>
    );
}
