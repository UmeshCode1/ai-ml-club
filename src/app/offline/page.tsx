"use client";

import { motion } from "framer-motion";
import { WifiOff, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 overflow-hidden relative">
            {/* Background elements to match the site aesthetic */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--neon-lime)]/5 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--electric-cyan)]/5 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "2s" }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md w-full bg-neutral-900/50 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 md:p-12 text-center relative z-10 shadow-2xl"
            >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--neon-lime)] to-[var(--electric-cyan)] flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(212,255,0,0.2)]">
                    <WifiOff className="w-10 h-10 text-black" />
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter italic">
                    NETWORK <span className="text-[var(--neon-lime)]">DISRUPTED</span>
                </h1>

                <p className="text-neutral-400 mb-10 leading-relaxed">
                    You&apos;re currently offline. The signal is lost, but your innovation doesn&apos;t have to stop. Check your connection or retry below.
                </p>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[var(--neon-lime)] text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(212,255,0,0.3)] group"
                    >
                        <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
                    >
                        <Home className="w-5 h-5" />
                        Go to Home
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                    <p className="text-xs text-neutral-600 uppercase tracking-[0.2em] font-bold">
                        AI & Machine Learning Club OCT
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
