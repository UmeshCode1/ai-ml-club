"use client";

import { motion } from "framer-motion";
import { BlurReveal } from "@/components/ui/blur-reveal";

export default function GalleryPage() {
    return (
        <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-black/5 dark:border-white/10 flex items-center justify-center shadow-2xl animate-pulse">
                        <span className="text-4xl">📸</span>
                    </div>
                </div>

                <BlurReveal
                    text="Gallery Coming Soon"
                    className="justify-center text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 mb-6"
                    delay={0.2}
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
                >
                    We are currently curating the finest moments from our workshops, hackathons, and community events. Stay tuned for a visual journey.
                </motion.p>
            </div>
        </div>
    );
}
