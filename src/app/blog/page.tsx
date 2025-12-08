"use client";

import { motion } from "framer-motion";
import { BlurReveal } from "@/components/ui/blur-reveal";

export default function BlogPage() {
    return (
        <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-pink-500/20 to-rose-500/20 backdrop-blur-xl border border-black/5 dark:border-white/10 flex items-center justify-center shadow-2xl animate-bounce">
                        <span className="text-4xl">✍️</span>
                    </div>
                </div>

                <BlurReveal
                    text="Knowledge Database"
                    className="justify-center text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 mb-6"
                    delay={0.2}
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
                >
                    Technical deep-dives, event recaps, and industry insights are being written as we speak. Our blog will launch shortly.
                </motion.p>
            </div>
        </div>
    );
}
